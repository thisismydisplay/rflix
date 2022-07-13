import './BrowsePage.css';
import ReactPlayer from 'react-player';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import VideoList from '../VideoList';
import Modal from '../Modal';
import VideoDetailModal from '../VideoDetailModal';

import { getVideos, getVideo } from '../../store/video';

import playButton from '../../images/play-btn-black.png';
import infoButton from '../../images/get-info-btn.png';
import muteButton from '../../images/muted-btn.png';
import unmuteButton from '../../images/unmuted-btn.png';

function getRandomVideoId(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let videoId = Math.floor(Math.random() * (max - min) + min);
    return videoId;
}

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
    const history = useHistory();

    const videos = useSelector((state) => state.video.videos);
    const video = useSelector((state) => state.video.currentVideo);

    const [loaded, setLoaded] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        history.push(`/video/${video.id}`);
    };

    const handleExpand = () => {
        setShowModal(true);
    };

    // const randomVideoId = getRandomVideoId(1, Object.values(videos).length - 1);
    // const randomVideo = videos[randomVideoId];

    // const [video, setVideo] = useState(randomVideo)
    useEffect(() => {
        (async () => {
            await dispatch(getVideos());

        })();
    }, [dispatch]);
    useEffect(() => {
        if (Object.values(videos).length){

            (async () => {
                await dispatch(getVideo(getRandomVideoId(1, Object.values(videos).length - 1)))
            })();
            setLoaded(true);

        }
    }, [dispatch, videos]);

    if (!loaded) {
        return null;
    }

    if (!profile) return <Redirect to='/profile' />;
    return (
        <div className='browse-wrapper'>
            <section
                className='video-detail-modal-div'
                // onClick={handleClick}
            >
                <div className='browse-video-header-wrapper'>
                    <div
                        className='video-detail-overlay-browse'
                        style={{ height: '100%', width: '100%' }}
                    >
                        <div className='modal-title-btns-div'>
                            <div className='video-browse-title-div'>
                                <div className='video-browse-title'>
                                    {video.title}
                                </div>
                                <div className='video-browse-description'>
                                    <div className='modal-year-text'>
                                        {video.releaseYear}
                                    </div>
                                    <div className='video-detail-description-text'>
                                        {video.description}
                                    </div>
                                </div>
                            </div>
                            <div
                                className='browse-mute-btn-div'
                                style={{ width: '100%' }}
                            >
                                <div className='video-detail-left-btns-div'>
                                    <div
                                        className='video-detail-modal-play-div'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClick();
                                        }}
                                    >
                                        <img
                                            src={playButton}
                                            alt='play button'
                                            className='modal-play-btn'
                                        ></img>
                                        <span className='modal-play-text'>
                                            Play
                                        </span>
                                    </div>
                                    <div
                                        className='browse-modal-info-div'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleExpand();
                                        }}
                                    >
                                        <img
                                            src={infoButton}
                                            alt='expand details'
                                            hidden={showModal}
                                            className='modal-play-btn'
                                        ></img>
                                        <span className='modal-play-text'>
                                            More info
                                        </span>
                                    </div>
                                </div>
                                <img
                                    src={isMuted ? muteButton : unmuteButton}
                                    alt='mute unmute button'
                                    className='browse-mute-btn'
                                    onClick={(e) => {
                                        // e.stopPropagation();
                                        setIsMuted(!isMuted);
                                    }}
                                ></img>
                            </div>
                        </div>
                        {showModal && (
                            <Modal
                                onHide={() => {
                                    setShowModal(false);
                                }}
                            >
                                <VideoDetailModal
                                    hideModal={() => setShowModal(false)}
                                    video={video}
                                    profile={profile}
                                />
                            </Modal>
                        )}
                    </div>
                    <ReactPlayer
                        className='react-player-browse'
                        playing
                        loop={true}
                        volume={isMuted ? 0 : profile.defaultVolume}
                        width='97vw'
                        height='75vh'
                        controls={false}
                        url={video.videoUrl}
                    />
                </div>
            </section>
            <div className='browse-list-wrapper'>
                <div className='video-list'>
                    <VideoList videos={videos} mylist={false} />
                </div>
            </div>
            <div className='bottom-spacer'></div>
        </div>
        // map movies in carousels by genre
    );
}

export default BrowsePage;
