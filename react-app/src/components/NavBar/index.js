import logo from '../../images/rflix-logo-placeholder2.png'
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../ProfileButton'

import './NavBar.css'
import profileReducer from '../../store/profile';

const NavBar = ({profile, sessionUser}) => {
//   const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const onProfile = location.pathname.split('/')[1] === 'profile'

    if (onProfile) return null
    let topRight;
    if (profile) {
        topRight = <ProfileButton profile={profile} />;
    } else {
        topRight = (
            <>
                <NavLink className="sign-in-nav" activeClassName='active' to="/login">
                    Sign In
                </NavLink>
            </>
        );
    }

    return (
        <ul className="home-nav-splash" id='navbar'>
            <div className="home-top-left">
                <NavLink className='nav-btn-splash' activeClassName='active' exact to="/browse">
                <img src={logo} className='home-icon' alt='rflix logo' />
                </NavLink>
            </div>
            <div className="home-top-right">{topRight}</div>
        </ul>
    );
}

export default NavBar;
