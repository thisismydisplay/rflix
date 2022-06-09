import './Profile.css';
import defaultProfileImage from '../../images/default-profile-image.jpeg';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, Link, useHistory } from 'react-router-dom';
import { login, setCurrentProfile } from '../../store/session';

const Profile = ({ profile }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const img = profile.profileImageUrl;
    // console.log(img);
    const handleClick = async () => {
        await dispatch(setCurrentProfile(profile.id));
        history.push('/browse');
    };
    return (
        <div className='profile-div'>
            {/* <Link
                exact
                to='/browse'
                className='profile-navlink-browse'
                onClick={handleClick}
            > */}
            <button onClick={handleClick} className='profile-navlink-browse'>
                <img
                    className='profile-select-image'
                    src={img}
                    alt='logo'
                    viewBox='0 0 100 100'
                    preserveAspectRatio='xMidYMid meet'
                />
                {/* <div
          className='profile-select-image'
          style={{
              // backgroundImage: `url(https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg)`,
              backgroundImage: `url${img}`,
              height: '100px',
            }}
        ></div> */}
                <div className='profile-name-text'>{profile.name}</div>
            </button>
            {/* </Link> */}
        </div>
    );
};

export default Profile;
