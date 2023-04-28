from flask import Blueprint, request
from app.models import Listing, User, Image, Comment, db
from app.models.like import likes
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf
from ..forms.listing_form import ListingForm
from ..forms.comment_form import CommentForm
from ..utils import pog
import json
from .aws_helpers import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)


listing_routes = Blueprint('listings', __name__)

# * ------------------------         FULL CRUD          --------------------------

# todo Need to look at all querys so they end with a .all or first or whates
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
            "message": "Listing not found"
        }, 404
    return listing.to_dict()

# * -----------  GET  --------------
# Search all listings by their name


@listing_routes.route("/<string:name>")
def search_all_listings(name):
    listings = Listing.query.filter(Listing.name.like(f"{name}%")).all()
    return [listing.to_dict() for listing in listings]


# * -----------  GET  --------------
# Returns all comments for a single listing

@listing_routes.route('/<int:listing_id>/comments')
def get_listing_comments(listing_id):
    comments = Comment.query.filter(Comment.listing_id == listing_id).all()
    # if not comments:
    #     return {
    #         "message": "Listing not found",
    #     }, 404
    return {"comments": [comment.to_dict() for comment in comments]}


# * -----------  POST  --------------
# Create a new listing

@listing_routes.route("", methods=["POST"])
@login_required
def create_listing():
    listing_str = request.form.to_dict()['listing']
    listing_dictionary = json.loads(listing_str)
    listing_images = request.files.getlist('image')
    preview_image = request.files.getlist('preview')[0]

    form = ListingForm(**listing_dictionary)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_listing = Listing(
            owner_id=form.data["owner_id"],
            name=form.data['name'],
            price=form.data['price'],
            description=form.data['description']
        )
        db.session.add(new_listing)
        db.session.commit()

        preview_image.filename = get_unique_filename(preview_image.filename)
        upload = upload_file_to_s3(preview_image)
        if "url" not in upload:
            return {"error": "url not here"}
        url = upload["url"]
        new_image = Image(
            listing_id=new_listing.id,
            owner_id=form.data["owner_id"],
            image=url,
            is_display_image=True
        )

        db.session.add(new_image)

        for file in listing_images:
            file.filename = get_unique_filename(file.filename)
            upload = upload_file_to_s3(file)
            if "url" not in upload:
                return {"error": "url not here"}
            url = upload["url"]
            new_image = Image(
                listing_id=new_listing.id,
                owner_id=form.data["owner_id"],
                image=url,
            )

            db.session.add(new_image)
        db.session.commit()

        return new_listing.to_dict()
    return 'BAD DATA'


# * -----------  POST  --------------
# Create a new comment for a specific listing

@listing_routes.route('/<int:listing_id>/comments', methods=['POST'])
@login_required
def create_comment(listing_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_comment = Comment(
            owner_id=form.data['owner_id'],
            listing_id=listing_id,
            content=form.data['content'],
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
    return 'BAD DATA'


# * -----------  PUT  --------------
# Edit a listing
@listing_routes.route('/<int:listing_id>', methods=['PUT'])
@login_required
def update_listing(listing_id):
    listing = Listing.query.get(listing_id)
    listing_str = request.form.to_dict()['listing']

    listing_dictionary = json.loads(listing_str)
    listing_images = request.files.getlist('image')

    delete_images = request.form.getlist('delete')
    delete_image_ids = [int(id) for id in delete_images]

    preview_image = request.files.getlist('preview')

    form = ListingForm(**listing_dictionary)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        listing.owner_id = form.data['owner_id']
        listing.name = form.data['name']
        listing.price = form.data['price']
        listing.description = form.data['description']

    else:
        return 'BAD DATA'

    current_preview_image = Image.query.filter(
        Image.listing_id == listing_id, Image.is_display_image == True).first()

    if len(preview_image) != 0:
        current_preview_image.is_display_image = False

        preview_image.filename = get_unique_filename(preview_image.filename)
        upload = upload_file_to_s3(preview_image)
        if "url" not in upload:
            return {"error": "url not here"}
        url = upload["url"]
        update_preview_image = Image(
            listing_id=listing.id,
            owner_id=form.data["owner_id"],
            image=url,
            is_display_image=True
        )
        db.session.add(update_preview_image)

    else:
        preview_id = int(request.form.getlist('preview')[0])
        if current_preview_image.id != preview_id:
            current_preview_image.is_display_image = False
            new_display = Image.query.filter(Image.id == preview_id).first()
            new_display.is_display_image = True

    if len(listing_images):
        for file in listing_images:
            file.filename = get_unique_filename(file.filename)
            upload = upload_file_to_s3(file)
            if "url" not in upload:
                return {"error": "url not here"}
            url = upload["url"]

            new_image = Image(
                listing_id=listing.id,
                owner_id=form.data["owner_id"],
                image=url,
            )

            db.session.add(new_image)

    if len(delete_image_ids):
        for image_id in delete_image_ids:
            goodbye_image = Image.query.filter(Image.id == image_id).first()
            remove_file_from_s3(goodbye_image.image)
            db.session.delete(goodbye_image)

    db.session.commit()

    return listing.to_dict()


# * -----------  DELETE  --------------
# Delete a listing

@listing_routes.route('/<listing_id>', methods=['DELETE'])
@login_required
def delete_listing_by_id(listing_id):
    listing = Listing.query.get(listing_id)

    if not listing:
        return {"message": "listing could not be found"}, 404

    if listing.owner_id != current_user.id:
        return {
            "message": "Forbidden",
            "status_code": 403
        }, 403

    db.session.delete(listing)
    db.session.commit()

    return {"message": "Successfully Deleted!"}
