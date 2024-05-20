import io
import zipfile
import cv2
from fastapi import HTTPException, Response
from numpy import expand_dims
from keras_preprocessing.image import img_to_array
from keras_preprocessing.image import ImageDataGenerator
import numpy as np


# сравнение загруженного изображения отпечатка пальца с выбранным набором из zip-файла
async def generate_fingerprints(rotation_range, horizontal_flip, width_shift_range, height_shift_range, zoom_range, count_generated_image, file):
    try:
        # чтение загруженного изображения
        contents = await file.read()

        # Создание zip для сгенерированных ихобюражений
        o = io.BytesIO()
        zf = zipfile.ZipFile(o, mode='w')

        # чтение изображений из zip-файла
        with zipfile.ZipFile(io.BytesIO(contents), 'r') as zip:
            for filename in zip.namelist():
                # чтение изображение из архива и его подготовка для его изменения
                contents = zip.read(filename)
                nparr = np.fromstring(contents, np.uint8)
                nparr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                data = img_to_array(nparr)
                samples = expand_dims(data, 0)

                # Инициализация генератора изображений
                datagen = ImageDataGenerator(rotation_range=rotation_range, horizontal_flip=horizontal_flip,
                                             width_shift_range=width_shift_range, height_shift_range=height_shift_range, zoom_range=zoom_range)

                # Создание итератора для генератора изображений
                it = datagen.flow(samples, batch_size=1)
                for i in range(count_generated_image):
                    batch = it.next()
                    image = batch[0].astype('uint8')
                    print(image)
                    break
                    # Добавление изображения в zip
                    zf.writestr(f'{i}_{filename}', cv2.imencode(
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
        print(e)
        raise HTTPException(
            status_code=403, detail="Image generator error")
