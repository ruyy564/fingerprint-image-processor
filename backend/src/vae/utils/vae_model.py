import csv
import io
import json
import os
import re
import zipfile
import cv2
from fastapi import HTTPException, Response
import numpy as np
import tensorflow as tf
import keras
from keras import layers
import pandas as pd
from keras_preprocessing.image import img_to_array
from sklearn.model_selection import train_test_split
from ast import literal_eval
import h5py

# основные настройки для генерации изображений
latent_dim = int(os.getenv("vae_latent_dim"))  # размер скрытого пространства

# размер сгенерированного изображения
image_size = int(os.getenv("vae_image_size"))


# класс для получения скрытого пространства
class Sampling(layers.Layer):
    """Используется (z_mean, z_log_var) для получения  z, вектора, кодирующего цифру."""

    def call(self, inputs):
        z_mean, z_log_var = inputs
        batch = tf.shape(z_mean)[0]
        dim = tf.shape(z_mean)[1]
        epsilon = tf.keras.backend.random_normal(shape=(batch, dim))
        return z_mean + tf.exp(0.5 * z_log_var) * epsilon


# класс модели vae для обучения
class VAE(keras.Model):
    def __init__(self, encoder, decoder, **kwargs):
        super(VAE, self).__init__(**kwargs)
        self.encoder = encoder
        self.decoder = decoder
        self.total_loss_tracker = keras.metrics.Mean(name="total_loss")
        self.reconstruction_loss_tracker = keras.metrics.Mean(
            name="reconstruction_loss"
        )
        self.kl_loss_tracker = keras.metrics.Mean(name="kl_loss")

    @property
    def metrics(self):
        return [
            self.total_loss_tracker,
            self.reconstruction_loss_tracker,
            self.kl_loss_tracker,
        ]

    def train_step(self, data):
        with tf.GradientTape() as tape:
            z_mean, z_log_var, z = self.encoder(data)
            reconstruction = self.decoder(z)
            reconstruction_loss = tf.reduce_mean(
                tf.reduce_sum(
                    keras.losses.binary_crossentropy(data, reconstruction), axis=(1, 2)
                )
            )
            kl_loss = -0.5 * (1 + z_log_var -
                              tf.square(z_mean) - tf.exp(z_log_var))
            kl_loss = tf.reduce_mean(tf.reduce_sum(kl_loss, axis=1))
            total_loss = reconstruction_loss + kl_loss
        grads = tape.gradient(total_loss, self.trainable_weights)
        self.optimizer.apply_gradients(zip(grads, self.trainable_weights))
        self.total_loss_tracker.update_state(total_loss)
        self.reconstruction_loss_tracker.update_state(reconstruction_loss)
        self.kl_loss_tracker.update_state(kl_loss)
        return {
            "loss": self.total_loss_tracker.result(),
            "reconstruction_loss": self.reconstruction_loss_tracker.result(),
            "kl_loss": self.kl_loss_tracker.result(),
        }


# создание модели энкодера
def get_encoder(latent_dim=latent_dim, image_size=image_size):
    encoder_inputs = keras.Input(shape=(image_size, image_size, 1))
    x = layers.Conv2D(32, 3, activation="relu", strides=2,
                      padding="same")(encoder_inputs)
    x = layers.Conv2D(64, 3, activation="relu", strides=2, padding="same")(x)
    x = layers.Flatten()(x)
    x = layers.Dense(16, activation="relu")(x)
    z_mean = layers.Dense(latent_dim, name="z_mean")(x)
    z_log_var = layers.Dense(latent_dim, name="z_log_var")(x)
    z = Sampling()([z_mean, z_log_var])
    encoder = keras.Model(
        encoder_inputs, [z_mean, z_log_var, z], name="encoder")
    encoder.summary()
    return encoder


# создание модели декодера
def get_decoder(latent_dim=latent_dim):
    latent_inputs = keras.Input(shape=(latent_dim,))
    x = layers.Dense(21 * 21 * 64, activation="relu")(latent_inputs)
    x = layers.Reshape((21, 21, 64))(x)
    x = layers.Conv2DTranspose(
        64, 3, activation="relu", strides=2, padding="same")(x)
    x = layers.Conv2DTranspose(
        32, 3, activation="relu", strides=2, padding="same")(x)
    decoder_outputs = layers.Conv2DTranspose(
        1, 1, activation="sigmoid", padding="same")(x)
    decoder = keras.Model(latent_inputs, decoder_outputs, name="decoder")
    decoder.summary()
    return decoder


