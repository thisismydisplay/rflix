import './VideoList.css';

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VideoThumbnail from '../VideoThumbnail';


function VideoList({ videos }) {
    const genres = [
        "Nature",
        "Cartoons",
        "Comedy",
        "Drama",
        "Thriller",
        "Action & Adventure",
    ]
    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
    );

    console.log(profile);
    if (!profile) return <Redirect to='/profile' />;
    return (<>
        {genres.map((genre) =>

       ( <div className='video-carousel-wrapper'>
            <div className='video-list-title'>{genre}</div>
            <div className='video-list-wrapper'>
                {Object.values(videos).map((video) =>  (
                    <>
                    {video.genre === genre &&

                        (<div className='video-thumb-container' key={video.id}>
                        <VideoThumbnail profile={profile} video={video} />
                    </div>)
                    }
                    </>
                ))}
            </div>
        </div>)
        )}
        </>
        // map movies in carousels by genre
    );
}

export default VideoList;
