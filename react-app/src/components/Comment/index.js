import './Comment.css';

import defaultProfileImage from '../../images/default-profile-image.jpeg';
import editIcon from '../../images/edit-btn.png';
import deleteIcon from '../../images/trash-btn.png';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, Link, useHistory } from 'react-router-dom';
import { login, setCurrentProfile } from '../../store/session';
import { getProfile } from '../../store/profile';
import { deleteComment, updateComment } from '../../store/comment';
import CommentProfile from '../CommentProfile';
const Comment = ({ videoId, comment, currentProfile }) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const commentProfile = useSelector(
        (state) => state.profile[comment.profileId]
    );

    const [commentProfileLoaded, setCommentProfileLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            await dispatch(getProfile(comment.profileId));
            //await dispatch(getComments(videoId));
            setCommentProfileLoaded(true);
            // setCommentsLoaded(true);
        })();
    }, [dispatch, comment.profileId]);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let formData = {
            text: commentText,
            profileId: currentProfile.id,
            videoId: videoId,
        };

        try {
            const errors = await dispatch(updateComment(formData, comment.id));

            if (!errors) {
                setShowEdit(false);
                return;
            } else {
                setErrors(errors);
                return;
            }
        } catch (errorResponse) {
            setErrors(['Something went wrong please try again']);
            console.log('Failed Request: ', errorResponse);
        }
    };
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const res = await dispatch(deleteComment(comment.id));
            if (res.message === 'Success'){
                setShowDelete(false);
            }

        } catch (errorResponse) {
            const data = await errorResponse.json();
            if (data && data.errors) setErrors(data.errors);
        }
    };

    const [commentText, setCommentText] = useState(comment.text);
    console.log('comment', comment)
    return (
        <div className='comment-div'>
            <div className='comment-content-div'>
            {commentProfileLoaded && (

                <div className='comment-profile-wrapper'>
                    <CommentProfile profile={commentProfile} />
                </div>
            )}
            <div className='comment-content-wrapper'>
                <div className='comment-text'>{comment.text}</div>
                <div className='comment-updated'>{comment.updated_at?.split('GMT')[0]}</div>
            </div>
            </div>
            {comment.profileId === currentProfile.id && (
                <div className='comment-modify-div'>
                    <div className='comment-edit-btn-div'>
                        <img
                            src={editIcon}
                            alt='edit comment'
                            onClick={() => {
                                setShowDelete(false)
                                setShowEdit(!showEdit)
                            }}
                        ></img>
                    </div>
                    <div className='comment-delete-btn-div'>
                        <img
                            src={deleteIcon}
                            alt='delete comment'
                            onClick={() => {
                                setShowEdit(false)

                                setShowDelete(!showDelete)}}
                        ></img>
                    </div>
                </div>
            )}
            {showEdit && (
                <form onSubmit={handleEditSubmit}>
                    <input
                        className='comment-edit-input'
                        value={commentText}
                        required
                        onChange={(e) => setCommentText(e.target.value)}
                    ></input>
                    <button className='comment-edit-confirm-btn' type='submit'>
                        Confirm
                    </button>
                    <button
                        className='comment-edit-cancel-btn'
                        onClick={() => setShowEdit(false)}
                        type='button'

                    >
                        Cancel
                    </button>
                </form>
            )}
            {showDelete && (
                <form onSubmit={handleDeleteSubmit}>
                    <div className='comment-delete-text'>
                        Delete your comment? This cannot be undone.
                    </div>
                    <button
                        className='comment-delete-confirm-btn'
                        type='submit'
                    >
                        Confirm
                    </button>
                    <button
                        className='comment-delete-cancel-btn'
                        onClick={() => setShowDelete(false)}
                        type='button'
                    >
                        Cancel
                    </button>
                </form>
            )}

            {/* </Link> */}
        </div>
    );
};

export default Comment;
