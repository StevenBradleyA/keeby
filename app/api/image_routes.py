from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from ..utils import pog 
from .aws_helpers import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)

@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
 
    # if form.validate_on_submit():
    # pog('dir', dir(request))
    # pog('pog', dir(request.files))
    # pog('stack', request.files.getlist('image'))
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




    # if "url" not in upload:
    # if the dictionary doesn't have a url key
    # it means that there was an error when we tried to upload
    # so we send back that error message
    #     return render_template("post_form.html", form=form, errors=[upload])



    # if form.errors:
    #     print(form.errors)
    #     return render_template("post_form.html", form=form, errors=form.errors)

    # return render_template("post_form.html", form=form, errors=None)
