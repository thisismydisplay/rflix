import './LoginFormPage.css';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import background from '../../images/splash-bg.png';
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
        <div className='login-page-wrapper'>
            <div className='login-form-container'>
                <div className='login-form-wrapper'>
                    <div className='login-wrapper-bg'>
                        <img src={background} alt='rflix' />
                    </div>
                    <form className='login-form' onSubmit={onLogin}>
                        <div className='error-container'>
                            {errors?.map((error, ind) => (
                                <div key={`login-error-${ind}`}>{error}</div>
                            ))}
                        </div>
                        <p className='sign-in-stream-text'>
                            Stream movies, share thoughts.
                        </p>
                        <p className='sign-in-welcome-text'>
                            Welcome to{' '}
                            <span className='rflix-span sign-in-welcome-text'>
                                {' '}
                                rFlix.
                            </span>
                        </p>
                        <div>
                            {/* <label htmlFor='email'>Email</label> */}
                            <input
                                className='login-input'
                                name='email'
                                type='text'
                                placeholder='Email'
                                required
                                value={email}
                                onChange={updateEmail}
                            />
                        </div>
                        <div>
                            {/* <label htmlFor='password'>Password</label> */}
                            <input
                                className='login-input'
                                name='password'
                                type='password'
                                placeholder='Password'
                                required
                                value={password}
                                onChange={updatePassword}
                            />
                        </div>
                        <button className='sign-in-btn' type='submit'>
                            Sign In
                        </button>
                        <button
                            className='sign-in-btn'
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
                                <span className='remember-me-text'>
                                    Remember Me
                                </span>
                            </div>
                        </div>
                        <div className='new-sign-up-div'>
                            <span className='new-to-rflix-text'>
                                New to rflix?{' '}
                            </span>
                            <NavLink className='sign-up-now-text' to='/signup'>
                                Sign up now.
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginFormPage;
