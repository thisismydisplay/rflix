import './CommentList.css';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/profile';
import { Redirect } from 'react-router-dom';
import VideoThumbnail from '../VideoThumbnail';
import CommentAdd from '../CommentAdd';
import Comment from '../Comment'

function CommentList({ comments, currentProfile, videoId }) {
    // const comments = useSelector(
    //     (state) => state.comment.comments[video.id]
    // );

    if (!videoId) return <Redirect to='/browse' />;
    return (
        <>
        <div className='add-comment-form'>
            <CommentAdd profile={currentProfile} videoId={videoId} />
        </div>
        <div className='comment-list-wrapper'>
            {Object.values(comments).reverse().map((comment) => (
                <div className='comment-wrapper' key={comment.id}>
                <Comment videoId={videoId} comment={comment} currentProfile={currentProfile}/>
                </div>
            ))}
        </div>
            </>

        // map movies in carousels by genre
    );
}

export default CommentList;
