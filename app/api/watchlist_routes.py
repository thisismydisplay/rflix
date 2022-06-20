from enum import auto
from flask import Blueprint, request, session
from flask_login import login_required, current_user
from app.models import db, Watchlist, Video
from .utils import validation_errors_to_error_messages

watchlist_routes = Blueprint('watchlists', __name__)



# # GET watchlist videos by profileId
# @watchlist_routes.route('/<int:profileId>')
# @login_required
# def get_watchlist_videos(profileId):
#     watchlists = Watchlist.query.filter(Watchlist.profileId==profileId).all()
#     videoIds = [watchlist.videoId for watchlist in watchlists]
#     return {'watchlistVideos': videoIds}

# ADD to watchlist
@watchlist_routes.route('<int:profileId>/add/<videoId>', methods=["POST"])
@login_required
def add_video_to_watchlist(profileId, videoId):
    # is_duplicate_watchlist = Watchlist.query.filter(Watchlist.profileId==profileId and Watchlist.videoId==videoId).first()
    # if is_duplicate_watchlist:
    #     return {'errors': ['Video already exists in watchlist']}
    duplicateWatchlist = Watchlist.query.filter(Watchlist.profileId==profileId).filter(Watchlist.videoId==videoId).first()
    if duplicateWatchlist:
        return {'errors': ['Video already exists in watchlist']}, 418
    params = dict(
        profileId=profileId,
        videoId=videoId,
    )
    watchlist = Watchlist(**params)
    db.session.add(watchlist)
    db.session.commit()

    return watchlist.to_dict()

# ADD to watchlist
@watchlist_routes.route('<int:profileId>/delete/<int:videoId>', methods=['DELETE'])
@login_required
def delete_video_from_watchlist(profileId, videoId):
    watchlist = Watchlist.query.filter(Watchlist.profileId==profileId).filter(Watchlist.videoId==videoId).first()

    db.session.delete(watchlist)
    db.session.commit()

    return watchlist.to_dict()

#TESTS

# fetch('/api/watchlists/1').then((res)=> res.json())
# .then((data)=> console.log(data))

#POST watchlist
# fetch('/api/watchlists/1/add/3', {
#     method: 'POST',
#     headers: {'Content-Type': 'application/json'},
#     body: JSON.stringify({
#         profileId: 1,
#         videoId: 3,
#     }),
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))

# DELETE comment
# fetch('/api/watchlists/1/delete/3', {
#     method: 'DELETE',
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))
