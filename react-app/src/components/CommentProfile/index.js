import './CommentProfile.css'
import React from 'react';

const CommentProfile = ({profile}) => {

    return (
        <div className='comment-profile-wrapper'>
            <img className='comment-profile-image' src={profile.profileImageUrl} alt='profile' />
            <div className='comment-profile-name'>{profile.name}</div>
        </div>
    )
}

export default CommentProfile
