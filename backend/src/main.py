from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from aws.router import router_aws
from finger_analyzers.router import router_analyze_fingerprints
from vae.router import router_vae


# инициализация FastAPI
app = FastAPI()
# настройка политики CORS
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
app.include_router(router_aws)
# API для работы с отпечатками пальцев
app.include_router(router_analyze_fingerprints)
# API для работы с VAE
app.include_router(router_vae)


# Тест API
@app.get("/")
async def main():
    return "Hello"
