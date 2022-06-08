import logo from '../../images/rflix-logo-placeholder2.png'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../ProfileButton'

import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    let topRight;
    if (sessionUser) {
        topRight = <ProfileButton user={sessionUser} />;
    } else {
        topRight = (
            <>
                <NavLink className="nav-btn" activeClassName='active' to="/login">
                    Sign In
                </NavLink>
            </>
        );
    }

    return (
        <ul className="home-nav-splash" >
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
