from app.models import db, Video

videos = [

    {
        "genreId": 5,
        "releaseYear": 1964,
        "title": "The Pink Panther",
        "description": "The Pink Panther animated shorts produced between December 18, 1964 and February 1, 1980 by DePatie-Freleng Enterprises (DFE Films) Ninety-two shorts were released theatrically, and eventually appeared on Saturday mornings via The Pink Panther Show starting in 1969. All made-for-television entries were also distributed to theaters after initially airing on The All New Pink Panther Show in 1978-1980.",
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/ThePinkPanther-AFlyinthePink.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2015,
        "title": "The Planet",
        "description": "Experience our planet's natural beauty and examine how climate change impacts all living creatures in this ambitious documentary of spectacular scope.",
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/test6.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2009,
        "title": "Beautiful world",
        "description": "This nature documentary takes a look at the most beautiful locations on earth.",
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/test4.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2019,
        "title": "EXTREME NATURE",
        "description": "DAVID ATTENBOROUGH NARRATES THIS FACE-MELTING LOOK INTO NATURES MOST EXTREME PHENOMENA.",
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/test5.mp4"
    },
    {
        "genreId": 6,
        "releaseYear": 2020,
        "title": "Tiny Tributaries",
        "description": "Little streams and tiny rivers",
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/test1.mp4"
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
    # {
    #     "genreId": 4,
    #     "releaseYear": 2015,
    #     "title": "Star Wars: The Force Awakens",
    #     "description": 'Star Wars: The Force Awakens is a 2015 American epic space opera film produced, co-written, and directed by J. J. Abrams. The sequel to Return of the Jedi, it is the seventh film in the "Skywalker Saga".',
    #     "imageUrl": None,
    #     "videoUrl": "https://rflix.s3.amazonaws.com/Star_Wars_Episode_VII_The_Force_Awakens_Trailer.mp4"
    # },
    {
        "genreId": 1,
        "releaseYear": 2019,
        "title": "The Addams Family",
        "description": 'Members of the mysterious and spooky Addams family -- Gomez, Morticia, Pugsley, Wednesday, Uncle Fester and Grandma -- are readily preparing for a visit from their even creepier relatives. But trouble soon arises when shady TV personality Margaux Needler realizes that the Addams\' eerie hilltop mansion is standing in the way of her dream to sell all the houses in the neighborhood.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/the-addams-family-trailer.mov"
    },
    {
        "genreId": 1,
        "releaseYear": 2022,
        "title": "The Bob's Burgers Movie",
        "description": 'A ruptured water main creates an enormous sinkhole right in front of Bob\'s Burgers, blocking the entrance indefinitely and ruining the Belchers\' plans for a successful summer. While Bob and Linda struggle to keep the business afloat, the kids try to solve a mystery that could save their family\'s restaurant. As the dangers mount, these underdogs help each other find hope as they try to get back behind the counter.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/the-bobs-burgers-movie-trailer.mov"
    },
    {
        "genreId": 2,
        "releaseYear": 2022,
        "title": "Downton Abbey: A New Era",
        "description": 'The Crawley family goes on a grand journey to the South of France to uncover the mystery of the dowager countess\'s newly inherited villa.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/downton-abbey-a-new-era-trailer.mov"
    },
    {
        "genreId": 4,
        "releaseYear": 2022,
        "title": "Dr. Strange in the Multiverse of Madness",
        "description": 'Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/doctor-strangelove-in-the-multiverse-of-madness-trailer.mov"
    },
    {
        "genreId": 4,
        "releaseYear": 2022,
        "title": "Top Gun: Maverick",
        "description": 'After more than 30 years of service as one of the Navy\'s top aviators, Pete "Maverick" Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. Training a detachment of graduates for a special assignment, Maverick must confront the ghosts of his past and his deepest fears, culminating in a mission that demands the ultimate sacrifice from those who choose to fly it.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/top-gun-maverick-trailer.mov"
    },
    {
        "genreId": 4,
        "releaseYear": 2022,
        "title": "Everything Everywhere All at Once",
        "description": 'When an interdimensional rupture unravels reality, an unlikely hero must channel her newfound powers to fight bizarre and bewildering dangers from the multiverse as the fate of the world hangs in the balance.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/everything-everywhere-all-at-once-trailer.mov"
    },
    {
        "genreId": 4,
        "releaseYear": 2016,
        "title": "Batman v Superman: Dawn of Justice",
        "description": 'It\'s been nearly two years since Superman\'s (Henry Cavill) colossal battle with Zod (Michael Shannon) devastated the city of Metropolis. The loss of life and collateral damage left many feeling angry and helpless, including crime-fighting billionaire Bruce Wayne (Ben Affleck). Convinced that Superman is now a threat to humanity, Batman embarks on a personal vendetta to end his reign on Earth, while the conniving Lex Luthor (Jesse Eisenberg) launches his own crusade against the Man of Steel.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/BatmanvSupermanDawnofJustice.mp4"
    },
    # {
    #     "genreId": 4,
    #     "releaseYear": 2015,
    #     "title": "Jurassic World",
    #     "description": 'A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.',
    #     "imageUrl": None,
    #     "videoUrl": "https://rflix.s3.amazonaws.com/Jurassic_World_Trailer.mp4"
    # },
    # {
    #     "genreId": 4,
    #     "releaseYear": 2015,
    #     "title": "Mission: Impossible Rogue Nation",
    #     "description": 'Ethan and team take on their most impossible mission yet, eradicating the Syndicate - an International rogue organization as highly skilled as they are, committed to destroying the IMF.',
    #     "imageUrl": None,
    #     "videoUrl": "https://rflix.s3.amazonaws.com/MissionImpossible5.mp4"
    # },
    # {
    #     "genreId": 4,
    #     "releaseYear": 2015,
    #     "title": "Furious 7",
    #     "description": 'After defeating international terrorist Owen Shaw, Dominic Toretto (Vin Diesel), Brian O\'Conner (Paul Walker) and the rest of the crew have separated to return to more normal lives. However, Deckard Shaw (Jason Statham), Owen\'s older brother, is thirsty for revenge. A slick government agent offers to help Dom and company take care of Shaw in exchange for their help in rescuing a kidnapped computer hacker who has developed a powerful surveillance program.',
    #     "imageUrl": None,
    #     "videoUrl": "https://rflix.s3.amazonaws.com/Furious_7_2015.mp4"
    # },
    # {
    #     "genreId": 4,
    #     "releaseYear": 2015,
    #     "title": "Fantastic Four",
    #     "description": 'Fantastic Four, a contemporary re-imagining of Marvel\'s original and longest-running superhero team, centers on four young outsiders who teleport to an alternate and dangerous universe, which alters their physical form in shocking ways. Their lives irrevocably upended, the team must learn to harness their daunting new abilities and work together to save Earth from a former friend turned enemy.',
    #     "imageUrl": None,
    #     "videoUrl": "https://rflix.s3.amazonaws.com/Fantastic_Four_2015_Trailer.mp4"
    # },
    {
        "genreId": 4,
        "releaseYear": 2015,
        "title": "The Last Witch Hunter",
        "description": 'The last witch hunter is all that stands between humanity and the combined forces of the most horrifying witches in history. The last witch hunter is all that stands between humanity and the combined forces of the most horrifying witches in history.',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/TheLastWitchHunter.mp4"
    },
    # {
    #     "genreId": 4,
    #     "releaseYear": 2015,
    #     "title": "San Andreas",
    #     "description": 'After the infamous San Andreas Fault finally gives, triggering a magnitude 9 earthquake in California, a search and rescue helicopter pilot (Dwayne Johnson) and his estranged wife make their way together from Los Angeles to San Francisco to save their only daughter.',
    #     "imageUrl": None,
    #     "videoUrl": "https://rflix.s3.amazonaws.com/San_Andreas_2015.mp4"
    # },
    {
        "genreId": 6,
        "releaseYear": 2012,
        "title": "On the Other Side of the Waterfall",
        "description": 'Explore some of the world\'s most majestic waterfalls.  Narrated by David Attenborough',
        "imageUrl": None,
        "videoUrl": "https://rflix.s3.amazonaws.com/pexels-sarowar-hussain-5946371.mp4"
    },

]

def seed_videos():
  seeder = [Video.seed(video) for video in videos]
  db.session.add_all(seeder)
  db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
