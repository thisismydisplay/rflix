import './Profile.css';
import defaultProfileImage from '../../images/default-profile-image.jpeg';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';

const Profile = ({ profile }) => {
  const img = profile.profileImageUrl;
  console.log(img);
  return (
    <div className='profile-div'>
      <NavLink exact to='/browse' className='profile-navlink-browse'>
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
      </NavLink>
    </div>
  );
};

export default Profile;
