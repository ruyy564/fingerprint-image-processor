from fastapi import HTTPException, Response
from utils import aws_bucket_name, s3


# загрузуть несколько папок с отпечатками пальцев
async def upload_files(files, user):
    try:
        prefix = f'{user['id']}/'

        for file in files:
            contents = await file.read()
            s3.put_object(Bucket=aws_bucket_name,
                          Key=f'{prefix}{file.filename}', Body=contents)

        return Response(status_code=200)
    except Exception:
        raise HTTPException(status_code=403, detail="Files are not uploaded")
