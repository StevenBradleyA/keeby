from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, TextAreaField, MultipleFileField, URLField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from ..utils import pog



class ListingForm(FlaskForm):
    owner_id = IntegerField('User Id')
    name = StringField('Name', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    # is_display_image = BooleanField("Display Image")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
