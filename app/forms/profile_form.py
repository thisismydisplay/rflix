from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Profile, User


def profile_exists(form, field):
    # Checking if user exists
    name = field.data
    userId = form.data['userId']
    print('-------------')
    print(name)
    print(form.data['id'])
    profiles = Profile.query.filter(Profile.userId == userId).all()
    for profile in profiles:
      if profile.name == name and profile.id != form.data['id']: #check if profile.id == form.data['id']
          raise ValidationError('Profile name is already in use.')



# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class ProfileForm(FlaskForm):
    id = IntegerField('id')
    userId = IntegerField('userId')

    name = StringField('name', validators=[DataRequired(message="Please enter a profile name."), Length(min=1, max=25,
              #  message='Name must be between 1 and 25 characters.')])
               message='Name must be between 1 and 25 characters.'),profile_exists])
    autoplayHover = BooleanField('autoplayHover')
    autoplayNext = BooleanField('autoplayNext')
    defaultVolume = FloatField('defaultVolume')
    profileImageUrl = StringField('profileImageUrl')
    # autoplayHover = BooleanField('autoplayHover', default=True, false_values=('False', 'false', ''))
    # autoplayNext = BooleanField('autoplayNext', default=True, false_values=('False', 'false', ''))
    # defaultVolume = FloatField('defaultVolume' default=0.5, false_values=('False', 'false', ''))
