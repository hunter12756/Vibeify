import boto3
import botocore
import os
import uuid

SONG_FILE_BUCKET_NAME = os.environ.get("S3_BUCKET")
SONG_IMG_BUCKET_NAME = os.environ.get("S3_BUCKET_SONG_IMG")
ARTIST_IMG_BUCKET_NAME = os.environ.get("S3_BUCKET_ARTIST_IMG")

SONG_FILE_S3_LOCATION = f"https://{SONG_FILE_BUCKET_NAME}.s3.amazonaws.com/"
SONG_IMG_S3_LOCATION = f"https://{SONG_IMG_BUCKET_NAME}.s3.amazonaws.com/"
ARTIST_IMG_S3_LOCATION = f"https://{ARTIST_IMG_BUCKET_NAME}.s3.amazonaws.com/"

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

#song_file upload
def upload_file_to_s3_song_file(file, acl="public-read"):
    unique_filename = get_unique_filename(file.filename)
    try:
        s3.upload_fileobj(
            file,
            SONG_FILE_BUCKET_NAME,
            unique_filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type or "application/octet-stream"
            }
        )
    except Exception as e:
        print(f"DEBUG: Error during upload: {str(e)}")  # Add more detailed error output
        return {"errors": str(e)}

    return {"url": f"{SONG_FILE_S3_LOCATION}{unique_filename}"}
# song img upload
def upload_file_to_s3_song_img(file, acl="public-read"):
    unique_filename = get_unique_filename(file.filename)
    try:
        s3.upload_fileobj(
            file,
            SONG_IMG_BUCKET_NAME,
            unique_filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type or "application/octet-stream"
            }
        )
    except Exception as e:
        print(f"DEBUG: Error during upload: {str(e)}")  # Add more detailed error output
        return {"errors": str(e)}

    return {"url": f"{SONG_IMG_S3_LOCATION}{unique_filename}"}
#artist img upload
def upload_file_to_s3_artist_img(file, acl="public-read"):
    unique_filename = get_unique_filename(file.filename)
    try:
        s3.upload_fileobj(
            file,
            ARTIST_IMG_BUCKET_NAME,
            unique_filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type or "application/octet-stream"
            }
        )
    except Exception as e:
        print(f"DEBUG: Error during upload: {str(e)}")  # Add more detailed error output
        return {"errors": str(e)}

    return {"url": f"{ARTIST_IMG_S3_LOCATION}{unique_filename}"}

def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=SONG_FILE_S3_LOCATION,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
