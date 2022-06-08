from app.models import db, Profile

profiles = [
    {
        "userId": 2,
        "name": "Jane",
        "profileImageUrl": 'https://lofidelity-bucket.s3.amazonaws.com/pexels-photo-598917.jpeg',
        "autoplayHover": True,
        "autoplayNext": True,
        "defaultVolume": 0.5,
    },
    {
        "userId": 2,
        "name": "Mark",
        "profileImageUrl": 'https://lofidelity-bucket.s3.amazonaws.com/astronaut-spacewalk-iss-tools.jpeg',
        "autoplayHover": False,
        "autoplayNext": False,
        "defaultVolume": 1,
    },
    {
        "userId": 3,
        "name": "Jeff",
        "profileImageUrl": 'https://lofidelity-bucket.s3.amazonaws.com/pexels-photo-598917.jpeg',
        "autoplayHover": True,
        "autoplayNext": True,
        "defaultVolume": 0.5,
    },
    {
        "userId": 3,
        "name": "Tony",
        "profileImageUrl": 'https://lofidelity-bucket.s3.amazonaws.com/astronaut-spacewalk-iss-tools.jpeg',
        "autoplayHover": False,
        "autoplayNext": False,
        "defaultVolume": 1,
    },
]

def seed_profiles():
  seeder = [Profile.seed(profile) for profile in profiles]
  db.session.add_all(seeder)
  db.session.commit()

def undo_profiles():
    db.session.execute('TRUNCATE profiles RESTART IDENTITY CASCADE;')
    db.session.commit()
