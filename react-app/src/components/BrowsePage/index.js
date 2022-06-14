import './BrowsePage.css';
import ReactPlayer from 'react-player';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VideoList from '../VideoList';
import { getVideos } from '../../store/video';

function BrowsePage() {
    // const profile = useSelector(state=>selectProfile(state.profile))
    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
    );

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        navbar.setAttribute('style', 'display:flex');
    }, []);
    //load videos here instead of app
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video.videos);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            await dispatch(getVideos());
            setLoaded(true);
        })();
    }, [dispatch]);
    if (!loaded) {
        return null;
    }

    if (!profile) return <Redirect to='/profile' />;
    return (
        <div className='browse-wrapper'>
            <ReactPlayer
                playing
                width='97vw'
                height='75vh'
                controls={false}
                volume={0}
                url='https://archive.org/download/Destroy_All_Planets/Destroy_All_Planets_512kb.mp4'
            />
            <div className='browse-list-wrapper'>
                <div className='video-list'>
                    <VideoList videos={videos} mylist={false} />
                </div>
            </div>
        </div>
        // map movies in carousels by genre
    );
}

export default BrowsePage;
