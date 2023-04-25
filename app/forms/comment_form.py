from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    owner_id = IntegerField('User Id')
    content = StringField('Comment', validators=[DataRequired()])
