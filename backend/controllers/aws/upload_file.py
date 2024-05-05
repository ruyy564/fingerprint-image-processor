from fastapi import HTTPException, Response

from utils.aws_session import aws_bucket_name, s3


# загрузить zip-файл с отпечатками пальцев
async def upload_file(file, user):
    try:
        prefix = f'{user['id']}/'
        contents = await file.read()
        s3.put_object(Bucket=aws_bucket_name,
                      Key=f'{prefix}{file.filename}', Body=contents)

        return Response(status_code=200)
    except Exception:
        raise HTTPException(status_code=403, detail="The file is not uploaded")
