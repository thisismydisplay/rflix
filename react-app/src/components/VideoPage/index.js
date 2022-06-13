import './VideoPage.css';

import backButton from '../../images/back-btn.png';

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';

import { getComments } from '../../store/comment';

import CommentList from '../CommentList';

function VideoPage({ profile }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const videoId = location.pathname.split('/')[2];
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        navbar.setAttribute('style', 'display:none;');
    });
    const video = useSelector((state) => state.video.videos[videoId]);

    //comments is an object with key videoId
    const comments = useSelector((state) => state.comment?.comments);

    //OR
    // const video = useSelector((state)=>state.video.currentVideo)
    // const [videoLoaded, setVideoLoaded] = useState(false)
    // const video = useEffect(()=> {
    //     (async () => {
    //         await dispatch(getVideo(videoId));
    //         //await dispatch(getComments(videoId));
    //         setVideoLoaded(true);
    //         // setCommentsLoaded(true);

    //     })();
    // }, [dispatch, videoId])

    const [commentsLoaded, setCommentsLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            await dispatch(getComments(videoId));
            setCommentsLoaded(true);
        })();
    }, [dispatch, videoId]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    
    const [controlsOn, setControlsOn] = useState(false);
    const [firstMove, setFirstMove] = useState(true);

    const handleClick = () => {
        const navbar = document.getElementById('navbar');

        navbar.setAttribute('style', 'display:flex;');

        history.push(`/browse`);
    };
    const handleMove = () => {
        if (firstMove) {
            setControlsOn(true);
            setFirstMove(false);
            setTimeout(() => {
                setControlsOn(false);
                setFirstMove(true);
            }, 5000);
        }
    };

    return (
        <div className='video-page-wrapper'>
            {controlsOn && (
                <div className='video-back-button' onClick={handleClick}>
                    <img src={backButton} alt='go back' onClick={handleClick} />
                </div>
            )}
            <div className='video-player-wrapper' onMouseMove={handleMove}>
                <ReactPlayer
                    className='video-main'
                    controls={controlsOn}
                    volume={profile.defaultVolume}
                    playing={profile.autoplayNext}
                    url={video?.videoUrl}
                    width='98vw'
                    height='100vh'
                />
            </div>
            <div className='video-detail-wrapper'>
                <div className='video-detail-container'>
                <div className='video-detail-list-wrapper'>
                    <p className='video-detail-title'>{video?.title}</p>
                    <p className='video-detail-year'>{video?.releaseYear}</p>
                    <p className='video-detail-genre'>{video?.genre}</p>

                </div>
                <div className='video-detail-description-wrapper'>
                    <div className='video-detail-description'>{video?.description}</div>
                </div>
                </div>
            </div>
            <div className='comments-wrapper'>
                {commentsLoaded && comments && (
                    <CommentList
                        comments={comments}
                        currentProfile={profile}
                        videoId={video?.id}
                    />
                )}
            </div>
        </div>
    );
}

export default VideoPage;
