import base64
import io
from typing import List
import cv2
from dotenv import load_dotenv
from fastapi import Depends, APIRouter, HTTPException, UploadFile
import numpy as np
from fastapi.responses import JSONResponse
from utils import validate_cloudflare, aws_bucket_name, s3
import zipfile

load_dotenv()

routerMatchFingerprint = APIRouter()


@routerMatchFingerprint.post("/match-fingerprints")
async def match_fingerprints(filename: str, file: UploadFile, user=Depends(validate_cloudflare)) -> List[str]:
    try:
        # чтение загруженного изображения
        contents = await file.read()
        nparr = np.fromstring(contents, np.uint8)
        sample = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # получение выбранного zip-файла
        prefix = f'{user['id']}/'
        content = s3.get_object(Bucket=aws_bucket_name,
                                Key=f'{prefix}{filename}')['Body'].read()

        image, filename = None, None
        kp1, kp2, mp = None, None, None
        best_score = 0

        # чтение изображений из zip-файла и сравнение их с загруженным
        with zipfile.ZipFile(io.BytesIO(content), 'r') as zip:
            for item in zip.namelist():
                # чтение изображение из архива
                content = zip.read(item)
                nparr = np.fromstring(content, np.uint8)
                fingerprint_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                # инициализация sift
                sift = cv2.SIFT.create()

                # получение сегментов изображений
                keypoints_1, descriptors_1 = sift.detectAndCompute(
                    sample, None)
                keypoints_2, descriptors_2 = sift.detectAndCompute(
                    fingerprint_image, None)

                # сравнение изображений с помощью FlannBasedMatcher
                matches = cv2.FlannBasedMatcher({'algorithm': 1, 'trees': 10},
                                                {}).knnMatch(descriptors_1, descriptors_2, k=2)

                # преобразование реззультатов в численное выражение
                match_points = []
                for p, q in matches:
                    if p.distance < 0.1 * q.distance:
                        match_points.append(p)

                keypoints = 0
                if len(keypoints_1) < len(keypoints_2):
                    keypoints = len(keypoints_1)
                else:
                    keypoints = len(keypoints_2)

                if len(match_points) / keypoints * 100 > best_score:
                    best_score = len(match_points) / keypoints * 100
                    filename = file.filename
                    image = fingerprint_image
                    kp1, kp2, mp = keypoints_1, keypoints_2, match_points

        # создание изображение, которое показывает схожие сегменты сравниваемых изображений
        result = cv2.drawMatches(sample, kp1, image, kp2, mp, None)
        result = cv2.resize(result, None, fx=4, fy=4)

        # преобразование результата в base64
        _, encoded_img = cv2.imencode('.PNG', result)
        encoded_img = base64.b64encode(encoded_img)

        return JSONResponse(
            content={
                "SCORE": str(best_score),
                "BEST MATCH": str(filename),
                "result": str(encoded_img)
            },
            status_code=200
        )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=403, detail="The Matching fingerprint is not available")
