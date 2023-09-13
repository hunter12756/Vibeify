import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"mp3"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    unique_filename = get_unique_filename(file.filename)

    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            unique_filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type or "application/octet-stream"
            }
        )
    except Exception as e:
        print(f"DEBUG: Error during upload: {str(e)}")  # Add more detailed error output
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{unique_filename}"}


def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]

    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
