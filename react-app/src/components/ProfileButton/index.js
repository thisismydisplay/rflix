import './ProfileButton.css';

import LogoutButton from '../auth/LogoutButton';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectProfile } from '../../store/profile';
import { setCurrentProfile } from '../../store/session';

function ProfileButton() {
    const currentProfile = useSelector((state) => selectProfile(state.profile));
    const profiles = useSelector((state) =>
        Object.values(state.profile.profiles)
    );
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const menu = useRef(null);
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    const handleProfileChange = (profile) => {
        dispatch(setCurrentProfile(profile.id))
    }
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = ({ target }) => {
            if (target !== menu.current && !menu.current?.contains(target)) {
                setShowMenu((prev) => !prev);
            }
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    console.log(currentProfile.profileImageUrl);
    return (
        <div className='nav-user-image-container' onClick={openMenu}>
            <div
                className='nav-user-image'
                style={{
                    backgroundImage: `url(${currentProfile.profileImageUrl})`,
                }}
            >
                {showMenu && (
                    <>
                        <div className='nav-user-dropdown-container' ref={menu}>
                            <div className='nav-user-profiles'>
                                {profiles.map((profile) => {
                                    return (
                                        <div className='nav-profile' key={profile.id}>
                                            <div
                                                className='nav-user-image'
                                                style={{
                                                    backgroundImage: `url(${profile.profileImageUrl})`,
                                                }}
                                                onClick={()=>handleProfileChange(profile)}
                                            ></div>
                                            <div>{profile.name}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <Link
                                className='nav-user-dropdown-manage-profiles'
                                to={`/profile/manage`}
                            >
                                <div className='nav-user-dropdown-text'>
                                    Manage Profiles
                                </div>
                            </Link>

                            <div className='nav-user-logout'>
                                <LogoutButton />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileButton;
