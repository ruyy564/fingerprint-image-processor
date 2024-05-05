from fastapi import Depends, APIRouter, UploadFile

from utils.validate_user_token import validate_user_token

from controllers.analyze_fingerprint.match_fingerprints import match_fingerprints


router_analyze_fingerprints = APIRouter(prefix='/analyze')


# сравнение загруженного изображения отпечатка пальца с выбранным набором из zip-файла
@router_analyze_fingerprints.post("/match-fingerprints")
async def route_match_fingerprints(filename: str, file: UploadFile, user=Depends(validate_user_token)):
    return await match_fingerprints(filename, file, user)
