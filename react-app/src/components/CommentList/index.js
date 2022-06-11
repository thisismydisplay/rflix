import './CommentList.css';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/profile';
import { Redirect } from 'react-router-dom';
import VideoThumbnail from '../VideoThumbnail';

function CommentList({ video, profile }) {
    // const comments = useSelector(
    //     (state) => state.comment.comments[video.id]
    // );

    if (!video) return <Redirect to='/browse' />;
    return (
        <>
        <div className='add-comment-form'>
            <h1>FORM TO ADD COMMENT</h1>
        </div>
        <div className='comment-list-wrapper'>
            {/* {Object.values(comments).map((comment) => (
                <div className='comment-wrapper' >
                <Comment videoId={video.id}/>
                </div>
            ))} */}
            <h1> TEST COMMENT</h1>
            <h1> TEST COMMENT</h1>
            <h1> TEST COMMENT</h1>
            <h1> TEST COMMENT</h1>
            <h1> TEST COMMENT</h1>
            <h1> TEST COMMENT</h1>
            <h1> TEST COMMENT</h1>
            <h1> TEST COMMENT</h1>
        </div>
            </>

        // map movies in carousels by genre
    );
}

export default CommentList;
