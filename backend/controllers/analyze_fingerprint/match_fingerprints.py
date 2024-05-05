import base64
import io
import zipfile
import cv2
from fastapi import HTTPException
from fastapi.responses import JSONResponse
import numpy as np

from utils.aws_session import aws_bucket_name, s3


# сравнение изображений по сегментам
def match_images(image_1, image_2):
    sift = cv2.SIFT.create()

    # получение сегментов изображений
    keypoints_1, descriptors_1 = sift.detectAndCompute(
        image_1, None)
    keypoints_2, descriptors_2 = sift.detectAndCompute(
        image_2, None)

    # сравнение изображений с помощью FlannBasedMatcher
    matches = cv2.FlannBasedMatcher({'algorithm': 1, 'trees': 10},
                                    {}).knnMatch(descriptors_1, descriptors_2, k=2)

    return (keypoints_1, keypoints_2, matches)


# преобразование изображения
def parse_image(bytes):
    nparr = np.fromstring(bytes, np.uint8)

    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)


# получение наглядного результата сравнения изображений в формате base64
def draw_matches_base64(image_1, kp1, image_2, kp2, mp):
    result = cv2.drawMatches(image_1, kp1, image_2, kp2, mp, None)
    result = cv2.resize(result, None, fx=4, fy=4)

    # преобразование результата в base64
    _, encoded_img = cv2.imencode('.PNG', result)

    return base64.b64encode(encoded_img)


# получить точность сравнения изображений
def get_score(matches, keypoints_1, keypoints_2):
    match_points = []
    for p, q in matches:
        if p.distance < 0.1 * q.distance:
            match_points.append(p)

    keypoints = 0
    if len(keypoints_1) < len(keypoints_2):
        keypoints = len(keypoints_1)
    else:
        keypoints = len(keypoints_2)

    return (len(match_points) / keypoints * 100, match_points)


# сравнение загруженного изображения отпечатка пальца с выбранным набором из zip-файла
async def match_fingerprints(filename: str, file, user):
    try:
        # чтение загруженного изображения
        contents = await file.read()
        upload_image = parse_image(contents)

        # получение выбранного zip-файла
        prefix = f'{user['id']}/'
        content = s3.get_object(Bucket=aws_bucket_name,
                                Key=f'{prefix}{filename}')['Body'].read()

        image, filename = None, None
        kp1, kp2, mp = None, None, None
        best_score = 0

        # чтение изображений из zip-файла и сравнение их с загруженным
        with zipfile.ZipFile(io.BytesIO(content), 'r') as zip:
            for filename in zip.namelist():
                # чтение изображение из архива
                contents = zip.read(filename)
                image_from_zip = parse_image(contents)

                # сравнение изображений
                keypoints_1, keypoints_2, matches = match_images(
                    upload_image, image_from_zip)

                # получение точности сравнения изображений
                score, match_points = get_score(
                    matches, keypoints_1, keypoints_2)

                if score > best_score:
                    best_score = score
                    filename = filename
                    image = image_from_zip
                    kp1, kp2, mp = keypoints_1, keypoints_2, match_points

        # создание изображение, которое показывает схожие сегменты сравниваемых изображений
        encoded_img = draw_matches_base64(upload_image, kp1, image, kp2, mp)

        return JSONResponse(
            content={
                "score": str(best_score),
                "foundImage": str(filename),
                "matchesImageBase64": str(encoded_img)
            },
            status_code=200
        )
    except Exception:
        raise HTTPException(
            status_code=403, detail="Image comparison error")
