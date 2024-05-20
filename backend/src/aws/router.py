from typing import List
from fastapi import Depends, APIRouter, UploadFile, File

from utils.validate_user_token import validate_user_token

from aws.utils.get_list_fingerprints_by_user import get_list_fingerprints_by_user
from aws.utils.download_file import download_file
from aws.utils.delete_file import delete_file
from aws.utils.upload_file import upload_file
from aws.utils.upload_files import upload_files

router_aws = APIRouter(prefix='/aws')


# получение списка папок пользователя с отпечатками пальцев
@router_aws.get("/list-fingerprints")
async def route_get_list_fingerprints_by_user(user=Depends(validate_user_token)) -> List[str]:
    return await get_list_fingerprints_by_user(user)


# скачать папку с отпечатками пальцев в формате zip
@router_aws.get("/download-file")
async def route_download_file(filename: str, user=Depends(validate_user_token)):
    return await download_file(filename, user)


# удалить папку с отпечатками пальцев
@router_aws.delete("/delete-file")
async def route_delete_file(filename: str, user=Depends(validate_user_token)):
    return await delete_file(filename, user)


# загрузить папку с отпечатками пальцев
@router_aws.post("/upload-file")
async def route_upload_file(file: UploadFile, user=Depends(validate_user_token)):
    return await upload_file(file, user)


# загрузуть несколько папок с отпечатками пальцев
@router_aws.post("/upload-files")
async def route_upload_files(files: List[UploadFile] = File(...), user=Depends(validate_user_token)):
    return await upload_files(files, user)
