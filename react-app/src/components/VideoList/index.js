import './VideoList.css';
import '../../index.css';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/profile';
import { Redirect } from 'react-router-dom';

function VideoList({ videos }) {
    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
    );
    console.log(profile);
    if (!profile) return <Redirect to='/profile' />;
    return (
        <div className='video-list-wrapper'>
            {Object.values(videos).map((video) => (
                <div className='video-thumb-wrapper'>
                    <ReactPlayer
                        volume={profile.defaultVolume}
                        url={video.videoUrl}
                        width='200px'
                        height='200px'
                        // active={currentProfile?.id === profile.id}
                        key={video.id}
                    />
                </div>
            ))}
        </div>
        // map movies in carousels by genre
    );
}

export default VideoList;
