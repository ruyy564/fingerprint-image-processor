from fastapi import HTTPException

from utils import aws_bucket_name, s3


# удалить папку с отпечатками пальцев
async def delete_file(filename: str, user):
    try:
        prefix = f'{user['id']}/'

        s3.delete_objects(Bucket=aws_bucket_name, Delete={
            'Objects': [{'Key': f'{prefix}{filename}'}]})

        raise HTTPException(status_code=200, detail="The file is deleted")
    except Exception:
        raise HTTPException(status_code=403, detail="The file is not deleted")
