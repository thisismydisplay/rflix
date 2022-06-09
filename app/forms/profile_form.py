from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Profile, User


def profile_exists(form, field):
    # Checking if user exists
    name = field.data
    userId = form.data['userId']
    count = 0
    profiles = Profile.query.filter(Profile.userId == userId).all()
    print('--------------')
    print(profiles)
    print('--------------')
    for profile in profiles:
      if profile.name == name:
        count = count + 1
    if count > 1:
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
              #  message='Name must be between 1 and 25 characters.')])
               message='Name must be between 1 and 25 characters.'),profile_exists])
    autoplayHover = BooleanField('autoplayHover')
    autoplayNext = BooleanField('autoplayNext')
    defaultVolume = FloatField('defaultVolume')
    profileImageUrl = StringField('profileImageUrl')
    # autoplayHover = BooleanField('autoplayHover', default=True, false_values=('False', 'false', ''))
    # autoplayNext = BooleanField('autoplayNext', default=True, false_values=('False', 'false', ''))
    # defaultVolume = FloatField('defaultVolume' default=0.5, false_values=('False', 'false', ''))
