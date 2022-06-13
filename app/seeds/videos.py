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
    },
    {
        "genreId": 4,
        "releaseYear": 1969,
        "title": "Attack of the monsters",
        "description": "A UFO takes two boys from Earth to another planet where they discover a race of people who can control giant monsters and have plans to take over the Earth. It's up to Gamera to save the day",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/Attack_of_the_Monsters/Attack_of_the_Monsters.mp4"
    },
    {
        "genreId": 5,
        "releaseYear": 2016,
        "title": "A Date to Skate",
        "description": "Collection of classic Popeye cartoons that fell into the Public Domain.",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/popeye-pubdomain/A_Date_to_Skate.mp4"
    },
    {
        "genreId": 1,
        "releaseYear": 1914,
        "title": "Charlie Chaplin's The Good For Nothing",
        "description": "Charlie Chaplins 25th Film Released Aug. 31 1914 As His New Profession An American comedy silent film made at the Keystone Studios and starring Charlie Chaplin. The film involves Chaplin taking care of a man in a wheelchair.",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/CC_1914_08_31_TheGoodforNothing/CC_1914_08_31_TheGoodforNothing_512kb.mp4"
    },
    {
        "genreId": 1,
        "releaseYear": 1936,
        "title": "My Man Godfrey",
        "description": "A ditzy socialite finds a homeless man for a scavenger hunt and then hires him as their butler.",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/MyManGodfrey1936/MyManGodfrey1936.mp4"
    },
    {
        "genreId": 1,
        "releaseYear": 1939,
        "title": "The Gorilla",
        "description": "The three Ritz Brothers are fumbling detectives prowling an old dark house haunted by Bela Lugosi, an insane murderer and a giant gorilla.",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/the_gorilla/the_gorilla.mp4"
    },
    {
        "genreId": 3,
        "releaseYear": 1968,
        "title": "Night of the Living Dead",
        "description": "In this classic yet still creepy horror film, strangers hold up in a rural Pennsylvania farmhouse and battle constant attacks from dead locals who have been brought back to life by mysterious radiation.",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead.mp4"
    },
    {
        "genreId": 4,
        "releaseYear": 1977,
        "title": "Star Wars",
        "description": 'this is the original 1977 trailer that preceded the eventual change in 1981 when the film was retroactively renamed "Star Wars: Episode IV A New Hope"',
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/star-wars-1977/Star-wars_1977.mp4"
    },
    {
        "genreId": 4,
        "releaseYear": 1925,
        "title": "The Wizard of Oz - Silent",
        "description": "Larry Semon's 1925 film of The Wizard Of Oz. Features Oliver Hardy.",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/TheWizardOfOz1925/LarrySemonsWizardOfOzsilent1925.mp4"
    },
    {
        "genreId": 5,
        "releaseYear": 1994,
        "title": "Stimpy's Cartoon Show",
        "description": "The rare, original 1994 Snick airing of The Ren And Stimpy Show episode 'Stimpy's Cartoon Show' containing the scenes that were cut in later airings, and the original sound mixing and scene arrangement.",
        "imageUrl": None,
        "videoUrl": "https://archive.org/download/StimpysCartoonShow/14014405039de7e-360.mp4"
    },
    {
        "genreId": 5,
        "releaseYear": 2012,
        "title": "Superman",
        "description": "Classic superman cartoons",
        "imageUrl": None,
        "videoUrl": "https://archive.org/embed/ClassicSupermanCartoons720p/Superman_ArcticGiant.mp4"
    },
]

def seed_videos():
  seeder = [Video.seed(video) for video in videos]
  db.session.add_all(seeder)
  db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
