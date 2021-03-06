import { SET_USER, SET_CURRENT, REMOVE_USER } from './session';

//helper functions

export const selectProfile = (state) => {
    const id = state.currentProfileId;
    return state.profiles[id];
};

const GET_ALL = 'profiles/GET_ALL';
const GET_ONE = 'profiles/GET_ONE';
const ADD_ONE = 'profiles/ADD_ONE';
const DELETE = 'profiles/DELETE';

//action creators

const getAll = (profiles) => ({
    type: GET_ALL,
    payload: profiles,
});

const getOne = (profile) => ({
    type: GET_ONE,
    payload: profile,
});
const addOne = (profile) => ({
    type: ADD_ONE,
    payload: profile,
});
const deleteOne = (profileId) => ({
    type: DELETE,
    payload: profileId,
});

export const getProfiles = (userId) => async (dispatch) => {
    // getState is a function that can be passed to a thunk that returns the current store
    const res = await fetch(`/api/profiles/${userId}/user`);

    if (res.ok) {
        const list = await res.json();
        dispatch(getAll(list.profiles));
        return res;
    } else throw res;
};

export const getProfile = (profileId) => async (dispatch) => {
    const res = await fetch(`/api/profiles/${profileId}`);

    if (res.ok) {
        const profile = await res.json();
        dispatch(getOne(profile));
        return res;
    } else throw res;
};

export const addProfile = (formData) => async (dispatch) => {
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
    const res = await fetch(`/api/profiles/${profileId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            userId: formData.userId,
            autoplayHover: formData.autoplayHover,
            autoplayNext: formData.autoplayNext,
            defaultVolume: formData.defaultVolume,
        }),
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

export const updateProfileImage = (formData, profileId) => async (dispatch) => {
    const response = await fetch(`/api/profiles/${profileId}/image`, {
        method: 'POST',
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

const ADD_TO_WATCHLIST = 'profiles/ADD_TO_WATCHLIST';
const DELETE_FROM_WATCHLIST = 'profiles/DELETE_FROM_WATCHLIST';

const addToWatchlist = (watchlist) => ({
    type: ADD_TO_WATCHLIST,
    payload: watchlist,
});
const deleteFromWatchlist = (deletedWatchlist) => ({
    type: DELETE_FROM_WATCHLIST,
    payload: deletedWatchlist,
});

export const addToWatchlistThunk = (profileId, videoId) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${profileId}/add/${videoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            profileId: profileId,
            videoId: videoId,
        }),
    });

    if (res.ok) {
        const newWatchlist = await res.json();
        dispatch(addToWatchlist(newWatchlist));
        return null;
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const deleteFromWatchlistThunk =
    (profileId, videoId) => async (dispatch) => {
        const res = await fetch(
            `/api/watchlists/${profileId}/delete/${videoId}`,
            {
                method: 'DELETE',
            }
        );

        if (res.ok) {
            const deletedWatchlist = await res.json();
            dispatch(deleteFromWatchlist(deletedWatchlist));
            return null;
        } else return ['An error occurred. Please try again.'];
    };

const initialState = {
    profiles: {},
    currentProfileId: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            const profileData = {};

            for (let profile of action.payload) {
                profileData[profile.id] = profile;
            }
            return { ...state, profiles: profileData };
        case GET_ONE:
            //sets state[profileId] to profile
            return { ...state, [action.payload.id]: action.payload };

        case SET_USER:
            return {
                ...state,
                currentProfileId: action.payload.current_profile_id,
            };

        case ADD_ONE:
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    [action.payload.id]: action.payload,
                },
            };
        case ADD_TO_WATCHLIST:
            const newWatchlistVideos = [
                ...state.profiles[action.payload.profileId].watchlistVideos,
            ];
            newWatchlistVideos.push(action.payload.videoId);
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    [action.payload.profileId]: {
                        ...state.profiles[action.payload.profileId],
                        watchlistVideos: newWatchlistVideos,
                    },
                },
                [action.payload.profileId]: {
                    ...state.profiles[action.payload.profileId],
                    watchlistVideos: newWatchlistVideos,
                },
            };

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
            const newState = { ...state, profiles: { ...state.profiles } };
            delete newState['profiles'][action.payload];
            return newState;
        case DELETE_FROM_WATCHLIST:
            const newWState = {
                ...state,
                profiles: {
                    ...state.profiles,
                    [action.payload.profileId]: {
                        ...state.profiles[action.payload.profileId],
                        watchlistVideos: [
                            ...state.profiles[action.payload.profileId][
                                'watchlistVideos'
                            ],
                        ],
                    },
                },
                [action.payload.profileId]: {
                    ...state.profiles[action.payload.profileId],
                    watchlistVideos: [
                        ...state.profiles[action.payload.profileId][
                            'watchlistVideos'
                        ],
                    ],
                },
            };
            const watchlistArr =
                newWState['profiles'][action.payload.profileId][
                    'watchlistVideos'
                ];
            const idx = watchlistArr.indexOf(action.payload.videoId);
            newWState['profiles'][action.payload.profileId][
                'watchlistVideos'
            ].splice(idx, 1);
            newWState[action.payload.profileId]['watchlistVideos'].splice(
                idx,
                1
            );
            return newWState;

        default:
            return state;
    }
};

export default profileReducer;
