import './CommentAdd.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../store/comment';

const CommentAdd = ({ profile, videoId }) => {
    const [commentText, setCommentText] = useState('');
    const [showAddComment, setShowAddComment] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let formData = {
            text: commentText,
            profileId: profile.id,
            videoId: videoId,
        };

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
        }
    };

    return (
        <div className='comment-add-div'>
            <div className='error-container'>
                {errors?.map((error, ind) => (
                    <div key={ind}>{error?.split(': ')[1]}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className='comment-add-input'
                    placeholder={`Commenting publicly as ${profile.name}`}
                    value={commentText}
                    // required
                    onClick={(e) => setShowAddComment(true)}
                    onChange={(e) => {
                        setErrors([]);
                        setCommentText(e.target.value);
                    }}
                ></input>

                {showAddComment && (
                    <div className='comment-add-btns'>
                        <button
                            className='comment-add-confirm-btn continue-btn'
                            type='submit'
                        >
                            Confirm
                        </button>
                        <button
                            className='comment-add-cancel-btn cancel-btn'
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
