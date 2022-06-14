import './VideoThumbnail.css';

import ReactPlayer from 'react-player';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import muteButton from '../../images/muted-btn.png';
import unmuteButton from '../../images/unmuted-btn.png';
import playButton from '../../images/play-btn.png';
import addButton from '../../images/add-btn.png';
import removeButton from '../../images/remove-btn.png';
import expandButton from '../../images/expand-down.png';
import {
    addToWatchlistThunk,
    deleteFromWatchlistThunk,
} from '../../store/profile';
import { useDispatch } from 'react-redux';

function VideoThumbnail({ video, profile }) {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [onWatchlist, setOnWatchlist] = useState(
        profile?.watchlistVideos.includes(Number(video.id))
    );

    const history = useHistory();
    const handleClick = () => {
        history.push(`/video/${video.id}`);
    };
    const handleAdd = () => {
        (async () => {
            await dispatch(addToWatchlistThunk(profile.id, video.id));
            setOnWatchlist(true);
        })();
    };
    const handleRemove = () => {
        (async () => {
            await dispatch(deleteFromWatchlistThunk(profile.id, video.id));
            setOnWatchlist(false);
        })();
    };

    const handleExpand = () => {
        console.log('expand');
    };

    return (
        <div
            className='video-thumb-wrapper'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={video.id}
            onClick={handleClick}
        >
            <div
                // className={
                //     isHover ? 'thumbnail-overlay' : 'hidden-thumbnail-overlay'
                // }
                className='thumbnail-overlay'
                style={
                    isHover
                        ? { height: '80px', width: '200px' }
                        : { height: '40px', width: '120px' }
                }
            >
                <div className='thumbnail-title-div'>
                    <div className='thumbnail-title'>{video.title}</div>
                </div>
                <div
                    className='mute-btn-div'
                    style={isHover ? { width: '200px' } : { width: '120px' }}
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
                        ? 'thumbnail-description'
                        : 'thumbnail-description-hidden'
                }
                style={isHover ? { width: '200px' } : { width: '120px' }}
            >
                {/* <div className='thumbnail-description-text' style={
                    isHover
                    ? { width: '200px' }
                    : { width: '120px' }
                }>{video.description}</div> */}
                <div className='thumbnail-left-btns-div'>
                <img
                    src={playButton}
                    alt='play button'
                    className={isHover ? 'mute-btn' : 'mute-btn-hidden'}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                    }}
                ></img>
                <img
                    src={onWatchlist ? removeButton : addButton}
                    alt={
                        onWatchlist
                            ? 'remove from watchlist'
                            : 'add to watchlist'
                    }
                    className={isHover ? 'mute-btn' : 'mute-btn-hidden'}
                    onClick={onWatchlist ? (e) => {
                        e.stopPropagation();
                        handleRemove();
                    } : (e) => {
                        e.stopPropagation();
                        handleAdd();
                    }}
                ></img>
                </div>
                <div className='thumbnail-right-btns-div'>
                    <img
                        src={expandButton}
                        alt='expand details'
                        className={isHover ? 'mute-btn' : 'mute-btn-hidden'}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleExpand();
                        }}
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default VideoThumbnail;

// import './VideoThumbnail.css';

// import play from '../../images/play-btn.png';
// import add from '../../images/plus-grey.png';
// import muted from '../../images/muted-btn.png';
// import unmuted from '../../images/unmuted-btn.png';
// import expandDownArrow from '../../images/expand-down.png';

// import ReactPlayer from 'react-player';

// import React, { useState } from 'react';

// import { useHistory } from 'react-router-dom';

// function VideoThumbnail({ video, profile }) {
//     const [isHover, setIsHover] = useState(false);
//     const [isMuted, setIsMuted] = useState(true);
//     const history = useHistory();
//     const handleClick = () => {
//         history.push(`/video/${video.id}`);
//     };

//     return (
//         <div
//             className='video-thumb-wrapper'
//             onMouseEnter={() => setIsHover(true)}
//             onMouseLeave={() => setIsHover(false)}
//             key={video.id}
//             onClick={handleClick}
//         >

//                 <img
//                     className={
//                         isHover ? 'thumbnail-overlay' : 'hidden-thumbnail-overlay'
//                     }
//                     src={isMuted ? muted : unmuted}
//                     alt='mute button'
//                     onClick={() => setIsMuted(!isMuted)}
//                 />

//             <ReactPlayer
//                 className='player-thumbnail'
//                 volume={isMuted ? 0 : profile.defaultVolume}
//                 playing={profile.autoplayHover && isHover}
//                 url={video.videoUrl}
//                 width={isHover ? '300px' : '200px'}
//                 height={isHover ? '300px' : '200px'}
//             />
//             <div
//                 className='thumbnail-description'
//                 style={isHover ? { display: 'fixed' } : { display: 'none' }}
//             >
//                 <div>{video.title}</div>
//                 <div>{video.description}</div>
//             </div>
//         </div>
//     );
// }

// export default VideoThumbnail;
