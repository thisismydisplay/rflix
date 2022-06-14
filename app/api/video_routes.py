from enum import auto
from flask import Blueprint, request, session
from flask_login import login_required, current_user
from app.models import db, Video, User, Watchlist
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

    # if current_user.is_authenticated:
    return {'videos': video_dict_list}
    # return {'errors': ['Unauthorized']}


# GET ONE video BY video Id
@video_routes.route('/<int:id>')
@login_required
def get_one_video(id):
    video = Video.query.get(id)
    return video.to_dict()



