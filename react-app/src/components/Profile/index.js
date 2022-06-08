import './Profile.css';
import defaultProfileImage from '../../images/default-profile-image.jpeg'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';

const Profile = ({profile}) => {
  const img = profile.profileImageUrl
  return (
    <>
   <div className='profile-div' onClick={<Redirect to='/browse' />}>
     <div className='profile-select-image'
     style={
      {
            backgroundImage: {img},
          }

    }>

     </div>
     <div className='profile-name-text'>
       name
     </div>
   </div>
   </>
  );
};

export default Profile;
