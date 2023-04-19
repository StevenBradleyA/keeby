from .db import db, environment, SCHEMA, add_prefix_for_prod


likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column(
        "owner_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), 
        primary_key=True,
        nullable=False
    ),
    db.Column(
        "comment_id", 
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("comments.id"), ondelete="CASCADE"), 
        primary_key=True,
        nullable=False
    )
)
if environment == "production":
    likes.schema = SCHEMA
