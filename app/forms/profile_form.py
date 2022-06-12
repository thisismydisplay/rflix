from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Profile


def profile_exists(form, field):
    # Checking if user exists
    name = field.data
    userId = form.data['userId']
    print('-------------')
    print(name)
    print(form.data['id'])
    profiles = Profile.query.filter(Profile.userId == userId).all()
    for profile in profiles:
      if profile.name.lower() == name.lower() and profile.id != form.data['id']: #check if profile.id == form.data['id']
          raise ValidationError('Profile name is already in use.')


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
