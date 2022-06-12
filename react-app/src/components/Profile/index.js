import './Profile.css';

import editIcon from '../../images/edit-icon.png';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentProfile } from '../../store/session';

const Profile = ({ profile, manage }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const img = profile.profileImageUrl;
    const handleClick = async () => {
        await dispatch(setCurrentProfile(profile.id));
        history.push('/browse');
    };
    const handleManage = async () => {
        await dispatch(setCurrentProfile(profile.id));
        history.push(`/profile/manage/${profile.id}`);
    };


    return (
        <div className='profile-div'>
            <button onClick={manage ? handleManage : handleClick} className='profile-manage-div'>
                <img
                    className='profile-select-image'
                    src={img}
                    alt='logo'
                    viewBox='0 0 100 100'
                    preserveAspectRatio='xMidYMid meet'
                />
                {manage && (<img className='edit-profile-icon' src={editIcon} alt='edit'/>)}
                <div className='profile-name-text'>{profile.name}</div>
            </button>
        </div>
    );
};

export default Profile;
