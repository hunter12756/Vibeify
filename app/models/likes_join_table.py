from .db import db, environment, SCHEMA, add_prefix_for_prod



likes = db.Table(
    "user_likes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "song_id",
        db.Integer,
        db.ForeignKey("songs.id"),
        primary_key=True
    )
)
