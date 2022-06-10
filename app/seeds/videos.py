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
    },
    {
        "genreId": 5,
        "releaseYear": 1964,
        "title": "The Pink Panther",
        "description": "The Pink Panther animated shorts produced between December 18, 1964 and February 1, 1980 by DePatie-Freleng Enterprises (DFE Films) Ninety-two shorts were released theatrically, and eventually appeared on Saturday mornings via The Pink Panther Show starting in 1969. All made-for-television entries were also distributed to theaters after initially airing on The All New Pink Panther Show in 1978-1980.",
        "imageUrl": None,
        "videoUrl": "https://lofidelity-bucket.s3.amazonaws.com/ThePinkPanther-AFlyinthePink.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2015,
        "title": "The Planet",
        "description": "Experience our planet's natural beauty and examine how climate change impacts all living creatures in this ambitious documentary of spectacular scope.",
        "imageUrl": None,
        "videoUrl": "https://lofidelity-bucket.s3.amazonaws.com/test6.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2009,
        "title": "Beautiful world",
        "description": "This nature documentary takes a look at the most beautiful locations on earth.",
        "imageUrl": None,
        "videoUrl": "https://lofidelity-bucket.s3.amazonaws.com/test4.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2019,
        "title": "EXTREME NATURE",
        "description": "DAVID ATTENBOROUGH NARRATES THIS FACE-MELTING LOOK INTO NATURES MOST EXTREME PHENOMENA. BUCKLE UP!",
        "imageUrl": None,
        "videoUrl": "https://lofidelity-bucket.s3.amazonaws.com/test5.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2020,
        "title": "Tiny Tributaries",
        "description": "Little streams and tiny rivers",
        "imageUrl": None,
        "videoUrl": "https://lofidelity-bucket.s3.amazonaws.com/test1.mp4"
    }
]

def seed_videos():
  seeder = [Video.seed(video) for video in videos]
  db.session.add_all(seeder)
  db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
