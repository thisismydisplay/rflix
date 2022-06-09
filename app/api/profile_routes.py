from enum import auto
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Profile, User
from app.forms import ProfileForm
from .utils import validation_errors_to_error_messages

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

profile_routes = Blueprint('profiles', __name__)


# GET ALL PROFILES by userId
@profile_routes.route('/<int:id>')
@login_required
def get_all_profiles(id):
    print('hit route')
    profiles = Profile.query.filter(Profile.userId == id).all()

    profile_dict_list = [profile.to_dict() for profile in profiles]
    # profiles_by_profileId = {profile['id']: profile for profile in profile_dict_list}
    # if current_user.is_authenticated:
    return {'profiles': profile_dict_list}
    # return {'errors': ['Unauthorized']}


# # GET ONE PROFILE BY Profile Id
# @profile_routes.route('/<int:id>')
# @login_required
# def get_one_profile(id):
#     profile = Profile.query.get(id)
#     return profile.to_dict()


"""
If use "/" below, get FormDataRoutingRedirect error, informing you that your request
The URL was defined with a trailing slash so Flask will automatically redirect to
the URL with the trailing slash if it was accessed without one.
Make sure to directly send your POST-request to this URL since we can't make
browsers or HTTP clients redirect with form data reliably or without user
interaction. Note: this exception is only raised in debug mode"
"""


# ADD Profile - LOGGED-IN USER ONLY
@profile_routes.route('', methods=['POST'])
@login_required
def post_new_profile():
    form = ProfileForm()
    # Get csrf_token from request cookie and add to form manually
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # process data and send to db
        params = dict(
            name=form.data["name"],
            userId=form.data["userId"],
            profileImageUrl='https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg',
            autoplayHover=True,
            autoplayNext=False,
            defaultVolume=0.5,
        )

        new_profile = Profile(**params)
        db.session.add(new_profile)
        db.session.commit()

        return new_profile.to_dict()
        # return redirect("/") #backend redirect?

    # handle errors, note: automatically creates csrf error, if token not present
    if form.errors:  # check if errors exist
        # checks if profilel is unique
        # send errors to frontend (sends dictionary in json to frontend)
        # return form.errors
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418


# UPDATE ONE profile - LOGGED-IN USER ONLY
@profile_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_profile(id):

    form = ProfileForm()

    # Get csrf_token from request cookie and put into form manually
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        profile = Profile.query.get(id)
        # session_profile = profile.query.filter(profile.profileUrl == profileUrl).first()



        #might need to cast to bool
        profile.name = form.data["name"]
        profile.userId = form.data["userId"]
        profile.autoplayHover = bool(form.data["autoplayHover"])
        profile.autoplayNext = bool(form.data["autoplayNext"])
        profile.defaultVolume = form.data["defaultVolume"]
        profile.profileImageUrl = form.data["profileImageUrl"]

        db.session.commit()

        return profile.to_dict()
        # return redirect("/") backend redirect?

    # handle errors, automatically creates csrf error, if token not present
    if form.errors:  # check if errors exist
        # checks if profileUrl is unique
        # send errors to frontend
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418



# UPDATE profile
@profile_routes.route("/<int:id>/image", methods=["PATCH"])
@login_required
def upload_profile_image(id):

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

    current_profile = Profile.query.get(id)
    current_profile.profileImageUrl = url
    db.session.commit()
    return {"url": url}
    # return {'message': 'Success'}

@profile_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_profile(id):
    profile = Profile.query.get(id)
    db.session.delete(profile)
    db.session.commit()
    return {'message': 'Success'}


@profile_routes.route('/<int:id>/set', methods=['PATCH'])
@login_required
def set_profile(id):
    current_user['current_profile_id'] = id
    print('current user')
    print(current_user)
    profile = Profile.query.get(id)
    return profile.to_dict()
    return {'message': 'Success'}
# TEST ROUTES



# window.store.dispatch(
#   window.profile.addProfile({
#     name: 'test',
#     userId: 2,
#     autoplayHover: false,
#     autoplayNext: false,
#     defaultVolume: 0,
#     profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg',
#   })
# ).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})


# fetch('/api/profiles/5', {
#     method: 'POST',
#     headers: {'Content-Type': 'application/json'},
#     body: JSON.stringify({
#         userId: 1,
#         name: 'The Boss',
#         profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/17498db6ef0f40f793256acd10b863b6.png',
#         autoplayHover: false,
#         autoplayNext: false,
#         defaultVolume: 0,
#     }),
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))
