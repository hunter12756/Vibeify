from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
    User(username='Demo', email='demo@aa.io', password='password'),
    User(username='marnie', email='marnie@aa.io', password='password'),
    User(username='bobbie', email='bobbie@aa.io', password='password'),
    User(username='alice', email='alice@aa.io', password='password'),
    User(username='bob', email='bob@aa.io', password='password'),
    User(username='charlie', email='charlie@aa.io', password='password'),
    User(username='david', email='david@aa.io', password='password'),
    User(username='eva', email='eva@aa.io', password='password'),
    User(username='fiona', email='fiona@aa.io', password='password'),
    User(username='george', email='george@aa.io', password='password'),
    User(username='hannah', email='hannah@aa.io', password='password'),
    User(username='isaac', email='isaac@aa.io', password='password'),
    User(username='irene', email='irene@aa.io', password='password'),
    User(username='jack', email='jack@aa.io', password='password'),
    User(username='kate', email='kate@aa.io', password='password'),
    User(username='liam', email='liam@aa.io', password='password'),
    User(username='mia', email='mia@aa.io', password='password'),
    User(username='nathan', email='nathan@aa.io', password='password'),
    User(username='olivia', email='olivia@aa.io', password='password'),
    User(username='peter', email='peter@aa.io', password='password'),
    User(username='quinn', email='quinn@aa.io', password='password'),
    User(username='rachel', email='rachel@aa.io', password='password'),
    User(username='samuel', email='samuel@aa.io', password='password'),
    User(username='tina', email='tina@aa.io', password='password'),
    User(username='ulysses', email='ulysses@aa.io', password='password'),
    User(username='victor', email='victor@aa.io', password='password'),
    User(username='william', email='william@aa.io', password='password'),
    User(username='xander', email='xander@aa.io', password='password'),
    User(username='yasmine', email='yasmine@aa.io', password='password'),
    User(username='zane', email='zane@aa.io', password='password'),
    User(username='oliver', email='oliver@aa.io', password='password'),
    
    ]
    [db.session.add(User(**user)) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
