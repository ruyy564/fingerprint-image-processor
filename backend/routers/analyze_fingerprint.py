from fastapi import Depends, APIRouter, File, Form, UploadFile

from utils.validate_user_token import validate_user_token
from controllers.analyze_fingerprint.match_fingerprints import match_fingerprints
from controllers.analyze_fingerprint.generate_fingerprint import generate_fingerprints


router_analyze_fingerprints = APIRouter(prefix='/analyze')


# сравнение загруженного изображения отпечатка пальца с выбранным набором из zip-файла
@router_analyze_fingerprints.post("/match-fingerprints")
async def route_match_fingerprints(filename: str, file: UploadFile, user=Depends(validate_user_token)):
    return await match_fingerprints(filename, file, user)


# сравнение загруженного изображения отпечатка пальца с выбранным набором из zip-файла
@router_analyze_fingerprints.post("/generate-fingerprints")
async def route_match_fingerprints(
    rotation_range: float | None = Form(90),
    horizontal_flip: bool | None = Form(False),
    width_shift_range: tuple[float, float] | None = Form(None),
    height_shift_range: float | None = Form(None),
    zoom_range: float | None = Form(0.),
    count_generated_image: int | None = Form(9),
    file: UploadFile = File(...),
):
       
    return await generate_fingerprints(rotation_range, horizontal_flip, width_shift_range, height_shift_range, zoom_range, count_generated_image, file)
