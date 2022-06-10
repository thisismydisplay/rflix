import './VideoList.css';
import '../../index.css';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/profile';
import { Redirect } from 'react-router-dom';
import VideoThumbnail from '../VideoThumbnail';

function VideoList({ videos }) {
    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
    );

    console.log(profile);
    if (!profile) return <Redirect to='/profile' />;
    return (
        <div className='video-list-wrapper'>
            {Object.values(videos).map((video) => (
                <div className='video-thumb-wrapper' >
                <VideoThumbnail profile={profile} video={video}/>
                </div>
            ))}
        </div>
        // map movies in carousels by genre
    );
}

export default VideoList;
