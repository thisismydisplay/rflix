from app.models import db, Video

videos = [

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
