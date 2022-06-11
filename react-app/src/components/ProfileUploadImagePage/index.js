import './ProfileUploadImagePage.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addProfile, updateProfileImage } from '../../store/profile';

const ProfileUploadImagePage = ({ currentProfile }) => {
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(false);

    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('current profile:', currentProfile);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', currentProfile.name);
        formData.append('userId', currentProfile.userId);
        formData.append('profileImageUrl', currentProfile.profileImageUrl);
        formData.append('autoplayHover', currentProfile.autoplayHover);
        formData.append('autoplayNext', currentProfile.autoplayNext);
        formData.append('defaultVolume', currentProfile.defaultVolume);
        setImageLoading(true);
        try {
            const errors = await dispatch(
                updateProfileImage(formData, currentProfile.id)
            );
            if (!errors) {
                setImageLoading(false);
                history.push(`/profile/manage`);
                return;
            } else {
                setImageLoading(false);
                setErrors(errors);
            }
        } catch (errorResponse) {
            setErrors(['Something went wrong, please try again.']);
            console.log('error');
        }
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleCancel = () => {
        history.push(`/profile/manage/${currentProfile.id}`);
    };

    return (
        <div className='profile-page-div'>
            <div className='profile-select-wrap'>
                <div className='profile-edit-text'>Upload Profile Image</div>


                    <div className='error-container'>
                        {/* {errors?.map((error, ind) => (
                            <div key={ind}>{error?.split(': ')[1]}</div>
                        ))} */}
                    </div>

                <form className='profile-add-form' onSubmit={handleSubmit}>
                    <div className='profile-select-div'>
                        <div className='profile-default-image-div'>
                            <img
                                className='profile-select-image'
                                // onClick={handleClick}
                                src={currentProfile.profileImageUrl}
                                alt='default user'
                                viewBox='0 0 100 100'
                                preserveAspectRatio='xMidYMid meet'
                            />
                        </div>
                        <div className='add-name-input-div'>
                            <span className='delete-text'>
                                Upload your new profile image
                            </span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={updateImage}
                            />
                        </div>
                        {/* <Profile profile={{profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg'}} /> */}
                    </div>
                    <div className='form-buttons'>
                        <div className='continue-btn-div'>
                            <button
                                className='continue-btn'
                                type='submit'
                                disabled={imageLoading}
                                onClick={handleSubmit}
                            >
                                Upload
                            </button>
                        </div>
                        <div className='continue-btn-div'>
                            <button
                                type='button'
                                className='cancel-btn'
                                disabled={imageLoading}
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

export default ProfileUploadImagePage;
