from typing import List
import boto3
import os
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request, Response, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import requests

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

aws_bucket_name = os.getenv("aws_bucket_name")
session = boto3.Session()

s3 = session.client(
    service_name='s3',
    endpoint_url=os.getenv("endpoint_url"),
    aws_access_key_id=os.getenv("aws_access_key_id"),
    aws_secret_access_key=os.getenv("aws_secret_access_key"),
    region_name=os.getenv("region_name")
)


async def validate_cloudflare(request: Request):
    token = request.headers['Authorization']
    if not token:
        raise HTTPException(
            status_code=400, detail="missing required cf authorization token")

    user_response = requests.get('https://login.yandex.ru/info?format=json', headers={
        'Authorization': token
    })
    if user_response.status_code == 200:
        return user_response.json()

    raise HTTPException(status_code=400, detail="Invalid token")


@app.get("/")
async def main(user=Depends(validate_cloudflare)):
    return {"user": user}


@app.get("/list-fingerprints")
async def get_list_fingerprint_by_user(user=Depends(validate_cloudflare)) -> List[str]:
    global s3, aws_bucket_name

    data = []
    prefix = f'{user['id']}/'
    file_list = s3.list_objects(Bucket=aws_bucket_name, Prefix=prefix)

    if ('Contents' in file_list):
        for key in file_list['Contents']:
            data.append(key['Key'].replace(prefix, ''))

    return data


@app.get("/download-file")
async def download_file(filename: str, user=Depends(validate_cloudflare)):
    global s3, aws_bucket_name

    prefix = f'{user['id']}/'

    content = s3.get_object(Bucket=aws_bucket_name,
                            Key=f'{prefix}{filename}')['Body'].read()
    return Response(
        content=content,
        headers={
            'Content-Disposition': f'attachment;filename={filename}',
            'Content-type': 'application/x-zip-compressed'
        }
    )


@app.delete("/delete-file")
async def delete_file(filename: str, user=Depends(validate_cloudflare)):
    global s3, aws_bucket_name

    prefix = f'{user['id']}/'

    s3.delete_objects(Bucket=aws_bucket_name, Delete={
                      'Objects': [{'Key': f'{prefix}{filename}'}]})

    raise HTTPException(status_code=200, detail="file deleted")


@app.post("/upload-file")
async def upload_file(file: UploadFile, user=Depends(validate_cloudflare)):
    prefix = f'{user['id']}/'

    global s3, aws_bucket_name
    contents = await file.read()
    s3.put_object(Bucket=aws_bucket_name,
                  Key=f'{prefix}{file.filename}', Body=contents)

    raise HTTPException(status_code=200, detail="files uploaded")


@app.post("/upload-files")
async def upload_file(files: List[UploadFile] = File(...), user=Depends(validate_cloudflare)):
    prefix = f'{user['id']}/'

    for file in files:
        contents = await file.read()
        s3.put_object(Bucket=aws_bucket_name,
                      Key=f'{prefix}{file.filename}', Body=contents)

    raise HTTPException(status_code=200, detail="files uploaded")
