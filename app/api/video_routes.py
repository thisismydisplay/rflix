from enum import auto
from flask import Blueprint, request, session
from flask_login import login_required, current_user
from app.models import db, Video, User
from app.forms import ProfileForm
from .utils import validation_errors_to_error_messages

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

video_routes = Blueprint('videos', __name__)


# GET ALL videoS
@video_routes.route('', methods=['GET'])
@login_required
def get_all_videos():
    # user = User.query.get(id)
    # if user.id != current_user.id:
    #     return {'errors': ['Invalid Request: Unauthorized']}, 403
    print('hit route')
    videos = Video.query.all()

    video_dict_list = [video.to_dict() for video in videos]
    # videos_by_videoId = {video['id']: video for video in video_dict_list}
    # if current_user.is_authenticated:
    return {'videos': video_dict_list}
    # return {'errors': ['Unauthorized']}


# GET ONE video BY video Id
@video_routes.route('/<int:id>')
@login_required
def get_one_video(id):
    video = Video.query.get(id)
    return video.to_dict()



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
