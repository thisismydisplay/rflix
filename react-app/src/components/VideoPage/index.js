import './VideoPage.css';
import '../../index.css';
import ReactPlayer from 'react-player';
import backButton from '../../images/back-btn.png'
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo } from '../../store/video';

function VideoPage({ profile }) {
    const history = useHistory();
    // const dispatch =useDispatch()
    const location = useLocation()
    const videoId = location.pathname.split('/')[2];
    useEffect(()=>{
        const navbar = document.getElementById('navbar')
        navbar.setAttribute("style","display:none;")
        // navbar.setAttribute("style","display:none;")
    })
    const video = useSelector(
        (state) => state.video.videos[videoId]
    );

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

    const [controlsOn, setControlsOn] = useState(false)

    const handleClick = () => {
        history.push(`/browse`);
    };
    const handleMove = () => {
        setControlsOn(true)
        const timer = setTimeout(()=> {
            setControlsOn(false)
        }, 5000)
    };
    //add mousemove to show controls and back to browse button

    return (
        <div video-page-wrapper>
            {controlsOn && (<div className='video-back-button' onClick={handleClick}>
                <img src={backButton} alt='go back' onClick={handleClick}/>
            </div>)}
            <div
                className='video-player-wrapper'
                onMouseMove={handleMove}
            >
                <ReactPlayer
                    controls={controlsOn}
                    volume={profile.defaultVolume}
                    playing
                    url={video.videoUrl}
                    width='100vw'
                    height='100vh'
                    // active={currentProfile?.id === profile.id}
                />
            </div>
            <div className='comments-wrapper'>
                <h1>TEST</h1>
                <h1>TEST</h1>
                <h1>TEST</h1>
                <h1>TEST</h1>
                <h1>TEST</h1>
                <h1>TEST</h1>
            </div>
        </div>

        // map movies in carousels by genre
    );
}

export default VideoPage;
