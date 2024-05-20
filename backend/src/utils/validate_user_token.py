from fastapi import HTTPException, Request
import requests


# получение данных пользователя
async def validate_user_token(request: Request):
    token = request.headers.get('Authorization', None)

    if not token:
        raise HTTPException(
            status_code=401, detail="Missing required authorization token")
    user_response = requests.get('https://login.yandex.ru/info?format=json', headers={
        'Authorization': token
    })

    if user_response.status_code == 200:
        return user_response.json()

    raise HTTPException(
        status_code=401, detail="Invalid token")
