import './ProfileSelectPage.css'


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import Profile from '../Profile';
import { getProfiles } from '../../store/profile';



const ProfileSelectPage = ({user}) => {
  // const [profilesLoaded, setProfilesLoaded] = useState(false);
  const profiles = useSelector((state) => state.profile.profiles)
  const dispatch = useDispatch();

  useEffect(() => {
      (async () => {
        await dispatch(getProfiles(user.id));

        // setProfilesLoaded(true);
      })();
    }
  , [dispatch, user.id]);


  // this appears unnecessary
  // if (!profilesLoaded) {
  //   return null;
  // }




if (!profiles) {
  return <h1>no profiles to load</h1>;
}

  return (
    <div className='profile-page-div'>
      <div className='profile-select-wrap'>
    <div className='profile-watching-text'>Who's watching?</div>
    <div className='profile-select-div'>
      {Object.values(profiles).map((profile) => (
        <Profile
          profile={profile}
          // active={currentProfile?.id === profile.id}
          key={profile.id}
        />
      ))}
      {/* <Profile profile={{profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg'}} /> */}
      <div className='add-profile-btn-div'>
        <span className='material-symbols-outlined add-profile-btn'>add_circle</span>
        <span className='add-profile-text'>Add Profile</span>
      </div>
    </div>
    <div className='manage-profile-btn-div'>
      <div className='manage-profile-btn'>Manage Profiles</div>
    </div>
    </div>
  </div>
  );
};

export default ProfileSelectPage;
