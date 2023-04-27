from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from app import db
from ..utils import pog


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# * -----------  GET  --------------
# Returns a user by Id

@user_routes.route('/<int:id>')
@login_required
def user(id):

    user = User.query.get(id)
    return user.to_dict()


# * -----------  PUT  --------------
# Returns a user by Id

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):

    user = User.query.get(id)

    if not user:
        return 'User not found', 404

    user.username = request.json.get('username', user.username)
    user.email = request.json.get('email', user.email)
    user.hashed_password = request.json.get('password', user.password)
    user.first_name = request.json.get('first_name', user.first_name)
    user.last_name = request.json.get('last_name', user.last_name)
    user.profile_picture = request.json.get('profile_picture', user.profile_picture)
    user.daily_driver = request.json.get('daily_driver', user.daily_driver)
    user.keycaps = request.json.get('keycaps', user.keycaps)
    user.switches = request.json.get('switches', user.switches)
    db.session.commit()
    return user.to_dict_simple()


# * -----------  DELETE  --------------
# Removes a user by Id

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return 'User not found', 404

    if user.id != current_user.id:
        return {"message": "Unauthorized"}, 401
    db.session.delete(user)
    db.session.commit()

    return {"message": "Successfully Deleted!"}, 200
