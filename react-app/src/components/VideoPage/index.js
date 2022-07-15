import './VideoPage.css';

import backButton from '../../images/back-btn.png';
import addButton from '../../images/add-btn.png';
import removeButton from '../../images/remove-btn.png';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';

import { getComments } from '../../store/comment';

import CommentList from '../CommentList';
import {
    addToWatchlistThunk,
    deleteFromWatchlistThunk,
} from '../../store/profile';

function VideoPage({ profile }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const videoId = location.pathname.split('/')[2];
    const onWatchlist = profile?.watchlistVideos.includes(Number(videoId));
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        navbar.setAttribute('style', 'display:none;');
    });

    const video = useSelector((state) => state.video.videos[videoId]);

    //comments is an object with key videoId
    const comments = useSelector((state) => state.comment?.comments);

    const [commentsLoaded, setCommentsLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            await dispatch(getComments(videoId));
            setCommentsLoaded(true);
        })();
    }, [dispatch, videoId]);

    useEffect(() => {
        document.getElementById('root').scrollTo(0, 0);
    }, []);

    const [controlsOn, setControlsOn] = useState(false);
    const [firstMove, setFirstMove] = useState(true);

    const handleClick = () => {
        const navbar = document.getElementById('navbar');

        navbar.setAttribute('style', 'display:flex;');

        history.push(`/browse`);
    };

    const handleAdd = () => {
        (async () => {
            await dispatch(addToWatchlistThunk(profile.id, videoId));
            // setOnWatchlist(true)
        })();
    };
    const handleRemove = () => {
        (async () => {
            await dispatch(deleteFromWatchlistThunk(profile.id, videoId));
            // setOnWatchlist(false)
        })();
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
    if (!profile) return <Redirect to='/profile' />;
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
                        <p className='video-detail-year'>
                            {video?.releaseYear}
                        </p>
                        <p className='video-detail-genre'>{video?.genre}</p>
                    </div>
                    <div className='video-detail-description-wrapper'>
                        <div className='video-detail-description'>
                            {video?.description}
                        </div>
                        <div
                            className='description-btn-wrapper'
                            onClick={onWatchlist ? handleRemove : handleAdd}
                        >
                            <img
                                src={onWatchlist ? removeButton : addButton}
                                alt='add to watchlist'
                                className='watchlist-add-remove-btn'
                            />
                            <span className='watchlist-add-remove-text'>
                                {' '}
                                {onWatchlist
                                    ? 'Remove from watchlist'
                                    : 'Add to watchlist'}
                            </span>
                        </div>
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
