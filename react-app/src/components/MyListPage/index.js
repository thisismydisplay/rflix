import './MyListPage.css';
// import ReactPlayer from 'react-player';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VideoList from '../VideoList';
import { getVideos } from '../../store/video';

function MyListPage() {
    // const profile = useSelector(state=>selectProfile(state.profile))
    const profile = useSelector(
        (state) => state.profile.profiles[state.profile.currentProfileId]
        );

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
        <div className='my-list-wrapper'>
            <div className='my-list-list-wrapper'>
            <div className='my-list-title'>My List</div>
            <div className='my-list-description'>See videos you've added to your watchlist.</div>
                <div className='my-video-list'>
                    <VideoList videos={videos} mylist={true}/>
                </div>
            </div>
        </div>
        // map movies in carousels by genre
    );
}

export default MyListPage;