# создание модели vae
def create_model(latent_dim=latent_dim, image_size=image_size):
    encoder = get_encoder(latent_dim, image_size)
    decoder = get_decoder(latent_dim)
    vae = VAE(encoder, decoder)
    vae.compile(optimizer=keras.optimizers.Adam())
    return vae


# загрузка обученной модели энкодера
def load_encoder():
    with keras.saving.custom_object_scope({"Sampling": Sampling}):
        encoder = keras.models.load_model(
            f'{os.getcwd()}/vae/models/encoder_model0.h5', compile=False)
    return encoder


# загрузка обученной модели декодера
def load_decoder():
    with keras.saving.custom_object_scope({"Sampling": Sampling}):
        decoder = keras.models.load_model(
            f'{os.getcwd()}/vae/models/decoder_model0.h5', compile=False)
    return decoder


# загрузка обученной модели vae
def load_model():
    encoder = load_encoder()
    decoder = load_decoder()

    vae = VAE(encoder, decoder)
    vae.compile(optimizer=keras.optimizers.Adam())
    return vae


def image_parse(contents):
    nparr = np.fromstring(contents, np.uint8)
    nparr = cv2.imdecode(nparr, cv2.COLOR_BGR2GRAY)
    data = img_to_array(nparr)
    data = cv2.resize(data, (image_size, image_size))

    return data


def shaffle_images(images):
    train_X, valid_X = train_test_split(
        images, test_size=0.2, random_state=13)
    new_images = np.concatenate([train_X, valid_X], axis=0)
    del train_X
    del valid_X

    return new_images


async def image_prepare(file):
    images = []

    # чтение изображение из архива и его подготовка для его изменения
    contents = await file.read()
    with zipfile.ZipFile(io.BytesIO(contents), 'r') as zip:
        for filename in zip.namelist():
            contents = zip.read(filename)
            data = image_parse(contents)
            images.append(data)

    # преобразование в вектор
    images = np.array(images)
    images = images.reshape(-1, image_size, image_size, 1)

    # нормализация
    images = images/np.max(images)

    # перетасовка изображений
    images = shaffle_images(images)

    return images


# обучить vae
async def fit_vae(file, epochs: int | None = 1, batch_size: int | None = 128):
    try:
        # создание модели
        vae = create_model()

        # подготовка изображений
        images = await image_prepare(file)

        # обучение
        vae.fit(images, epochs=epochs, batch_size=batch_size)

        # сохранение весов декодера в файл h5
        weights = vae.decoder.get_weights()

        o = io.BytesIO()
        with h5py.File(o, 'w') as f:
            group = f.create_group('weights')
            for i in range(len(weights)):
                group[f'weight_{i}'] = weights[i]

        o.seek(0)
        response = o.read()
        o.close()

        return Response(
            content=response,
            headers={
                'Content-Disposition': f'attachment;filename=generated.h5',
            }
        )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Vae fit error")


# сгенерировать изображения
async def generate_images(file, count=5,  latent_dim=latent_dim):
    try:
        decoder = load_decoder()
        # # чтение весов из файла
        if file:
            contents = await file.read()
            with h5py.File(io.BytesIO(contents), 'r') as f:
                weights = []
                for datasets in f['weights'].keys():  # iterate through datasets
                    weights.append(f['weights'][datasets])
                decoder.set_weights(weights)

        # получение случайного вектора для создания изображений
        random_vector = tf.random.normal(shape=(count, latent_dim,))
        prediction = decoder.predict(random_vector)

        # Создание zip для сгенерированных ихобюражений
        o = io.BytesIO()
        zf = zipfile.ZipFile(o, mode='w')

        for i in range(count):
            # предобработка изображений
            image = prediction[i] * 255
            image = image.astype('uint8')
            # Добавление изображения в zip
            zf.writestr(f'{i}.BMP', cv2.imencode(
                '.jpg', image)[1].tobytes())

        zf.close()
        o.seek(0)
        response = o.read()
        o.close()

        return Response(
            content=response,
            headers={
                'Content-Disposition': f'attachment;filename=generated',
                'Content-type': 'application/x-zip-compressed'
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=400, detail="Image generator error")
