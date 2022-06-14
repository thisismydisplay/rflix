from app.models import db, Watchlist

watchlists = [

    {
        "profileId": 1,
        "videoId": 1,
    },
    {
        "profileId": 1,
        "videoId": 2,
    },
    {
        "profileId": 2,
        "videoId": 3,
    },
    {
        "profileId": 2,
        "videoId": 4,
    },
    {
        "profileId": 3,
        "videoId": 3,
    },
    {
        "profileId": 4,
        "videoId": 4,
    },
    {
        "profileId": 5,
        "videoId": 3,
    },
    {
        "profileId": 6,
        "videoId": 4,
    },

]

def seed_watchlists():
  seeder = [Watchlist.seed(watchlist) for watchlist in watchlists]
  db.session.add_all(seeder)
  db.session.commit()

def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
