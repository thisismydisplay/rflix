import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import background from '../../images/splash-bg.png';

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
        <div
            className='login-page-wrapper'
            //   style={{ backgroundImage: `url(${background})` }}
        >
            {/* <div className='login-header-container'>
<div className='logo-container'>
  <img src={logo} alt='rflix logo' />
</div>
</div> */}
            <div className='login-form-container'>
                <div className='login-form-wrapper'>
                    <div className='login-wrapper-bg'>
                        <img src={background} alt='rflix' />
                    </div>
                    <form onSubmit={onSignUp} className='login-form'>
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
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
                            ></input>
                        </div>
                        <div>
                            {/* <label>Password</label> */}
                            <input
                                className='login-input'
                                type='password'
                                name='password'
                                placeholder='Password'

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
