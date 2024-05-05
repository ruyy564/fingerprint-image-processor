

from typing import List
from fastapi import HTTPException

from utils.aws_session import aws_bucket_name, s3


# получение списка zip-файлов пользователя с отпечатками пальцев
async def get_list_fingerprints_by_user(user) -> List[str]:
    try:
        data = []
        prefix = f'{user['id']}/'
        file_list = s3.list_objects(Bucket=aws_bucket_name, Prefix=prefix)

        if ('Contents' in file_list):
            for key in file_list['Contents']:
                data.append(key['Key'].replace(prefix, ''))

        return data
    except Exception:
        raise HTTPException(
            status_code=403, detail="The folder list is not available")
