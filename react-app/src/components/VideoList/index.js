import './VideoList.css';

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VideoThumbnail from '../VideoThumbnail';

function VideoList({ videos, mylist }) {
    const genres = [
        'Nature',
        'Cartoons',
        'Comedy',
        'Drama',
        'Thriller',
        'Action & Adventure',
    ];
    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
    );
    const myListVideos = Object.values(videos).filter((video) =>
        profile.watchlistVideos.includes(video.id)
    );
    if (!profile) return <Redirect to='/profile' />;
    return (
        <>
            {mylist && (
                <>
                    {myListVideos.length > 0 ? (
                        myListVideos.map((video) => (
                            <div
                                className='video-thumb-container'
                                key={video.id}
                            >
                                <VideoThumbnail
                                    profile={profile}
                                    video={video}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='my-list-no-videos-yet-text'>
                            You haven't added any videos to My List yet.
                        </div>
                    )}
                </>
            )}

            <div className='my-list-browse-container'>
                {!mylist && myListVideos.length > 0 && (
                    <div className='video-carousel-wrapper'>
                        <div className='video-carousel-wrapper'>
                            <div className='video-list-title'>My List</div>
                            <div className='video-list-wrapper'>
                                {myListVideos.map((video) => (
                                    <div
                                        className='video-thumb-container'
                                        key={video.id}
                                    >
                                        <VideoThumbnail
                                            profile={profile}
                                            video={video}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='browse-genre-container'>
                {!mylist &&
                    genres.map((genre, i) => (
                        <>
                            <div className='video-list-title'>{genre}</div>
                            <div className='video-list-wrapper'>
                                {Object.values(videos).map((video) => (
                                    <div key={video.id}>
                                        {video.genre === genre && (
                                            <div
                                                className='video-thumb-container'
                                                // key={video.id}
                                            >
                                                <VideoThumbnail
                                                    profile={profile}
                                                    video={video}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ))}
            </div>
        </>
    );
}

export default VideoList;
