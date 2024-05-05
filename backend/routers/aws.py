from typing import List
from fastapi import Depends, APIRouter, UploadFile, File

from utils import validate_cloudflare

from controllers.aws.get_list_fingerprints_by_user import get_list_fingerprints_by_user
from controllers.aws.download_file import download_file
from controllers.aws.delete_file import delete_file
from controllers.aws.upload_file import upload_file
from controllers.aws.upload_files import upload_files

router_aws = APIRouter(prefix='/aws')


# получение списка папок пользователя с отпечатками пальцев
@router_aws.get("/list-fingerprints")
async def route_get_list_fingerprints_by_user(user=Depends(validate_cloudflare)) -> List[str]:
    return await get_list_fingerprints_by_user(user)


# скачать папку с отпечатками пальцев в формате zip
@router_aws.get("/download-file")
async def route_download_file(filename: str, user=Depends(validate_cloudflare)):
    return await download_file(filename, user)


# удалить папку с отпечатками пальцев
@router_aws.delete("/delete-file")
async def route_delete_file(filename: str, user=Depends(validate_cloudflare)):
    return await delete_file(filename, user)


# загрузить папку с отпечатками пальцев
@router_aws.post("/upload-file")
async def route_upload_file(file: UploadFile, user=Depends(validate_cloudflare)):
    return await upload_file(file, user)


# загрузуть несколько папок с отпечатками пальцев
@router_aws.post("/upload-files")
async def route_upload_files(files: List[UploadFile] = File(...), user=Depends(validate_cloudflare)):
    return await upload_files(files, user)
