from flask.cli import AppGroup
from .users import seed_users, undo_users
from .genres import seed_genres, undo_genres
from .profiles import seed_profiles, undo_profiles
from .videos import seed_videos, undo_videos
from .comments import seed_comments, undo_comments
from .watchlists import seed_watchlists, undo_watchlists
# from .watchlists import seed_watchlists, undo_watchlists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_genres()
    seed_profiles()
    seed_videos()
    seed_comments()
    seed_watchlists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_genres()
    undo_profiles()
    undo_videos()
    undo_comments()
    undo_watchlists()
    # Add other undo functions here
