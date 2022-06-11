import './ProfileDeletePage.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addProfile, deleteProfile } from '../../store/profile';

const ProfileDeletePage = ({ currentProfile}) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('current profile:', currentProfile);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await dispatch(deleteProfile(currentProfile.id));
            if (res.message === 'Success') {
                // closeModal()
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
        history.push(`/profile/manage/${currentProfile.id}`);
    };

    return (
        <div className='profile-page-div'>
            <div className='profile-select-wrap'>
                <div className='profile-edit-text'>Delete Profile</div>

                {errors.length > 0 && (
                    <div className='error-container'>
                        {/* <p className='signup-error-message'>Invalid email or password.</p> */}
                        {errors.map((error, ind) => (
                            <div key={ind}>{error?.split(': ')[1]}</div>
                        ))}
                    </div>
                )}
                <form className='profile-add-form' onSubmit={handleSubmit}>
                    <div className='profile-select-div'>
                        <div className='profile-default-image-div'>
                            <img
                                className='profile-select-image'
                                // onClick={handleClick}
                                src={currentProfile?.profileImageUrl}
                                alt='default user'
                                viewBox='0 0 100 100'
                                preserveAspectRatio='xMidYMid meet'
                            />
                        </div>
                        <div className='add-name-input-div'>
                            <span className='delete-text'>This profile's history - including My List, comments, and activity - will be gone forever, and you wont be able to access it again.</span>

                        </div>
                        {/* <Profile profile={{profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg'}} /> */}
                    </div>
                    <div className='form-buttons'>
                        <div className='continue-btn-div'>
                            <button className='continue-btn' onClick={handleCancel}>
                                Keep Profile
                            </button>
                        </div>
                        <div className='continue-btn-div'>
                            <button
                            type='submit'
                                className='cancel-btn'

                            >
                                Delete Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileDeletePage;
