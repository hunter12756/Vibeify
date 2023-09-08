from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):
    __tablename__ = "playlists"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # relations
    # ONE Playlist to Many Songs
    song_playlist = db.relationship("Song", back_populates="playlist_song")

    # Many playlist to ONE user
    user_playlist = db.relationship("User", back_populates="playlist_user")

    def to_dict(self):
        return {
            "id": self.id,
            "song_id": self.song_id,
            "user_id": self.user_id,
        }
