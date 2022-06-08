from app.models import db, Video

videos = [
    {
        "genreId": 4,
        "releaseYear": 2014,
        "title": "Teenage Mutant Ninja Turtles",
        "description": "The Teenage Mutant Ninja Turtles are bigger and better than ever in this blockbuster hit loaded with nonstop action and laughs! When New York City is in trouble, it's up to these four ninja-fighting, pizza-loving brothers to save it. Aided by determined reporter April O'Neil (Megan Fox) and their wise master Splinter, these unlikely heroes must face their ultimate nemesis - the evil Shredder.",
        "imageUrl": None,
        "videoUrl": "https://youtu.be/-dsy5fJoMq4"
    },
    {
        "genreId": 1,
        "releaseYear": 2004,
        "title": "Napoleon Dynamite",
        "description": "From the rural town of Preston, Idaho, comes Napoleon Dynamite (Jon Heder). With a red 'fro, his moon boots, and illegal government ninja moves, he is a new kind of hero. Napoleon spends his days drawing magical beasts, working on his computer hacking skills to impress the chicks, and begrudgingly feeding his Grandma's pet llama. When his friend Pedro (Efren Ramirez) decides to run for class president, it is Napoleon to the rescue to help him triumph over adversity.",
        "imageUrl": None,
        "videoUrl": "https://youtu.be/XMmTMIkDON4"
    }
]

def seed_videos():
  seeder = [Video.seed(video) for video in videos]
  db.session.add_all(seeder)
  db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
