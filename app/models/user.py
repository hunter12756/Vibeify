from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# from .likes_join_table import likes
class User(db.Model, UserMixin):
    __tablename__ = 'users'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    #relations
    #One user to MANY playlists
    playlist_user = db.relationship("Playlist", back_populates="user_playlist")

    #One user to ONE artist
    # (they are same? maybe i change but idea is to have an artist's page be separate?)
    # potentially change this approach to just a user variable
    artist_user = db.relationship("Artist",uselist=False,back_populates='user_artist')

    #join table
    # user_likes = db.relationship(
    #     "Song",
    #     secondary=likes,
    #     back_populates="likes_user"
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
