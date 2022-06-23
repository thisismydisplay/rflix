from app.models import db, Comment

comments = [
    {
        "profileId": 1,
        "videoId": 1,
        "text": "Wow! I remember watching this as a kid. Hits different now"
    },
    {
        "profileId": 2,
        "videoId": 1,
        "text": "It's just okay.  I prefer popeye."
    },
    {
        "profileId": 3,
        "videoId": 3,
        "text": "Classic."
    },
    {
        "profileId": 4,
        "videoId": 3,
        "text": "I know a lot of people love this movie, but it's just not that good."
    },
    {
        "profileId": 3,
        "videoId": 2,
        "text": "Love Jellys."
    },
    {
        "profileId": 3,
        "videoId": 2,
        "text": "So much."
    },
    {
        "profileId": 3,
        "videoId": 2,
        "text": "Can't put into words how much i love jellys."
    },
    {
        "profileId": 2,
        "videoId": 2,
        "text": "This film will change your life."
    },
    {
        "profileId": 3,
        "videoId": 3,
        "text": "This might be my favorite."
    },
]

def seed_comments():
  seeder = [Comment.seed(comment) for comment in comments]
  db.session.add_all(seeder)
  db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
