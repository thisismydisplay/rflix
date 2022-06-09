const GET_ALL = 'profiles/GET_ALL';
const SET_CURRENT = 'profiles/SET_CURRENT';
const ADD_ONE = 'profiles/ADD_ONE';
// const UPDATE = 'profiles/UPDATE';
const DELETE = 'profiles/DELETE';

const getAll = (profiles) => ({
  type: GET_ALL,
  payload: profiles,
});
const setCurrent = (profile) => ({
  type: SET_CURRENT,
  payload: profile,
});
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
  const res = await fetch(`/api/profiles/${userId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(getAll(list.profiles));
    return res;
  } else throw res;
};

// export const getProfile = (id) => async (dispatch) => {
//   const res = await fetch(`/api/profiles/${id}`);

//   if (res.ok) {
//     const profile = await res.json();
//     dispatch(setCurrent(profile));
//     return res;
//   } else throw res;
// };
export const addProfile = (formData) => async (dispatch) => {
  const res = await fetch(`/api/profiles/`, {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' }, //S3 makes own header
    body: formData,
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
  const res = await fetch(`/api/profiles/${profileId}`, {
    method: 'PATCH',
    // headers: { 'Content-Type': 'application/json' }, //S3 makes own header
    body: formData,
  });

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
export const setCurrentProfile = (id) => async (dispatch) => {
  const res = await fetch(`/api/profiles/${id}`);

  if (res.ok) {
    const profile = await res.json();
    dispatch(setCurrent(profile));
    return res;
  } else throw res;
};

const initialState = {
  list: [],
  currentProfile: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      const profileData = {};
      profileData['currentProfile'] = {...state.currentProfile}
      for (let profile of action.payload) {
        profileData[profile.id] = profile;
      }
      return { ...profileData };

    case SET_CURRENT:
      return {
        ...state,
        currentProfile: [action.payload],
      };
    // case UPDATE:
    //     return {...state, [action.profile.id]: action.profile};
    case ADD_ONE:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default profileReducer;
