# from datetime import datetime

from sqlalchemy.sql import func

from ..models.db import db

class DateMixin(object):
    # createdAt = db.Column(db.DateTime, default=datetime.now)
    # updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
