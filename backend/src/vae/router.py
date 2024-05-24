from fastapi import APIRouter, File, Form, UploadFile

from vae.utils.vae_model import generate_images, fit_vae

router_vae = APIRouter(prefix='/vae')


# сненерировать изображения
@router_vae.post("/predict")
async def route_upload_file(count: int | None = Form(10), file: UploadFile = File(None),):
    return await generate_images(file, count,)


# обучить модель
@router_vae.post("/fit")
async def route_fit_vae(file: UploadFile, epochs:  int | None = Form(1), batch_size:  int | None = Form(128)):
    return await fit_vae(file, epochs, batch_size)
