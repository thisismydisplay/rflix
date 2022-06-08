from ..models import db, Genre

genres = [
    "Comedy",
    "Drama",
    "Thriller",
    "Action & Adventure"
]

def seed_genres():
    seeder = [Genre.new(g) for g in genres]
    db.session.add_all(seeder)
    db.session.commit()

def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()
