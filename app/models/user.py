from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    daily_driver = db.Column(db.String, default="Classified")
    keycaps = db.Column(db.String, default="Classified")
    switches = db.Column(db.String, default="Classified")

    # * Relationships 💚
    # One to Many
    owned_comments = db.relationship("Comment", back_populates="comment_owner")
    owned_listings = db.relationship("Listing", back_populates="listing_owner")
    owned_images = db.relationship("Image", back_populates="image_owner")

    # Many to Many
    user_likes = db.relationship("Comment", secondary=likes, back_populates= 'liked')
    



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
