import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../../images/rflix-logo-placeholder2.png';
import background from '../../images/splash-bg.png';
import './LoginFormPage.css';
const LoginFormPage = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password, rememberMe));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/profile' />;
  }

  return (
    <div
      className='login-page-bg'
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* <div className='login-header-container'>
        <div className='logo-container'>
          <img src={logo} alt='rflix logo' />
        </div>
      </div> */}
      <div className='login-form-container'>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className='sign-in-btn' type='submit'>
            Sign In
          </button>
          <button
            className='nav-btn'
            type='button'
            onClick={() =>
              dispatch(
                login(
                  'demo@user.io',
                  'password',
                  rememberMe
                )
              )
            }
          >
            Demo User
          </button>
          <div className='sign-in-subtext-div'>
            <div className='remember-me-div'>
              <input
                type='checkbox'
                className='remember-me'
                checked={rememberMe}
                onChange={handleRememberMe}
              ></input>
              <span className='remember-me-text'>Remember Me</span>
            </div>
          </div>
          <div className='new-sign-up-div'>
            <span>New to rflix? </span>
            <NavLink className='sign-up-now-text' to='/signup'>
              Sign up now.
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormPage;
