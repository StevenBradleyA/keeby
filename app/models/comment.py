from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), nullable=False, ondelete="CASCADE"))
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("listings.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)


    # * Relationships 💚
