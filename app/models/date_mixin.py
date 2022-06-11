from datetime import datetime

from sqlalchemy.sql import func

from ..models.db import db

class DateMixin(object):
    # createdAt = db.Column(db.DateTime, default=datetime.now)
    # updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
