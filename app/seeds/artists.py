from app.models import db, environment, SCHEMA, Artist
from sqlalchemy.sql import text
from random import randint
from faker import Faker

def seed_artists():
    fake = Faker()
    artists_name = [
    'Johnny Cash','Arctic Monkeys', 'The Smiths','The Smashing Pumpkins','Pixies',
    'Weezer','Sonic Youth','Car Seat Headrest','Mazzy Star','Pink Floyd',
    'Beck','Bon Iver','Fugazi','Duster','Elliot Smith',
    'Radiohead','Blur','The Last Shadow Puppets','Alex Turner','CeeLo Green','The Strokes'
    ]
    image_links = [
    "https://i.imgur.com/RGD1VZW.jpg",
    "https://i.imgur.com/fuP3NvA.jpg",
    "https://i.imgur.com/FEv4nWh.jpg",
    "https://i.imgur.com/8tidKRr.jpg",
    "https://i.imgur.com/VsiDRBj.jpg",
    "https://i.imgur.com/MM4jb8f.jpg",
    "https://i.imgur.com/TckJyd5.jpg",
    "https://i.imgur.com/TNjo9eC.jpg",
    "https://i.imgur.com/V0Ajqb1.jpg",
    "https://i.imgur.com/BRZ3hws.jpg",
    "https://i.imgur.com/06MhbRi.jpg",
    "https://i.imgur.com/YxmKewR.jpg",
    "https://i.imgur.com/lDYkFmG.jpg",
    "https://i.imgur.com/lpsNtz6.jpg",
    "https://i.imgur.com/Fh8SgZh.jpg",
    "https://i.imgur.com/uTJiGmU.jpg",
    "https://i.imgur.com/0RxiV8A.jpg",
    "https://i.imgur.com/FcGcmRL.jpg",
    "https://i.imgur.com/nLa13i8.jpg",
    "https://i.imgur.com/iv82xw9.jpg",
    "https://i.imgur.com/XzDQCW9.jpg"
]

    artists = []
    for idx,item in enumerate(artists_name):
        artist_data = {
            "name":artists_name[idx],
            "bio":fake.paragraph(),
            "profile_picture":image_links[idx],
            "user_id": idx+1,

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
