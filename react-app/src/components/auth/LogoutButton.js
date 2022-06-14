import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='logout-btn nav-profile-text' onClick={onLogout}>Sign out of rflix</button>;
};

export default LogoutButton;
