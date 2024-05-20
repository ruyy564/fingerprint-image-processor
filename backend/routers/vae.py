from fastapi import APIRouter
from utils.VAE import generate_images

router_vae = APIRouter(prefix='/vae')


# сненерировать изображения
@router_vae.post("/predict")
async def route_upload_file(count: int):
    return generate_images(count)
