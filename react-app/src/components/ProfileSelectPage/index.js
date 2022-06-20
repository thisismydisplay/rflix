import './ProfileSelectPage.css';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Profile from '../Profile';
import { getProfiles } from '../../store/profile';

const ProfileSelectPage = ({ user }) => {
    const profiles = useSelector((state) => state.profile.profiles);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            await dispatch(getProfiles(user.id));
        })();
    }, [dispatch, user.id]);

    const handleAdd = () => {
        history.push('/profile/add');
    };

    const handleEdit = () => {
        history.push('/profile/manage');
    };

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
                            manage={false}
                            key={`profile-select-${profile.id}`}
                        />
                    ))}
                    <div className='add-profile-btn-div' onClick={handleAdd}>
                        <span className='material-symbols-outlined add-profile-btn'>
                            add_circle
                        </span>

                        <span className='add-profile-text'>Add Profile</span>
                    </div>
                </div>
                <div className='manage-profile-btn-div' onClick={handleEdit}>
                    <div className='cancel-btn'>Manage Profiles</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSelectPage;
