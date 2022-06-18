import './VideoDetailModal.css';
import ReactPlayer from 'react-player';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
    addToWatchlistThunk,
    deleteFromWatchlistThunk,
} from '../../store/profile';
import muteButton from '../../images/muted-btn.png';
import unmuteButton from '../../images/unmuted-btn.png';
import playButton from '../../images/play-btn-black.png';
import addButton from '../../images/add-btn-modal.png';
import removeButton from '../../images/remove-btn.png';
import cancelButton from '../../images/cancel-btn-white.png';

function VideoDetailModal({ video, profile, hideModal }) {
    const [isMuted, setIsMuted] = useState(true);
    const onWatchlist = profile?.watchlistVideos.includes(Number(video.id));

    const dispatch = useDispatch();
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
    const handleCancel = (e) => {
        // e.preventDefault()
        hideModal();
    };
    return (
        <section
            className='video-detail-modal-div'
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className='video-modal-wrapper'
                // onMouseEnter={() => setIsHover(true)}
                // onMouseLeave={() => setIsHover(false)}
                // key={video.id}
                onClick={handleClick}
            >
                <div
                    className='video-detail-overlay'
                    style={{ height: '100%', width: '100%' }}
                >
                    <div
                        className='modal-close-btn-div'
                        style={{ width: '100%' }}
                    >
                        <img
                            src={cancelButton}
                            alt='close details'
                            className='modal-close-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCancel();
                            }}
                        ></img>
                    </div>
                    <div className='modal-title-btns-div'>
                        <div className='video-detail-title-div'>
                            <div className='video-detail-title'>
                                {video.title}
                            </div>
                        </div>
                        <div
                            className='modal-mute-btn-div'
                            style={{ width: '100%' }}
                        >
                            <div className='video-detail-left-btns-div'>
                                <div className='video-detail-modal-play-div'>
                                    <img
                                        src={playButton}
                                        alt='play button'
                                        className='modal-play-btn'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClick();
                                        }}
                                    ></img>
                                    <span className='modal-play-text'>
                                        Play
                                    </span>
                                </div>
                                <div className='video-detail-modal-watchlist-div'>
                                    <img
                                        src={
                                            onWatchlist
                                                ? removeButton
                                                : addButton
                                        }
                                        alt={
                                            onWatchlist
                                                ? 'remove from watchlist'
                                                : 'add to watchlist'
                                        }
                                        className='modal-watchlist-btn'
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
                                    ></img>
                                    {/* <span className='modal-play-text'>Add to Watchlist</span> */}
                                </div>
                            </div>
                            <img
                                src={isMuted ? muteButton : unmuteButton}
                                alt='mute unmute button'
                                className='modal-mute-btn'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMuted(!isMuted);
                                }}
                            ></img>
                        </div>
                    </div>
                </div>

                <ReactPlayer
                    className='react-player-modal'
                    volume={isMuted ? 0 : profile.defaultVolume}
                    playing={profile.autoplayHover}
                    url={video.videoUrl}
                    width='100%'
                    height='100%'
                />
            </div>
            <div className='video-detail-description'>
                <div className='modal-year-text'>{video.releaseYear}</div>
                <div className='video-detail-description-text'>
                    {video.description}
                </div>
            </div>
        </section>
    );
    // const genres = [
    //     'Nature',
    //     'Cartoons',
    //     'Comedy',
    //     'Drama',
    //     'Thriller',
    //     'Action & Adventure',
    // ];
    // const profile = useSelector(
    //     (state) => state.profile.profiles[state.profile.currentProfileId]
    // );
    // const myListVideos = Object.values(videos).filter((video) =>
    //     profile.watchlistVideos.includes(video.id)
    // );
    // if (!profile) return <Redirect to='/profile' />;
    // return (
    //     <>
    //         {mylist && (
    //             <>
    //                 {myListVideos.map((video) => (
    //                         <div
    //                             className='video-thumb-container'
    //                             key={video.id}
    //                         >
    //                             <VideoThumbnail
    //                                 profile={profile}
    //                                 video={video}
    //                             />
    //                         </div>
    //                 ))}
    //             </>
    //         )}
    //         {!mylist &&
    //             genres.map((genre, i) => (
    //                 <div className='video-carousel-wrapper' key={i}>
    //                     <div className='video-list-title'>{genre}</div>
    //                     <div className='video-list-wrapper'>
    //                         {Object.values(videos).map((video) => (
    //                             <div key={video.id}>
    //                                 {video.genre === genre && (
    //                                     <div
    //                                         className='video-thumb-container'
    //                                         // key={video.id}
    //                                     >
    //                                         <VideoThumbnail
    //                                             profile={profile}
    //                                             video={video}
    //                                         />
    //                                     </div>
    //                                 )}
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //             ))}
    //     </>
    //     // map movies in carousels by genre
    // );
}

export default VideoDetailModal;
