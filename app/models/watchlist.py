from .db import db

watchlists = db.Table(
    "watchlists",
    db.Column("profileId", db.Integer, db.ForeignKey("profiles.id"), primary_key=True),
    db.Column("videoId", db.Integer, db.ForeignKey("videos.id"), primary_key=True),
)



# class Watchlist(db.Model, DateMixin):
#     __tablename__ = 'watchlists'

#     # sqlalchemy will automatically set pk id
#     id = db.Column(db.Integer, primary_key=True)
#     profileId = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
#     videoId = db.Column(db.Integer, db.ForeignKey('video.id'), nullable=False)

#     # attribute_name = db.relationship("OtherClassName", back_populates="other_relationship_attribute_name")

#     #belongs to
#     profile = db.relationship("Profile", back_populates="watchlists", lazy='joined')
#     video = db.relationship("Video", back_populates="watchlists", lazy='joined')



#     def to_dict(self):
#         return {
#             'id': self.id,
#             'profileId': self.profileId,
#             'videoId': self.videoId,
#         }
