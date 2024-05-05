from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.aws import router_aws
from routers.analyze_fingerprint import router_analyze_fingerprints

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
# APL для работы с отпечатками пальцев
app.include_router(router_analyze_fingerprints)


# Тест API
@app.get("/")
async def main():
    return "Hello"
