from .db import db, environment, SCHEMA, add_prefix_for_prod
from .like import likes

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), nullable=False, ondelete="CASCADE"))
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("listings.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)


    # * Relationships 💚
    # One to Many
    comment_owner = db.relationship("User", back_populates="owned_comments")
    in_listing = db.relationship("Listing", back_populates="listing_comments")

    # Many to Many
    like = db.relationship("User", secondary=likes, back_populates= 'user_likes')
