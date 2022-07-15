import './ProfileAddPage.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addProfile } from '../../store/profile';

const ProfileAddPage = ({ user }) => {
    const [profileName, setProfileName] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let formData = {
            userId: user.id,
            name: profileName,
        };

        try {
            const errors = await dispatch(addProfile(formData));
            if (!errors) {
                history.push('/profile');
                return;
            } else {
                setErrors(errors);
            }
        } catch (errorResponse) {
            setErrors(['Something went wrong, please try again.']);
        }
    };
    const handleCancel = () => {
        history.push('/profile');
    };

    return (
        <div className='profile-page-div'>
            <div className='profile-select-wrap'>
                <div className='profile-add-text'>Add Profile</div>
                <div className='profile-add-subtext'>
                    Add a profile for another person watching rflix.
                </div>
                {errors.length > 0 && (
                    <div className='error-container'>
                        {errors.map((error, ind) => (
                            <div key={`profile-add-error-${ind}`}>
                                {error?.split(': ')[1]}
                            </div>
                        ))}
                    </div>
                )}
                <form className='profile-add-form' onSubmit={handleSubmit}>
                    <div className='profile-default-div'>
                        <div className='profile-default-image-div'>
                            <img
                                className='profile-default-image'
                                src='https://rflix.s3.amazonaws.com/rflix-default-profile.png'
                                alt='default user'
                                viewBox='0 0 100 100'
                                preserveAspectRatio='xMidYMid meet'
                            />
                        </div>
                        <div className='add-name-input-div'>
                            <input
                                id='name'
                                className='add-name-input'
                                name='name'
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                required
                                placeholder='Name'
                            />
                        </div>
                    </div>
                    <div className='form-buttons'>
                        <div className='continue-btn-div'>
                            <button type='submit' className='continue-btn'>
                                Continue
                            </button>
                        </div>
                        <div className='continue-btn-div'>
                            <button
                                className='cancel-btn'
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileAddPage;
