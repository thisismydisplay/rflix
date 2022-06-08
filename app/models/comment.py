from .db import db
from .date_mixin import DateMixin

# autopep8: off
class Comment(db.Model, DateMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    videoId = db.Column(db.Integer, db.ForeignKey('videos.id'), nullable=False)
    text = db.Column(db.String(255), nullable=False)

    # belongs to
    profile = db.relationship('Profile', back_populates='comments', lazy='joined')
    video = db.relationship('Video', back_populates='comments')


    def to_dict(self):
        return {
            'id': self.id,
            'profileId': self.profileId,
            'videoId': self.videoId,
            'text': self.text,
            "created_at" : self.createdAt,
            "updated_at" : self.updatedAt,
        }

    @staticmethod
    def seed(comment_data):
        comment = Comment()
        comment.profileId = comment_data.get("profileId")
        comment.videoId = comment_data.get("videoId")
        comment.text = comment_data.get("text")

        return comment
