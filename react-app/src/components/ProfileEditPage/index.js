import './ProfileEditPage.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import editIcon from '../../images/edit-icon.png';

// import FullPageModal from '../FullPageModal'
import ProfileDeletePage from '../ProfileDeletePage'
import { addProfile, updateProfile} from '../../store/profile';
import { setCurrentProfile } from '../../store/session';

const Checkbox = ({ value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
       </label>
    );
  };

const ProfileEditPage = ({ currentProfile }) => {
    const [profileName, setProfileName] = useState(currentProfile.name);
    const [autoplayHover, setAutoplayHover] = useState(
        currentProfile.autoplayHover
    );
    const [defaultVolume, setDefaultVolume] = useState(
        currentProfile.defaultVolume*100
    );
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('current profile:', currentProfile);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let volume = (defaultVolume/100)
        console.log(volume)

        let formData = {
            userId: currentProfile.userId,
            name: profileName,
            autoplayHover: autoplayHover,
            defaultVolume: defaultVolume/100,
        };

        console.log(formData);
        try {
            const errors = await dispatch(updateProfile(formData, currentProfile.id));
            if (!errors) {
                history.push(`/profile/manage`);
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
        history.push('/profile/manage');
    };
    const handleDelete = () => {
        history.push(`/profile/delete/${currentProfile.id}`);
    };
    const handleImage = async () => {
        await dispatch(setCurrentProfile(currentProfile.id));
        history.push(`/profile/manage/${currentProfile.id}/image`);
    };
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //   if (showModal) return; // do nothing if modal already showing
    //   setShowModal(true); // else open modal
    //   document.getElementById('root').classList.add('overflow');
    // };
    // const closeModal = () => {
    //     if (!showModal) return; // do nothing if modal already closed
    //     setShowModal(false); // else close modal
    //     // disable page scrolling:
    //     document.getElementById('root').classList.remove('overflow');
    //   };
    return (
        <div className='profile-page-div'>
            {/* <FullPageModal
          showModal={showModal}
          closeModal={closeModal}
        > */}
          {/* <ProfileDeletePage currentProfile={currentProfile}/> */}
        {/* </FullPageModal> */}
            <div className='profile-select-wrap'>
                <div className='profile-edit-text'>Edit Profile</div>

                {errors.length > 0 && (
                    <div className='error-container'>
                        {/* <p className='signup-error-message'>Invalid email or password.</p> */}
                        {errors.map((error, ind) => (
                            <div key={ind}>{error?.split(': ')[1]}</div>
                        ))}
                    </div>
                )}
                <form className='profile-add-form' onSubmit={handleSubmit}>
                    <div className='profile-edit-div'>
                        <div className='edit-form-top'>
                            <div className='profile-default-image-div' onClick={handleImage}>
                                <img
                                    className='current-profile-image profile-default-image'
                                    // onClick={handleClick}
                                    src={currentProfile.profileImageUrl}
                                    alt='default user'
                                    viewBox='0 0 100 100'
                                    preserveAspectRatio='xMidYMid meet'
                                />
                                <img className='edit-profile-icon' src={editIcon} alt='edit'/>
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
                                                setAutoplayHover(
                                                    !autoplayHover
                                                )
                                            }
                                        />
                                        <span className='autoplay-preview-text'>
                                            Autoplay previews while browsing
                                        </span>
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
                        {/* <Profile profile={{profileImageUrl: 'https://lofidelity-bucket.s3.amazonaws.com/default-profile-image.jpeg'}} /> */}
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
