import './CommentAdd.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addProfile } from '../../store/profile';
import { addComment } from '../../store/comment';

const CommentAdd = ({ profile, videoId }) => {
    const [commentText, setCommentText] = useState('');
    const [showAddComment, setShowAddComment] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    console.log('comment add profile',profile)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let formData = {
            text: commentText,
            profileId: profile.id,
            videoId: videoId,
        };

        console.log(formData);
        try {
            const errors = await dispatch(addComment(formData));
            if (!errors) {
                setShowAddComment(false)
                setCommentText('')
                return;
            } else {
                setErrors(errors);
            }
        } catch (errorResponse) {
            setErrors(['Something went wrong, please try again.']);
            console.log('error');
        }
    };
    const handleCancel = () => {
        setShowAddComment(false);
    };

    return (
        <div className='comment-add-div'>
            {errors?.map((error, idx) => (
              <p className='error-message' key={idx}>
                {error?.split(': ')[1]}
              </p>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    className='comment-add-input'
                    placeholder={`Commenting publicly as ${profile.name}`}
                    value={commentText}
                    // required
                    onClick={(e) => setShowAddComment(true)}
                    onChange={(e) => setCommentText(e.target.value)}
                ></input>

                {showAddComment && (
                    <div className='comment-add-btns'>
                        <button
                            className='comment-add-confirm-btn'
                            type='submit'
                        >
                            Confirm
                        </button>
                        <button
                            className='comment-add-cancel-btn'
                            onClick={() => setShowAddComment(false)}
                            type='button'
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CommentAdd;
