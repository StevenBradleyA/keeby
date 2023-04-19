from flask import Blueprint, request
from app.models import Listing, User, Image, Comment, db
from app.models.like import likes
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf


comment_routes = Blueprint('comments', __name__)
