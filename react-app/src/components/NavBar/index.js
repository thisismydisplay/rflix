import './NavBar.css';

import logo from '../../images/rflix-logo-placeholder2.png';
import ProfileButton from '../ProfileButton';

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = ({ profile }) => {
    const location = useLocation();
    const onProfile = location.pathname.split('/')[1] === 'profile';
    const onLogin = location.pathname.split('/')[1] === 'login';
    const onSignup = location.pathname.split('/')[1] === 'signup';
    if (onProfile) return null;
    let topRight;
    if (profile) {
        topRight = <ProfileButton profile={profile} />;
    } else {
        topRight = onLogin ? null : (
            <>
                <NavLink
                    className='sign-in-nav'
                    activeClassName='active'
                    to='/login'
                >
                    Sign In
                </NavLink>
            </>
        );
    }

    return (
        <ul className='home-nav-splash' id='navbar'>
            <div className='home-top-left'>
                <NavLink
                    className='nav-btn-splash'
                    activeClassName='active'
                    exact
                    to='/browse'
                >
                    <img src={logo} className='home-icon' alt='rflix logo' />
                </NavLink>
                {!onLogin && !onSignup && (
                    <>
                    <NavLink
                        className='nav-btn-splash'
                        activeClassName='active'
                        exact
                        to='/browse'
                    >
                        <div className='my-list-nav-link home-text-link' alt='home link'>
                            Home
                        </div>
                    </NavLink>
                    <NavLink
                        className='nav-btn-splash'
                        activeClassName='active'
                        exact
                        to='/browse/mylist'
                        >
                        <div className='my-list-nav-link ' alt='my list link'>
                            My List
                        </div>
                    </NavLink>
                        </>
                )}
            </div>
            <div className='home-top-right'>{topRight}</div>
        </ul>
    );
};

export default NavBar;
