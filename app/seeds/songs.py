from app.models import db, environment, SCHEMA, Song
from sqlalchemy.sql import text
from random import randint
from faker import Faker

#eventually will have to do some parsing and stuff to automatically get song title

def seed_songs():
    fake = Faker()
    songs = []
    for i in range(2,14):
        for j in range (1,11):
            song_data = {
                "title":"TEST SONG NAME",
                "artist_id": i,
                "song_file":"THIS IS A TEST SONG FILE NAME"
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
