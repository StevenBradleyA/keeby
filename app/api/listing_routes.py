from flask import Blueprint, request
from app.models import Listing, User, Image, Comment, db
from app.models.like import likes
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf
from ..forms.listing_form import ListingForm
from ..utils import pog 
import json
from .aws_helpers import (
    upload_file_to_s3, get_unique_filename)



listing_routes = Blueprint('listings', __name__)

#* ------------------------         FULL CRUD          --------------------------


# * -----------  GET  --------------
#  Returns all the listings

@listing_routes.route("")
def get_listings():
    listings = Listing.query.all()
    return [listing.to_dict() for listing in listings]


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

# * -----------  GET  --------------
# Search all listings by their name
@listing_routes.route("/<string:name>")
def search_all_listings(name):
    listings = Listing.query.filter(Listing.name.like(f"{name}%")).all()
    return [listing.to_dict_simple() for listing in listings]


# * -----------  POST  --------------
# Create a new listing

@listing_routes.route("", methods=["POST"])
@login_required
def create_listing():
    # pog(request.form)
    # listingDataDict = request.form.getlist('listing')[0]

    listing_str = request.form.to_dict()['listing']
    listing_dictionary = json.loads(listing_str)
    pog(listing_dictionary)
    pog(listing_dictionary['owner_id'])
    pog(listing_dictionary['name'])
    pog(listing_dictionary['price'])
    pog(listing_dictionary['description'])


    # we need to know what a form takes normally an obj a dictionary?
    # form = ListingForm(formdata=None, obj=listingDataDict)
    # form = ListingForm(request.form, obj=listingDataDict)


    # form = ListingForm(request.form)
    # form.populate_obj(listingDataDict)
    # form['csrf_token'].data = request.cookies['csrf_token']
    # pog(dir(form))
    # pog(dir(request))
    # pog(request.data)
    # this is saving the keys in a form but not the values
    # pog(dir(form))
    # pog(form.name)
    # pog(form.price.value)
    # pog(form.owner_id)
    # if form.validate_on_submit():
    #     pog('am i here')
    #     new_listing = Listing(
    #         owner_id=form.owner_id.data,
    #         name=form['name'],
    #         price=form.data['price'],
    #         description=form.data['description']
    #     )
        # pog(new_listing)
        # db.session.add(new_listing)
        # db.session.commit()
        # going to need to loop through image data
        # new_image = Image(
        #     listing_id=new_listing.id,
        #     owner_id=form.data['owner_id'],
        #     image=form.data['image'],
        #     is_display_image=form.data['is_display_image'],
        # )
        # db.session.add(new_image)
        # db.session.commit()

        # return new_listing.to_dict()
    return 'BAD DATA'




    for file in request.files.getlist('image'):
        file.filename = get_unique_filename(file.filename)
        upload = upload_file_to_s3(file)
        # pog('letsa go', file)
        if "url" not in upload:
            return {"error": "url not here"}
        url = upload["url"]
        new_image = Image(image= url)
        db.session.add(new_image)
        db.session.commit()







# * -----------  POST  --------------
# Create a new listing

# @listing_routes.route("", methods=["POST"])
# @login_required
# def create_listing():

#     form = ListingForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     # pog(dir(form))
#     # pog(dir(request))
#     # pog(request.data)
        
#     if form.validate_on_submit():
#         new_listing = Listing(
#             owner_id=form.data['owner_id'],
#             name=form.data['name'],
#             price=form.data['price'],
#             description=form.data['description']
#         )
#         db.session.add(new_listing)
#         db.session.commit()
#         # going to need to loop through image data
#         new_image = Image(
#             listing_id=new_listing.id,
#             owner_id=form.data['owner_id'],
#             image=form.data['image'],
#             is_display_image=form.data['is_display_image'],
#         )
#         db.session.add(new_image)
#         db.session.commit()

#         return new_listing.to_dict()
#     return 'BAD DATA'







# * -----------  POST  --------------
# Create a new comment for a specific listing



# * -----------  PUT  --------------
# Edit a listing



# * -----------  DELETE  --------------
# Delete a listing
