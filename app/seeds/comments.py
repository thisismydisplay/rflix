from app.models import db, Comment

comments = [
    {
        "profileId": 1,
        "videoId": 1,
        "text": "Cowabunga, Dude!"
    },
    {
        "profileId": 2,
        "videoId": 1,
        "text": "BIG APPLE 3AM"
    },
    {
        "profileId": 3,
        "videoId": 2,
        "text": "Classic."
    },
    {
        "profileId": 4,
        "videoId": 2,
        "text": "I know a lot of people love this movie, but it's just not that good."
    }
]

def seed_comments():
  seeder = [Comment.seed(comment) for comment in comments]
  db.session.add_all(seeder)
  db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
