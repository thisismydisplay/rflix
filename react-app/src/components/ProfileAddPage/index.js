import './ProfileAddPage.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addProfile } from '../../store/profile';

const ProfileAddPage = ({ currentProfile }) => {
    const [profileName, setProfileName] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('current profile:', currentProfile);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let formData = {
            userId: currentProfile.userId,
            name: profileName,
        };

        console.log(formData);
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
            console.log('error');
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
                        {/* <p className='signup-error-message'>Invalid email or password.</p> */}
                        {errors.map((error, ind) => (
                            <div key={ind}>{error?.split(': ')[1]}</div>
                        ))}
                    </div>
                )}
                <form className='profile-add-form' onSubmit={handleSubmit}>
                    <div className='profile-default-div'>
                        <div className='profile-default-image-div'>
                            <img
                                className='profile-default-image'
                                // onClick={handleClick}
                                src='https://lofidelity-bucket.s3.amazonaws.com/rflix-default-profile.png'
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
                        {/* <Profile profile={{profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg'}} /> */}
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
