from fastapi import HTTPException, Response

from utils import aws_bucket_name, s3


# скачать папку с отпечатками пальцев в формате zip
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
            status_code=403, detail="Unable to download this file")
