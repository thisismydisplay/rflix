from .db import db
from .date_mixin import DateMixin
from .watchlist import watchlists

# autopep8: off
class Profile(db.Model, DateMixin):
    __tablename__= 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    profileImageUrl = db.Column(db.String(1000))
    autoplayHover = db.Column(db.Boolean, nullable=False)
    autoplayNext = db.Column(db.Boolean, nullable=False)
    defaultVolume = db.Column(db.Float, nullable=True)

    # belongs to one
    user = db.relationship('User', back_populates='profiles', lazy="joined")

    # has many
    comments = db.relationship('Comment', back_populates='profile', cascade='all, delete, delete-orphan', lazy="joined")

    #many to many
    videos = db.relationship('Video', back_populates='profiles', secondary=watchlists)



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name,
            'profileImageUrl': self.profileImageUrl,
            'autoplayHover': self.autoplayHover,
            'autoplayNext': self.autoplayNext,
            'defaultVolume': self.defaultVolume,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'watchlist': [video.to_dict() for video in self.videos]
        }

    @staticmethod
    def seed(profile_data):
        profile = Profile()
        profile.userId = profile_data.get("userId")
        profile.name = profile_data.get("name")
        profile.profileImageUrl = profile_data.get("profileImageUrl")
        profile.autoplayHover = profile_data.get("autoplayHover")
        profile.autoplayNext = profile_data.get("autoplayNext")
        profile.defaultVolume = profile_data.get("defaultVolume")

        return profile
