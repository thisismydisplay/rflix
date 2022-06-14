import './ProfileEditPage.css';

import editIcon from '../../images/edit-icon.png';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updateProfile } from '../../store/profile';
import { setCurrentProfile } from '../../store/session';

const Checkbox = ({ value, onChange }) => {
    return (
        <label>
            <input type='checkbox' checked={value} onChange={onChange} />
        </label>
    );
};

const ProfileEditPage = ({ currentProfile }) => {
    const [profileName, setProfileName] = useState(currentProfile.name);
    const [autoplayHover, setAutoplayHover] = useState(
        currentProfile.autoplayHover
    );
    const [autoplayNext, setAutoplayNext] = useState(
        currentProfile.autoplayNext
    );
    const [defaultVolume, setDefaultVolume] = useState(
        currentProfile.defaultVolume * 100
    );
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let formData = {
            userId: currentProfile.userId,
            name: profileName,
            autoplayHover: autoplayHover,
            autoplayNext: autoplayNext,
            defaultVolume: defaultVolume / 100,
        };

        try {
            const errors = await dispatch(
                updateProfile(formData, currentProfile.id)
            );
            if (!errors) {
                history.push(`/profile/manage`);
                return;
            } else {
                setErrors(errors);
            }
        } catch (errorResponse) {
            setErrors(['Something went wrong, please try again.']);
        }
    };
    const handleCancel = () => {
        history.push('/profile/manage');
    };
    const handleDelete = () => {
        history.push(`/profile/delete/${currentProfile.id}`);
    };
    const handleImage = async () => {
        await dispatch(setCurrentProfile(currentProfile.id));
        history.push(`/profile/manage/${currentProfile.id}/image`);
    };

    return (
        <div className='profile-page-div'>
            <div className='profile-select-wrap'>
                <div className='profile-edit-text'>Edit Profile</div>

                {errors.length > 0 && (
                    <div className='error-container'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error?.split(': ')[1]}</div>
                        ))}
                    </div>
                )}
                <form className='profile-add-form' onSubmit={handleSubmit}>
                    <div className='profile-edit-div'>
                        <div className='edit-form-top'>
                            <div
                                className='profile-default-image-div'
                                onClick={handleImage}
                            >
                                <img
                                    className='current-profile-image profile-default-image'
                                    src={currentProfile.profileImageUrl}
                                    alt='default user'
                                    viewBox='0 0 100 100'
                                    preserveAspectRatio='xMidYMid meet'
                                />
                                <img
                                    className='edit-profile-icon-edit'
                                    src={editIcon}
                                    alt='edit'
                                />
                            </div>
                            <div className='add-name-input-div'>
                                <input
                                    id='name'
                                    className='add-name-input'
                                    name='name'
                                    value={profileName}
                                    onChange={(e) =>
                                        setProfileName(e.target.value)
                                    }
                                    required
                                    placeholder='Name'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='profile-settings-div'>
                                <div className='profile-add-subtext'>
                                    Autoplay controls
                                </div>
                                <div className='autoplay-preview-div'>
                                    <div className='remember-me-div'>
                                        <Checkbox
                                            className='autoplay-preview'
                                            value={autoplayHover}
                                            onChange={(e) =>
                                                setAutoplayHover(!autoplayHover)
                                            }
                                        />
                                        <div className='autoplay-preview-text'>
                                            Autoplay previews on hover while
                                            browsing
                                        </div>
                                    </div>
                                </div>
                                <div className='autoplay-preview-div'>
                                    <div className='remember-me-div'>
                                        <Checkbox
                                            className='autoplay-preview'
                                            value={autoplayNext}
                                            onChange={(e) =>
                                                setAutoplayNext(!autoplayNext)
                                            }
                                        />
                                        <div className='autoplay-preview-text'>
                                            Autoplay video on start
                                        </div>
                                    </div>
                                </div>
                                <div className='profile-add-subtext'>
                                    Default volume
                                </div>
                                <div className='default-volume-div'>
                                    <input
                                        type='range'
                                        id='vol'
                                        name='vol'
                                        min='0'
                                        max='100'
                                        value={defaultVolume}
                                        onChange={(e) =>
                                            setDefaultVolume(e.target.value)
                                        }
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form-buttons'>
                        <div className='continue-btn-div'>
                            <button type='submit' className='continue-btn'>
                                Save
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
                        <div className='continue-btn-div'>
                            <button
                                className='cancel-btn'
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditPage;
