import './VideoPage.css';
import '../../index.css';
import ReactPlayer from 'react-player';
import backButton from '../../images/back-btn.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo } from '../../store/video';
import CommentList from '../CommentList';
import { getComments } from '../../store/comment';

function VideoPage({ profile }) {
    const history = useHistory();
    const dispatch =useDispatch()
    const location = useLocation();
    const videoId = location.pathname.split('/')[2];
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        navbar.setAttribute('style', 'display:none;');
        // navbar.setAttribute("style","display:none;")
    });
    const video = useSelector((state) => state.video.videos[videoId]);

    //comments is an object with key videoId
    const comments = useSelector((state) => state.comment?.comments);

    const [commentsLoaded, setCommentsLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            await dispatch(getComments(videoId));
            //await dispatch(getComments(videoId));
            setCommentsLoaded(true);
            // setCommentsLoaded(true);
        })();
    }, [dispatch, videoId]);
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

    const [controlsOn, setControlsOn] = useState(false);
    const [firstMove, setFirstMove] = useState(true)

    const handleClick = () => {
        const navbar = document.getElementById('navbar');

        navbar.setAttribute('style', 'display:flex;');

        history.push(`/browse`);
    };
    const handleMove = () => {
        if(firstMove){
            setControlsOn(true);
            setFirstMove(false)
            setTimeout(() => {
                setControlsOn(false);
                setFirstMove(true)
            }, 5000);
        }
    };
    //add mousemove to show controls and back to browse button

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
                    // style={{display:'flex',justifyContent:'center', alignItems:'center'}}
                    // active={currentProfile?.id === profile.id}
                />
            </div>
            <div className='comments-wrapper'>
                {commentsLoaded && comments && <CommentList comments={comments} currentProfile={profile} videoId={video?.id}/>}
            </div>
        </div>

        // map movies in carousels by genre
    );
}

export default VideoPage;
