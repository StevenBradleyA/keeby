from .db import db, environment, SCHEMA, add_prefix_for_prod



class Listing(db.Model):
    __tablename__ = "listings"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)

    # * Relationships 💚
    # One to Many

    listing_owner = db.relationship("User", back_populates="owned_listings")
    listing_comments = db.relationship("Comment", back_populates="in_listing")
    listing_images = db.relationship("Image", back_populates="listing")


    def to_dict_simple(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "price": self.price, 
            "description": self.description
        }
    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "price": self.price, 
            "description": self.description,
            "listing_owner": self.listing_owner.to_dict_simple(),
            # "listing_comments":[comment.to_dict_simple() for comment in self.listing_comments ],
            "listing_images":[image.to_dict_simple() for image in self.listing_images],
        }
