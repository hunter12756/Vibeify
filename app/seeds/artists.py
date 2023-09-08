from app.models import db, environment, SCHEMA, Artist
from sqlalchemy.sql import text
from random import randint
from faker import Faker

def seed_artists():
    fake = Faker()
    artists = []
    for i in range(2,11):
        artist_data = {
            "name":fake.name(),
            "bio":fake.paragraph(),
            "profile_picture":"https://i.imgur.com/JBI0wxv.png",
            "user_id": i,

        }
        artists.append(artist_data)

    [db.session.add(Artist(**artist)) for artist in artists]
    db.session.commit()

def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))

    db.session.commit()
