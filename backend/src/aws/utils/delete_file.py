from fastapi import HTTPException, Response

from utils.aws_session import aws_bucket_name, s3


# удалить zip-файл с отпечатками пальцев
async def delete_file(filename: str, user):
    try:
        prefix = f'{user['id']}/'

        s3.delete_objects(Bucket=aws_bucket_name, Delete={
            'Objects': [{'Key': f'{prefix}{filename}'}]})

        return Response(status_code=200)
    except Exception:
        raise HTTPException(status_code=400, detail="The file is not deleted")
