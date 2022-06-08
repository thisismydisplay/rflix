import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import defaultProfileImage from '../../images/default-profile-image.jpeg'
function ProfileButton({ user }) {
  // function ProfileButton({ profile }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menu = useRef(null)
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = ({target}) => {
      if (target !== menu.current && !menu.current?.contains(target)) {
        setShowMenu((prev) => !prev);
      }
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className='nav-user-image-container' onClick={openMenu}>
      <div
        className='nav-user-image'
        style={
          {
                backgroundImage: {defaultProfileImage},
              }

        }
        // style={
        //   profile?.profileImageUrl
        //     ? {
        //         backgroundImage: `url(${profile.profileImageUrl})`,
        //       }
        //     : { backgroundImage: {defaultProfileImage} }
        // }
      >
        {showMenu && (
          <>
            <div className='nav-user-dropdown-container' ref={menu}>
              <div className='nav-user-dropdown-welcome'>
                <div className='nav-user-dropdown-welcome-text'> {user.username}</div>
                {/* map profiles */}
                {/* <div className='nav-user-dropdown-welcome-text'> {profile.name}</div> */}

              </div>


                <Link
                  className='nav-user-dropdown-manage-profiles'
                  to={`/browse`}
                >
                  <div>Manage Profiles</div>
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
