from .db import db, environment, SCHEMA, add_prefix_for_prod



class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    image = db.Column(db.String, nullable=False)
    is_display_image = db.Column(db.Boolean, default=False)

    # * Relationships 💚
    # One to Many
    image_owner = db.relationship("User", back_populates="owned_images")
    listing = db.relationship("Listing", back_populates="listing_images")

    def to_dict_simple(self):
        return {
            "id": self.id, 
            "listing_id": self.listing_id,
            "owner_id": self.owner_id,
            "image": self.image,
            "is_display_image": self.is_display_image
        }
    
    def to_dict(self):
        return {
            "id": self.id, 
            "listing_id": self.listing_id,
            "owner_id": self.owner_id,
            "image": self.image,
            "is_display_image": self.is_display_image,
            "listing": self.listing.to_dict()
        }
