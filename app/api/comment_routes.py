from enum import auto
from flask import Blueprint, request, session
from flask_login import login_required, current_user
from app.models import db, Comment, User
from app.forms import CommentForm
from .utils import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)


# GET ALL comments by videoId
@comment_routes.route('/<int:id>')
@login_required
def get_all_comments(id):
    # Can we do something like video.profile.userid?
    # user = User.query.get(id)
    # if user.id != current_user.id:
    #     return {'errors': ['Invalid Request: Unauthorized']}, 403
    # print('hit route')
    comments = Comment.query.filter(Comment.videoId == id).all()
    print('***********comments')
    comment_dict_list = [comment.to_dict() for comment in comments]
    print(comment_dict_list)
    # comments_by_commentId = {comment['id']: comment for comment in comment_dict_list}
    # if current_user.is_authenticated:
    return {'comments': comment_dict_list}
    # return {'errors': ['Unauthorized']}

"""
If use "/" below, get FormDataRoutingRedirect error, informing you that your request
The URL was defined with a trailing slash so Flask will automatically redirect to
the URL with the trailing slash if it was accessed without one.
Make sure to directly send your POST-request to this URL since we can't make
browsers or HTTP clients redirect with form data reliably or without user
interaction. Note: this exception is only raised in debug mode"
"""

@comment_routes.route("", methods=["POST"])
@login_required
def post_comment():

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            profileId= form.profileId.data,
            videoId= form.videoId.data,
            text= form.text.data
        )

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()

    if form.errors:
        return form.errors

    return {"error": "Failed"}

# UPDATE ONE comment by commentId - LOGGED-IN USER ONLY
@comment_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_comment(id):
    # user = User.query.get(comment.profile.userId)
    # print(comment)
    # print(user)
    # if user.id != current_user.id:
    #     return {'errors': ['Invalid Request: Unauthorized']}

    comment = Comment.query.get(id)
    form = CommentForm()

    # Get csrf_token from request cookie and put into form manually
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():


        comment.text= form.text.data

        db.session.commit()

        return comment.to_dict()

    # handle errors, automatically creates csrf error, if token not present
    if form.errors:  # check if errors exist

        # send errors to frontend
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):

    comment = Comment.query.get(id)
    # user = comment.profile.userId
    # if user.id != current_user.id:
    #     return {'errors': ['Invalid Request: Unauthorized']}
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Success'}


# #TESTING
#  GET comments by videoId
# fetch('/api/comments/1').then((res)=> res.json())
# .then((data)=> console.log(data))

#POST comment
# fetch('/api/comments', {
#     method: 'POST',
#     headers: {'Content-Type': 'application/json'},
#     body: JSON.stringify({
#         profileId: 1,
#         videoId: 1,
#         text: 'yet another comment',
#     }),
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))

#PATCH comment
# fetch('/api/comments/6', {
#     method: 'PATCH',
#     headers: {'Content-Type': 'application/json'},
#     body: JSON.stringify({
#         text: 'TEST',
#     }),
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))

# DELETE comment
# fetch('/api/comments/6', {
#     method: 'DELETE',
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))
