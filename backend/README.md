# Создание виртуального окружения Python

## 1. python -m venv my-venv или (py -m venv my-venv)

### Eсли не видит pip:
### 1.1. Изменение системных переменных
### 1.2. Переменные среды
### 1.3. Path -> Изменить -> Создать -> Добавить путь до файла python.exe и папки Scripts

## 2. активация
## .\my-venv\Scripts\activate (для Windows)

### Если активация не работает, то в PowerShell(адм.) ввести команду:
### 2.1 Set-ExecutionPolicy Unrestricted -Scope CurrentUser

# API

## Установка зависимостей:

### pip install -r requirements.txt

## Запуск из папки src:

### uvicorn main:app --reload --port 8080

## Swagger UI:

### http://127.0.0.1:8080/docs

## Dataset для обучения:

### https://www.kaggle.com/datasets/ruizgara/socofing

