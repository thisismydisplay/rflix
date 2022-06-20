import './Comment.css';

import editIcon from '../../images/edit-btn.png';
import deleteIcon from '../../images/trash-btn.png';
import deleteAlert from '../../images/delete-alert.png'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        }
    };
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const res = await dispatch(deleteComment(comment.id));
            if (res.message === 'Success') {
                setShowDelete(false);
            }
        } catch (errorResponse) {
            const data = await errorResponse.json();
            if (data && data.errors) setErrors(data.errors);
        }
    };

    const [commentText, setCommentText] = useState(comment.text);
    return (
        <div className='comment-div'>
            <div className='error-container'>
                {errors?.map((error, ind) => (
                    <div key={`comment-error-${ind}`}>{error?.split(': ')[1]}</div>                ))}
            </div>
            <div className='comment-content-div'>
                {commentProfileLoaded && (
                    <div className='comment-profile-wrapper'>
                        <CommentProfile profile={commentProfile} />
                    </div>
                )}
                <div className='comment-content-wrapper'>


                    {showEdit ? (
                        <form onSubmit={handleEditSubmit}>
                            <input
                                className='comment-edit-input'
                                contentEditable
                                value={commentText}
                                required
                                onChange={(e) => {
                                    setErrors([]);
                                    setCommentText(e.target.value);
                                }}
                            ></input>
                            <div className='confirm-cancel-btns-div'>

                            <button
                                className='comment-edit-confirm-btn continue-btn'
                                type='submit'
                            >
                                Confirm
                            </button>
                            <button
                                className='comment-edit-cancel-btn cancel-btn'
                                onClick={() => setShowEdit(false)}
                                type='button'
                                >
                                Cancel
                            </button>
                                </div>
                        </form>
                    ) : (<div className='comment-text'>{comment.text}</div>)}
                    {comment.profileId === currentProfile.id && !showEdit && !showDelete && (
                        <div className='comment-modify-div'>
                            <div className='comment-edit-btn-div'>
                                <img
                                    src={editIcon}
                                    alt='edit comment'
                                    className='edit-btn-image'
                                    onClick={() => {
                                        setShowDelete(false);
                                        setShowEdit(!showEdit);
                                    }}
                                ></img>
                            </div>
                            <div className='comment-delete-btn-div'>
                                <img
                                    src={deleteIcon}
                                    alt='delete comment'
                                    className='delete-btn-image'

                                    onClick={() => {
                                        setShowEdit(false);

                                        setShowDelete(!showDelete);
                                    }}
                                ></img>
                            </div>
                        </div>
                    )}
                    {showDelete && (
                        <form onSubmit={handleDeleteSubmit}>
                            <div className='comment-delete-text'>
                                <img src={deleteAlert} alt='delete alert' className='delete-alert-btn' />
                                Delete your comment? This cannot be undone.
                            </div>
                            <button
                                className='comment-delete-confirm-btn continue-btn'
                                type='submit'
                            >
                                Confirm
                            </button>
                            <button
                                className='comment-delete-cancel-btn cancel-btn'
                                onClick={() => setShowDelete(false)}
                                type='button'
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                    <div className='comment-updated'>
                        {comment.updated_at?.split('GMT')[0]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
