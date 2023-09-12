from app.models import db, environment, SCHEMA, Song
from sqlalchemy.sql import text
from random import randint
from faker import Faker

#eventually will have to do some parsing and stuff to automatically get song title

def seed_songs():

    songs = []
    songs_titles=[
        'Hurt','No. 1 Party Anthem','I Know It\'s over','To Forgive',
        'Where Is My Mind?','Only In Dreams','Superstar','High to Death',
        'Fade Into You','Wish You Were Here','Loser','Holocene','I\'m So Tired',
        'Inside Out','Ballad Of Big Nothin','Creep','No Distance Left to Run','Time Has Come Again',
        'Stuck on the puzzle','I\'ll Be Around','The Adults Are Talking'
    ]
    for i in range(2,21):
        song_data = {
            "title":songs_titles[i-1],
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
