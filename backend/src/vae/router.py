from fastapi import APIRouter, File, UploadFile

from vae.utils.vae_model import generate_images, fit_vae

router_vae = APIRouter(prefix='/vae')


# сненерировать изображения
@router_vae.post("/predict")
async def route_upload_file(count: int, file: UploadFile = File(None),):
    return await generate_images(file, count,)


# обучить модель
@router_vae.post("/fit")
async def route_fit_vae(file: UploadFile):
    return await fit_vae(file)
