import './VideoThumbnail.css';

import ReactPlayer from 'react-player';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion/dist/framer-motion';

import Modal from '../Modal';
import VideoDetailModal from '../VideoDetailModal';
import {
    addToWatchlistThunk,
    deleteFromWatchlistThunk,
} from '../../store/profile';

import muteButton from '../../images/muted-btn.png';
import unmuteButton from '../../images/unmuted-btn.png';
import playButton from '../../images/play-btn-black.png';
import addButton from '../../images/add-btn-modal.png';
import removeButton from '../../images/remove-btn.png';
import expandButton from '../../images/expand-down.png';

const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: '0px', overflow: 'hidden', zIndex: -1 },
};

function VideoThumbnail({ video, profile, isMyListCarousel = false }) {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const onWatchlist = profile?.watchlistVideos.includes(Number(video.id));
    const [showModal, setShowModal] = useState(false);

    const history = useHistory();
    const handleClick = () => {
        history.push(`/video/${video.id}`);
    };
    const handleAdd = () => {
        (async () => {
            await dispatch(addToWatchlistThunk(profile.id, video.id));
            // setOnWatchlist(true);
        })();
    };
    const handleRemove = () => {
        (async () => {
            await dispatch(deleteFromWatchlistThunk(profile.id, video.id));
            // setOnWatchlist(false);
        })();
    };

    const handleExpand = () => {
        setIsHover(false);
        setShowModal(true);
    };

    return (
        <div
            className='video-thumb-wrapper'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={video.id}
            onClick={handleClick}
        >
            <motion.div
                className='video-image'
                animate={isHover ? 'open' : 'closed'}
                variants={variants}
                transition={
                    isHover
                        ? { delay: 0.6, ease: 'easeInOut', duration: 0.4 }
                        : { delay: 0, ease: 'easeInOut', duration: 0 }
                }
            >
                <div
                    className='thumbnail-overlay'
                    style={
                        isHover
                            ? { height: '80px', width: '260px' }
                            : { height: '40px', width: '120px' }
                    }
                >
                    <div className='thumbnail-title-div'>
                        <div className='thumbnail-title'>{video.title}</div>
                    </div>
                    <div
                        className='mute-btn-div'
                        style={
                            isHover ? { width: '260px' } : { width: '120px' }
                        }
                    >
                        <img
                            src={isMuted ? muteButton : unmuteButton}
                            alt='mute unmute button'
                            className={isHover ? 'mute-btn' : 'mute-btn-hidden'}
                            onClick={(e) => {
                                e.stopPropagation();
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
                            onMyListRemove={() => {
                                if (isMyListCarousel) {
                                    setShowModal(false);
                                }
                            }}
                            hideModal={() => setShowModal(false)}
                            video={video}
                            profile={profile}
                        />
                    </Modal>
                )}

                <ReactPlayer
                    className='react-player'
                    volume={isMuted ? 0 : profile.defaultVolume}
                    playing={profile.autoplayHover && isHover}
                    url={video.videoUrl}
                    width={isHover ? '260px' : '180px'}
                    height={isHover ? '180px' : '140px'}
                />
                <div
                    className={
                        isHover
                            ? 'thumbnail-btn-wrapper'
                            : 'thumbnail-btn-wrapper-hidden'
                    }
                    style={isHover ? { width: '260px' } : { width: '120px' }}
                >
                    <div className='thumbnail-left-btns-div'>
                        <div className='play-btn-div'>
                            <img
                                src={playButton}
                                alt='play button'
                                className='play-btn'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick();
                                }}
                            ></img>
                        </div>
                        <div
                            className='watchlist-btn-div'
                            onClick={
                                onWatchlist
                                    ? (e) => {
                                          e.stopPropagation();
                                          handleRemove();
                                      }
                                    : (e) => {
                                          e.stopPropagation();
                                          handleAdd();
                                      }
                            }
                        >
                            <img
                                src={onWatchlist ? removeButton : addButton}
                                alt={
                                    onWatchlist
                                        ? 'remove from watchlist'
                                        : 'add to watchlist'
                                }
                                className='watchlist-btn'
                            ></img>
                        </div>
                    </div>
                    <div className='thumbnail-right-btns-div'>
                        <img
                            src={expandButton}
                            alt='expand details'
                            hidden={showModal}
                            className={isHover ? 'mute-btn' : 'mute-btn-hidden'}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleExpand();
                            }}
                        ></img>
                    </div>
                </div>
                <div
                    className='thumbnail-description-wrapper'
                    style={isHover ? { width: '260px' } : { width: '120px' }}
                >
                    <div className='thumbnail-year-text'>
                        {video.releaseYear}
                    </div>

                    <div className='thumbnail-description-text'>
                        {video.description}
                    </div>
                </div>
            </motion.div>

            <motion.img
                className='video-image'
                animate={isHover ? 'closed' : 'open'}
                variants={variants}
                transition={
                    isHover
                        ? { delay: 0.6, ease: 'easeInOut', duration: 0.0 }
                        : { delay: 0.6, ease: 'easeInOut', duration: 0.4 }
                }
                exit={{ opacity: 0, height: '0px' }}
                src={video.imageUrl}
                alt=''
            ></motion.img>
        </div>
    );
}

export default VideoThumbnail;
