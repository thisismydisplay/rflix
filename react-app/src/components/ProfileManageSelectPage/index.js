import './ProfileManageSelectPage.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import Profile from '../Profile';
import { getProfiles } from '../../store/profile';

const ProfileManageSelectPage = ({ user }) => {
    // const [profilesLoaded, setProfilesLoaded] = useState(false);
    const profiles = useSelector((state) => state.profile.profiles);
    //   const [manage, setManage] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            await dispatch(getProfiles(user.id));

            // setProfilesLoaded(true);
        })();
    }, [dispatch, user.id]);

    const handleAdd = () => {
        history.push('/profile/add');
    };
    const handleCancel = () => {
        history.push('/profile');
    };
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
                <div className='profile-watching-text'>Manage Profiles</div>
                <div className='profile-select-div'>
                    {Object.values(profiles).map((profile) => (
                        <Profile
                            profile={profile}
                            manage={true}
                            // active={currentProfile?.id === profile.id}
                            key={profile.id}
                        />
                    ))}
                    {/* <Profile profile={{profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg'}} /> */}

                </div>
                <div className='manage-profile-btn-div' onClick={handleCancel}>
                    <div className='manage-profile-btn-cancel continue-btn'>Done</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManageSelectPage;
