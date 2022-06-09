from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Profile


def profile_exists(form, field):
    # Checking if user exists
    name = field.data
    profile = Profile.query.filter(Profile.name == name).first()
    if profile:
        raise ValidationError('Profile name is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class ProfileForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])

    name = StringField('name', validators=[DataRequired(), Length(min=1, max=25,
               message='Name must be between 1 and 25 characters.'),profile_exists])
