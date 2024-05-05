from fastapi import HTTPException, Request
import requests
import boto3
import os
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

aws_bucket_name = os.getenv("aws_bucket_name")
session = boto3.Session()

s3 = None

# подключение к AWS
try:
    s3 = session.client(
        service_name='s3',
        endpoint_url=os.getenv("endpoint_url"),
        aws_access_key_id=os.getenv("aws_access_key_id"),
        aws_secret_access_key=os.getenv("aws_secret_access_key"),
        region_name=os.getenv("region_name")
    )
except Exception:
    raise HTTPException(
        status_code=500, detail="Unable connect to AWS")


# получение данных пользователя
async def validate_cloudflare(request: Request):
    token = request.headers.get('Authorization', None)

    if not token:
        raise HTTPException(
            status_code=401, detail="Missing required cf authorization token")
    user_response = requests.get('https://login.yandex.ru/info?format=json', headers={
        'Authorization': token
    })

    if user_response.status_code == 200:
        return user_response.json()

    raise HTTPException(
        status_code=401, detail="Invalid token")
