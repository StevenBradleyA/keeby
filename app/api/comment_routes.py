from flask import Blueprint, request
from app.models import Listing, User, Image, Comment, db
from app.models.like import likes
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf
from ..utils import pog 

comment_routes = Blueprint('comments', __name__)


# * ------------------------         FULL CRUD          --------------------------


# * -----------  GET  --------------
#  Returns a single comment and its likes
@comment_routes.route('/<int:id>')
def get_comment_by_id(id):
    comment = Comment.query.get(id)
    if not comment:
        return {
            "message": "comment not found"
        }, 404
    return comment.to_dict()


# * -----------  POST  --------------
# Add a like to a comment
@comment_routes.route('/<int:id>/like', methods=["POST"])
@login_required
def create_like(id):
    comment = Comment.query.get(id)
    if not comment:
        return {
            "message": "Comment not found"
        }, 404

    user = User.query.get(request.json['owner_id'])
    if not user:
        return {
            "message": "User not found"
        }, 404

    comment.liked.append(user)
    db.session.commit()

    return comment.to_dict()


# * -----------  PUT  --------------
# Edit a comment

@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_comment(id):
    edit = request.json
    comment = Comment.query.get(id)

    if not comment:
        return {
            "message": "Comment not found"
        }, 404

    if comment.owner_id != current_user.id:
        return {
            "message": "Forbidden"
        }, 403

    comment.content = edit['content']
    db.session.commit()
    return comment.to_dict()


# * -----------  DELETE  --------------
# Delete a comment
@comment_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)

    if not comment:
        return {
            "message": "Comment not found"
        }, 404

    if comment.owner_id != current_user.id:
        return {
            "message": "Forbidden"
        }, 403

    db.session.delete(comment)
    db.session.commit()
    return {"message": "Successfully Deleted"}


# * -----------  DELETE  --------------
# Delete a like
@comment_routes.route('/<int:id>/like', methods=["DELETE"])
@login_required
def delete_like(id):
    comment = Comment.query.get(id)
    if not comment:
        return {
            "message": "Comment not found"
        }, 404

    user = User.query.get(request.json['owner_id'])
    if not user:
        return {
            "message": "User not found"
        }, 404

    for remove_user in comment.liked:
        if remove_user.id == user.id:
            comment.liked.remove(user)
# test removal of one for loop
    # for remove_comment in user.user_likes:
    #     if remove_comment.id == comment.id:
    #         user.user_likes.remove(comment)

    db.session.commit()
    return comment.to_dict()
