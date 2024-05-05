import os
from typing import List
import cv2
from dotenv import load_dotenv
from fastapi import Depends, APIRouter, HTTPException, Response, UploadFile, File

from utils import validate_cloudflare, aws_bucket_name, s3

routerMatchFingerprint = APIRouter()

load_dotenv()


@routerMatchFingerprint.get("/match-fingerprints")
async def match_fingerprints(user=Depends(validate_cloudflare)) -> List[str]:
    absolute_path = os.path.join(
        'backend/dataset/SOCOFing/Altered/Altered-Hard/150__M_Right_index_finger_Obl.BMP')
    sample = cv2.imread(absolute_path)

    prefix = f'{user['id']}/'
    file_list = s3.list_objects(Bucket=aws_bucket_name, Prefix=prefix)

    image, filename = None, None
    kp1, kp2, mp = None, None, None

    best_score = 0
    count = 0
    for file in [file for file in os.listdir(os.path.join("backend/dataset/SOCOFing/Real/"))][:1000]:
        fingerprint_image = cv2.imread(os.path.join(
            "backend/dataset/SOCOFing/Real/") + file)
        sift = cv2.SIFT.create()

        if (count % 10 == 0):
            print(count)
        count += 1

        keypoints_1, descriptors_1 = sift.detectAndCompute(sample, None)
        keypoints_2, descriptors_2 = sift.detectAndCompute(
            fingerprint_image, None)

        matches = cv2.FlannBasedMatcher({'algorithm': 1, 'trees': 10},
                                        {}).knnMatch(descriptors_1, descriptors_2, k=2)

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
            filename = file
            image = fingerprint_image
            kp1, kp2, mp = keypoints_1, keypoints_2, match_points

    print('BEST MATCH: ' + str(filename))
    print('SCORE: ' + str(best_score))

    result = cv2.drawMatches(sample, kp1, image, kp2, mp, None)
    result = cv2.resize(result, None, fx=4, fy=4)
