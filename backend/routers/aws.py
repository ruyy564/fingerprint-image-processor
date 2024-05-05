from typing import List
from dotenv import load_dotenv
from fastapi import Depends, APIRouter, HTTPException, Response, UploadFile, File

from utils import validate_cloudflare, aws_bucket_name, s3

routerAws = APIRouter()

load_dotenv()


# получение списка папок пользователя с отпечатками пальцев
@routerAws.get("/list-fingerprints")
async def get_list_fingerprint_by_user(user=Depends(validate_cloudflare)) -> List[str]:
    try:
        data = []
        prefix = f'{user['id']}/'
        file_list = s3.list_objects(Bucket=aws_bucket_name, Prefix=prefix)

        if ('Contents' in file_list):
            for key in file_list['Contents']:
                data.append(key['Key'].replace(prefix, ''))

        return data
    except Exception:
        raise HTTPException(
            status_code=403, detail="The folder list is not available")


# скачать папку с отпечатками пальцев в формате zip
@routerAws.get("/download-file")
async def download_file(filename: str, user=Depends(validate_cloudflare)):
    try:
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
    except Exception:
        raise HTTPException(
            status_code=403, detail="Unable to download this file")


# удалить папку с отпечатками пальцев
@routerAws.delete("/delete-file")
async def delete_file(filename: str, user=Depends(validate_cloudflare)):
    try:
        prefix = f'{user['id']}/'

        s3.delete_objects(Bucket=aws_bucket_name, Delete={
            'Objects': [{'Key': f'{prefix}{filename}'}]})

        raise HTTPException(status_code=200, detail="The file is deleted")
    except Exception:
        raise HTTPException(status_code=403, detail="The file is not deleted")


# загрузить папку с отпечатками пальцев
@routerAws.post("/upload-file")
async def upload_file(file: UploadFile, user=Depends(validate_cloudflare)):
    try:
        prefix = f'{user['id']}/'
        contents = await file.read()
        s3.put_object(Bucket=aws_bucket_name,
                      Key=f'{prefix}{file.filename}', Body=contents)

        raise HTTPException(status_code=200, detail="The file is uploaded")
    except Exception:
        raise HTTPException(status_code=403, detail="The file is not uploaded")


# загрузуть несколько папок с отпечатками пальцев
@routerAws.post("/upload-files")
async def upload_file(files: List[UploadFile] = File(...), user=Depends(validate_cloudflare)):
    try:
        prefix = f'{user['id']}/'

        for file in files:
            contents = await file.read()
            s3.put_object(Bucket=aws_bucket_name,
                          Key=f'{prefix}{file.filename}', Body=contents)

        raise HTTPException(status_code=200, detail="Files are uploaded")
    except Exception:
        raise HTTPException(status_code=403, detail="Files are not uploaded")
