import './ProfileDeletePage.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteProfile } from '../../store/profile';

const ProfileDeletePage = ({ currentProfile }) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await dispatch(deleteProfile(currentProfile.id));
            if (res.message === 'Success') {
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
        history.push(`/profile/manage/${currentProfile.id}`);
    };

    return (
        <div className='profile-page-div'>
            <div className='profile-select-wrap'>
                <div className='profile-edit-text'>Delete Profile</div>

                {errors.length > 0 && (
                    <div className='error-container'>
                        {errors.map((error, ind) => (
                            <div key={`profile-delete-error-${ind}`}>{error?.split(': ')[1]}</div>
                        ))}
                    </div>
                )}
                <form className='profile-add-form' onSubmit={handleSubmit}>
                    <div className='profile-select-div'>
                        <div className='profile-default-image-div'>
                            <img
                                className='profile-select-image-upload'
                                src={currentProfile?.profileImageUrl}
                                alt='default user'
                                viewBox='0 0 100 100'
                                preserveAspectRatio='xMidYMid meet'
                            />
                        </div>
                        <div className='add-name-input-div'>
                            <span className='delete-text'>
                                This profile's history - including My List,
                                comments, and activity - will be gone forever,
                                and you wont be able to access it again.
                            </span>
                        </div>
                    </div>
                    <div className='form-buttons'>
                        <div className='continue-btn-div'>
                            <button
                                className='continue-btn'
                                onClick={handleCancel}
                            >
                                Keep Profile
                            </button>
                        </div>
                        <div className='continue-btn-div'>
                            <button type='submit' className='cancel-btn'>
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
