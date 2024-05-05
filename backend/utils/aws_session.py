from fastapi import HTTPException
import boto3
import os
from dotenv import load_dotenv

load_dotenv()


class SingletonSessionAWS(object):
    _s3 = None

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(SingletonSessionAWS, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        try:
            # создание сессии
            session = boto3.Session()
            self._s3 = session.client(
                service_name='s3',
                endpoint_url=os.getenv("endpoint_url"),
                aws_access_key_id=os.getenv("aws_access_key_id"),
                aws_secret_access_key=os.getenv("aws_secret_access_key"),
                region_name=os.getenv("region_name")
            )
        except Exception:
            raise HTTPException(
                status_code=500, detail="Unable connect to AWS")

    def get_s3(self):
        return self._s3


# получение bucket name
aws_bucket_name = os.getenv("aws_bucket_name")

# подключение к AWS
s3 = SingletonSessionAWS().get_s3()
