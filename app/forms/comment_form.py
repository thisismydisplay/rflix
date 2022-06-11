from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    id = IntegerField('id')
    profileId = IntegerField('profileId')
    videoId = IntegerField('videoId')
    text = StringField('text', validators=[DataRequired(message="Comments cannot be empty."), Length(min=1, max=255,
               message='Comment must be between 1 and 255 characters.')])
