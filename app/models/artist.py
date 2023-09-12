from .db import db, environment, SCHEMA, add_prefix_for_prod

class Artist(db.Model):
    __tablename__ = "artists"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    bio = db.Column(db.String(255),nullable=False)
    #aws in future
    profile_picture = db.Column(db.String(120),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")) )

    #relationships

    #One artist to ONE user
    # (they are same? maybe i change but idea is to have an artist's page be separate?)
    # potentially change this approach to just a user variable
    user_artist = db.relationship("User",back_populates='artist_user')

    #One artist to MANY songs
    song_artist = db.relationship("Song",back_populates='artist_song')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "bio": self.bio,
            "profile_picture":self.profile_picture,
            "user_id":self.user_id
        }
