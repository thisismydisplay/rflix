import './ProfileSelectPage.css'


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import Profile from '../Profile';

const ProfileSelectPage = ({user}) => {
  

  return (
    <div className='profile-page-div'>
    <div className='profile-watching-text'>Who's watching?</div>
    <div className='profile-select-div'>
      {/* {profiles?.map((profile) => (
        <Profile
          profile={profile}
          active={currentProfile?.id === profile.id}
        />
      ))} */}
      <Profile profile={{profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg'}} />
      <div className='add-profile-btn-div'>
        <span class='material-symbols-outlined'>add_circle</span>
        <span className='add-profile-text'>Add Profile</span>
      </div>
    </div>
    <div className='manage-profile-btn-div'>
      <div className='manage-profile-btn'>Manage Profiles</div>
    </div>
  </div>
  );
};

export default ProfileSelectPage;
