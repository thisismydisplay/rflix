from enum import auto
from flask import Blueprint, request, session
from flask_login import login_required, current_user
from app.models import db, Profile, User
from app.forms import ProfileForm
from .utils import validation_errors_to_error_messages

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

profile_routes = Blueprint('profiles', __name__)


# GET ALL PROFILES by userId
@profile_routes.route('/<int:id>/user')
@login_required
def get_all_profiles(id):
    user = User.query.get(id)
    if user.id != current_user.id:
        return {'errors': ['Invalid Request: Unauthorized']}, 403
    print('hit route')
    profiles = Profile.query.filter(Profile.userId == id).all()

    profile_dict_list = [profile.to_dict() for profile in profiles]
    # if current_user.is_authenticated:
    return {'profiles': profile_dict_list}
    # return {'errors': ['Unauthorized']}


# GET ONE PROFILE BY Profile Id

@profile_routes.route('/<int:id>')
@login_required
def get_one_profile(id):
    profile = Profile.query.get(id)
    return profile.to_dict()


# ADD Profile - LOGGED-IN USER ONLY
@profile_routes.route('/', methods=['POST'])
@login_required
def post_new_profile():

    userId = request.json['userId']
    user = User.query.get(userId)
    if userId != current_user.id:
        return {'errors': ['Invalid Request: Unauthorized']}, 403

    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # process data and send to db
        params = dict(
            name=form.data["name"],
            userId=userId,
            profileImageUrl='https://lofidelity-bucket.s3.amazonaws.com/rflix-default-profile.png',
            autoplayHover=True,
            autoplayNext=True,
            defaultVolume=0.5,
        )

        new_profile = Profile(**params)
        db.session.add(new_profile)
        db.session.commit()

        return new_profile.to_dict()

    # handle errors, note: automatically creates csrf error, if token not present
    if form.errors:  # check if errors exist
        # send errors to frontend (sends dictionary in json to frontend)
        # return form.errors
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418


# UPDATE ONE profile - LOGGED-IN USER ONLY
@profile_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_profile(id):
    profile = Profile.query.get(id)
    user = User.query.get(profile.userId)
    print(profile)
    print(user)
    if user.id != current_user.id:
        return {'errors': ['Invalid Request: Unauthorized']}
    form = ProfileForm()

    # Get csrf_token from request cookie and put into form manually
    form['csrf_token'].data = request.cookies['csrf_token']
    form['id'].data = id

    if form.validate_on_submit():

        profile.name = form.data["name"]
        profile.userId = user.id
        profile.autoplayHover = form.data["autoplayHover"]
        profile.autoplayNext = form.data["autoplayNext"]
        profile.defaultVolume = form.data["defaultVolume"]
        db.session.commit()

        return profile.to_dict()


    # handle errors, automatically creates csrf error, if token not present
    if form.errors:  # check if errors exist
        # send errors to frontend
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418



# UPDATE profile image
@profile_routes.route("/<int:id>/image", methods=["POST"])
@login_required
def upload_profile_image(id):
    profile = Profile.query.get(id)
    user = User.query.get(profile.userId)
    if user.id != current_user.id:
        return {'errors': ['Invalid Request: Unauthorized']}

    if "image" not in request.files:
        return {"errors": ["Please choose an image file"]}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["File type not permitted (Only .png, .jpg, .jpeg, .gif permitted)"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    profile.profileImageUrl = url
    db.session.commit()
    return profile.to_dict()

    # return {'message': 'Success'}

#delete one profile
@profile_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_profile(id):

    profile = Profile.query.get(id)
    user = User.query.get(profile.userId)
    if user.id != current_user.id:
        return {'errors': ['Invalid Request: Unauthorized']}
    db.session.delete(profile)
    db.session.commit()
    return {'message': 'Success'}


# @profile_routes.route('<int:profileId>/watchlist', methods=['GET'])
# @login_required
# def get_watchlist():

#     print('hit route')
#     profile = Profile.query.get(id)
#     watchlist = profile.watchlist_videos

#     return {'watchlistVideos': watchlist}
