from flask import Blueprint, request
from app.models import Listing, User, Image, Comment, db
from app.models.like import likes
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf


listing_routes = Blueprint('listings', __name__)

#* ------------------------         FULL CRUD          --------------------------


# * -----------  GET  --------------
#  Returns all the listings

@listing_routes.route("")
def get_listings():
    listings = Listing.query.all()
    return listings.to_dict_simple()


# * -----------  GET  --------------
# Returns a single listing by its id 

@listing_routes.route('/<int:id>')
def get_listing_by_id(id):
    listing = Listing.query.get(id)
    if not listing:
        return {
            "message": "Listing could not be found",
            "status_code": 404
        }, 404
    return listing.to_dict()

