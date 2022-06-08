from .db import db
from .date_mixin import DateMixin



# autopep8: off
class Genre(db.Model, DateMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

#has many
    videos = db.relationship("Video", back_populates="genre", lazy='joined')

    @staticmethod
    def new(genre):
        return Genre(name=genre)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'videoIds:': [video.id for video in self.videos]
        }
