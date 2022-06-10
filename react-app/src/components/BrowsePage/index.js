import './BrowsePage.css';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/profile';
import { Redirect } from 'react-router-dom';
import VideoList from '../VideoList';

function BrowsePage({ videos }) {
    // const profile = useSelector(state=>selectProfile(state.profile))
    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
    );
    console.log(profile);
    if (!profile) return <Redirect to='/profile' />;
    return (
        <div className='browse-wrapper'>
            <ReactPlayer
                playing
                width='100vw'
                controls={false}
                volume={0}
                url='https://archive.org/download/Destroy_All_Planets/Destroy_All_Planets_512kb.mp4'
            />
            <div className='browse-list-wrapper'>
                <div className='video-list'>
                    <VideoList videos={videos} />
                </div>
            </div>
        </div>
        // map movies in carousels by genre
    );
}

export default BrowsePage;
