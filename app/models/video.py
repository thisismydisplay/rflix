from .db import db
from .date_mixin import DateMixin
from.watchlist import watchlists


class Video(db.Model, DateMixin):
    __tablename__ = 'videos'

    # sqlalchemy will automatically set pk id
    id = db.Column(db.Integer, primary_key=True)
    genreId = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)
    releaseYear = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    imageUrl = db.Column(db.String(1000))
    videoUrl = db.Column(db.String(1000), nullable=False)

    # attribute_name = db.relationship("OtherClassName", back_populates="other_relationship_attribute_name")

    #has many
    comments = db.relationship('Comment', back_populates='video', cascade='all, delete, delete-orphan', lazy='joined')

    #belongs to one
    genre = db.relationship('Genre', back_populates='videos')

    #many to many
    profiles = db.relationship('Profile', back_populates='videos', secondary=watchlists)


    def to_dict(self):
        return {
            'id': self.id,
            'genreId': self.genreId,
            'releaseYear': self.releaseYear,
            'title': self.title,
            'description': self.description,
            'imageUrl': self.imageUrl,
            'videoUrl': self.videoUrl,
            'genre': self.genre.name,
            'comments': [comment.to_dict() for comment in self.comments],
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    @staticmethod
    def seed(video_data):
        video = Video()
        video.genreId = video_data.get("genreId")
        video.releaseYear = video_data.get("releaseYear")
        video.title = video_data.get("title")
        video.description = video_data.get("description")
        video.imageUrl = video_data.get("videoUrl")
        video.videoUrl = video_data.get("videoUrl")


        return video
