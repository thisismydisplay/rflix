from .db import db
from .date_mixin import DateMixin

# watchlists = db.Table(
#     "watchlists",
#     db.Column("profileId", db.Integer, db.ForeignKey("profiles.id"), primary_key=True),
#     db.Column("videoId", db.Integer, db.ForeignKey("videos.id"), primary_key=True),
# )



class Watchlist(db.Model, DateMixin):
    __tablename__ = 'watchlists'

    # sqlalchemy will automatically set pk id
    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    videoId = db.Column(db.Integer, db.ForeignKey('videos.id'), nullable=False)

    # attribute_name = db.relationship("OtherClassName", back_populates="other_relationship_attribute_name")

    #belongs to
    profile = db.relationship("Profile", back_populates="watchlists", lazy='joined')
    video = db.relationship("Video", back_populates="watchlists", lazy='joined')



    def to_dict(self):
        return {
            'id': self.id,
            'profileId': self.profileId,
            'videoId': self.videoId,
        }

    @staticmethod
    def seed(watchlist_data):
        watchlist = Watchlist()
        watchlist.profileId = watchlist_data.get("profileId")
        watchlist.videoId = watchlist_data.get("videoId")

        return watchlist
