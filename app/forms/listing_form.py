from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, TextAreaField, MultipleFileField, URLField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS



class ListingForm(FlaskForm):

    owner_id = IntegerField('User Id')
    name = StringField('Name', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    image = URLField("Image", validators=[DataRequired()])
    # image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    is_display_image = BooleanField("Display Image")
