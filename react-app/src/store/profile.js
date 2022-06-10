import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { SET_USER, SET_CURRENT, REMOVE_USER } from './session';

//helper functions

export const selectProfile = (state) => {
    const id = state.currentProfileId;
    return state.profiles[id];
};

const GET_ALL = 'profiles/GET_ALL';
// const SET_CURRENT = 'profiles/SET_CURRENT';
const ADD_ONE = 'profiles/ADD_ONE';
// const UPDATE = 'profiles/UPDATE';
const UPDATE_IMAGE = 'profiles/UPDATE_IMAGE'
const DELETE = 'profiles/DELETE';


//helper selectors
// const selectMappableProfiles = (profiles)=> {
//   const profilesArr = Object.entries(profiles);
//   let idx;
//   for (let i = 0; i < profilesArr.length; i++) {
//     if (profilesArr[i][0] === 'currentProfile') {
//       idx = i;
//     }
//   }
//   profilesArr.splice(idx, 1);
//   console.log(profilesArr)
//   return profilesArr
// }

//action creators

const getAll = (profiles) => ({
    type: GET_ALL,
    payload: profiles,
});
const updateImage = (url, profileId) => ({
    type: UPDATE_IMAGE,
    payload: {url, profileId},
})
// const setCurrent = (profile) => ({
//     type: SET_CURRENT,
//     payload: profile,
// });
const addOne = (profile) => ({
    type: ADD_ONE,
    payload: profile,
});
// const updateOne = (profile) => ({
//   type: UPDATE,
//   profile,
// });
const deleteOne = (profileId) => ({
    type: DELETE,
    payload: profileId,
});

export const getProfiles = (userId) => async (dispatch) => {
    // getState is a function that can be passed to a thunk that returns the current store
    const res = await fetch(`/api/profiles/${userId}`);

    if (res.ok) {
        const list = await res.json();
        dispatch(getAll(list.profiles));
        return res;
    } else throw res;
};
// export const getProfiles = () => async (dispatch, getState) => {
//     // getState is a function that can be passed to a thunk that returns the current store
//     const store = getState();
//     const res = await fetch(`/api/profiles/${store.session.user.id}`);

//     if (res.ok) {
//         const list = await res.json();
//         dispatch(getAll(list.profiles));
//         return res;
//     } else throw res;
// };

// export const getProfile = (id) => async (dispatch) => {
//   const res = await fetch(`/api/profiles/${id}`);

//   if (res.ok) {
//     const profile = await res.json();
//     dispatch(setCurrent(profile));
//     return res;
//   } else throw res;
// };
export const addProfile = (formData) => async (dispatch) => {
    console.log(formData);
    const res = await fetch(`/api/profiles/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            userId: formData.userId,
        }),
    });

    if (res.ok) {
        const newProfile = await res.json();
        dispatch(addOne(newProfile));
        return null;
    } else if (res.status < 500) {
        const resBody = await res.json();
        if (resBody.errors) {
            return resBody.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};
export const updateProfile = (formData, profileId) => async (dispatch) => {
    console.log("ProfileID: ",profileId)
    console.log("formDate", formData)
    const res = await fetch(`/api/profiles/${profileId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            userId: formData.userId,
            autoplayHover: formData.autoplayHover,
            defaultVolume: formData.defaultVolume
        }),
    });
    console.log(res)
    if (res.ok) {
        const updatedProfile = await res.json();
        dispatch(addOne(updatedProfile));
        return null;
    } else if (res.status < 500) {
        const resBody = await res.json();
        if (resBody.errors) {
            return resBody.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const updateProfileImage =
  //imageType is 'profile', 'cover', or 'background'
  (formData, profileId) => async (dispatch) => {
    const response = await fetch(`/api/profiles/${profileId}/image`, {
      method: 'PATCH',
      body: formData,
    });

    if (response.ok) {
      const newProfile = await response.json();
      dispatch(addOne(newProfile));
      return null;
    } else if (response.status < 500) {
      const res = await response.json();
      if (res.errors) {
        return res.errors;
      }
    } else {
      return ['An error occurred. Please try again.'];
    }

    // if (response.ok) {
    //   const resBody = await response.json();
    //   dispatch(updateArtistImage(genreId, artistId, resBody.url, imageType));
    //   return response;
    // } else throw response;
  };

export const deleteProfile = (id) => async (dispatch) => {
    const res = await fetch(`/api/profiles/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const resBody = await res.json();
        if (resBody.message === 'Success') {
            dispatch(deleteOne(id));
        }
        return resBody;
    } else throw res;
};
// export const setCurrentProfile = (id) => async (dispatch) => {
//     const res = await fetch(`/api/profiles/${id}`);

//     if (res.ok) {
//         const profile = await res.json();
//         dispatch(setCurrent(profile));
//         return res;
//     } else throw res;
// };

const initialState = {
    profiles: {},
    currentProfileId: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            const profileData = {};
            //   profileData['currentProfile'] = ...state.currentProfile
            // profileData['profiles'] = {};

            for (let profile of action.payload) {
                profileData[profile.id] = profile;
            }
            return { ...state, profiles: profileData };
        case SET_USER:
            return {
                ...state,
                currentProfileId: action.payload.current_profile_id,
            };
        // case SET_CURRENT:
        //     return {
        //         ...state,
        //         currentProfile: [action.payload],
        //     };
        // case UPDATE:
        //     return {...state, [action.profile.id]: action.profile};
        case ADD_ONE:
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    [action.payload.id]: action.payload,
                },
            };
        // case UPDATE_IMAGE:
        //     return {
        //         ...state,
        //         profiles: {
        //             ...state.profiles,
        //             [action.payload.profileId]:
        //         }
        //     }
        case SET_CURRENT:
            return {
                ...state,
                currentProfileId: action.payload.id,
            };
        case REMOVE_USER:
            return {
                ...state,
                profiles: {},
                currentProfileId: null,
            };

        case DELETE:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default profileReducer;
