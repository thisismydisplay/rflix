import './SignUpFormPage.css';

import background from '../../images/splash-bg.png';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpFormPage = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(email, password));
            if (data) {
                setErrors(data);
            }
        } else {
            setErrors(['Password must match']);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/browse' />;
    }

    return (
        <div className='login-page-wrapper'>
            <div className='login-form-container'>
                <div className='login-form-wrapper'>
                    <div className='login-wrapper-bg'>
                        <img src={background} alt='rflix' />
                    </div>

                    <form onSubmit={onSignUp} className='login-form'>
                        <div className='error-container'>
                            {errors.map((error, ind) => (
                                <div key={`signup-form-error-${ind}`}>
                                    {error}
                                </div>
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
                        <div className='sign-in-text'>Sign Up</div>
                        <div>
                            {/* <label>Email</label> */}
                            <input
                                className='login-input'
                                type='text'
                                name='email'
                                placeholder='Email'
                                onChange={updateEmail}
                                value={email}
                                required
                            ></input>
                        </div>
                        <div>
                            {/* <label>Password</label> */}
                            <input
                                className='login-input'
                                type='password'
                                name='password'
                                placeholder='Password'
                                required
                                onChange={updatePassword}
                                value={password}
                            ></input>
                        </div>
                        <div>
                            {/* <label>Repeat Password</label> */}
                            <input
                                className='login-input'
                                type='password'
                                name='repeat_password'
                                placeholder='Confirm Password'
                                onChange={updateRepeatPassword}
                                value={repeatPassword}
                                required={true}
                            ></input>
                        </div>
                        <button type='submit' className='sign-in-btn'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpFormPage;
