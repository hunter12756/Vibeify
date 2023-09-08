from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .likes_join_table import likes
from .likes_join_table import likes
class Song(db.Model):
    __tablename__ = "songs"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("artists.id")), nullable=False)
    song_file = db.Column(db.String(120))

    #relationships
    #Many songs to ONE playlist
    playlist_song = db.relationship("Playlist",back_populates='song_playlist')
    #Many songs to ONE artist
    artist_song = db.relationship("Artist",back_populates='song_artist')

    #join table
    likes_user = db.relationship(
        "User",
        secondary=likes,
        back_populates="user_likes")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist_id": self.artist_id,
            "song_file": self.song_file
        }
