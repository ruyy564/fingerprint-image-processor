from fastapi import HTTPException, Response

from utils.aws_session import aws_bucket_name, s3


# скачать zip-файл с отпечатками пальцев
async def download_file(filename: str, user):
    try:
        prefix = f'{user['id']}/'

        content = s3.get_object(Bucket=aws_bucket_name,
                                Key=f'{prefix}{filename}')['Body'].read()
        return Response(
            content=content,
            headers={
                'Content-Disposition': f'attachment;filename={filename}',
                'Content-type': 'application/x-zip-compressed'
            }
        )
    except Exception:
        raise HTTPException(
            status_code=400, detail="Unable to download this file")
