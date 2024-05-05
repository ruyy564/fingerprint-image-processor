from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.aws import routerAws
from routers.match_fingerprint import routerMatchFingerprint

load_dotenv()


# инициализация FastAPI
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


# API для работы с AWS
app.include_router(routerAws)
# APL для работы с отпечатками пальцев
app.include_router(routerMatchFingerprint)


# Проверка соединения
@app.get("/")
async def main():
    return {"user": "Hello"}
