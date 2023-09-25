from app.models import db, environment, SCHEMA, Song
from sqlalchemy.sql import text
from random import randint
from faker import Faker
import boto3
import urllib.parse
#eventually will have to do some parsing and stuff to automatically get song title

def seed_songs():
    # Initialize an S3 client
    s3 = boto3.client('s3')

    # Specify the bucket name
    bucket_name = 'vibeify-song-files'  # Replace with your actual S3 bucket name
    bucket_name2 = 'song-cover-pics'
    # List objects in the bucket
    objects = s3.list_objects_v2(Bucket=bucket_name)
    song_covers=s3.list_objects_v2(Bucket=bucket_name2)
    # Create an empty list to store the URLs
    object_urls = []
    song_covers_urls=[]
# Iterate through the objects and construct URLs
    for obj in objects.get('Contents', []):
        object_key_encoded = urllib.parse.quote(obj['Key'])
        object_url = f"https://{bucket_name}.s3.amazonaws.com/{object_key_encoded}"
        object_urls.append(object_url)
    for song in song_covers.get('Contents',[]):
        song_url=f"https://{bucket_name2}.s3.amazonaws.com/{song['Key']}"
        song_covers_urls.append(song_url)
    # count_limit = 21  # Set the limit to 21 items
    # for obj in objects.get('Contents', [])[:count_limit]:
    #     object_key_encoded = urllib.parse.quote(obj['Key'])
    #     object_url = f"https://{bucket_name}.s3.amazonaws.com/{object_key_encoded}"
    #     object_urls.append(object_url)

    # for song in song_covers.get('Contents', [])[:count_limit]:
    #     song_url = f"https://{bucket_name2}.s3.amazonaws.com/{song['Key']}"
    #     song_covers_urls.append(song_url)

    songs = []
    songs_titles=[
        'Stuck on the puzzle','No. 1 Party Anthem','Loser',
        'No Distance Left To Run','Holocene','High To Death','I\'ll Be Around',
        'Inside Out','Ballad Of Big Nothing','I\'m So Tired','Hurt',
        'Fade Into You','Wish You Were Here','Where Is My Mind','Creep',
        'Superstar','Time Has Come Again','To Forgive','I Know It\'s Over',
        'The Adults Are Talking','Only In Dreams'
    ]

    for i, object_url in enumerate(object_urls):
        song_data = {
            "title":songs_titles[i],
            "artist_id": i+1,
            "song_file":object_url,
            "cover_img":song_covers_urls[i]
        }
        songs.append(song_data)

    [db.session.add(Song(**song)) for song in songs]
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
