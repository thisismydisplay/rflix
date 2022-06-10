import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { SET_USER, SET_CURRENT, REMOVE_USER } from './session';

//helper functions

export const selectProfile = (state) => {
    const id = state.currentProfileId;
    return state.profiles[id];
};

const GET_ALL = 'videos/GET_ALL';
// const SET_CURRENT = 'videos/SET_CURRENT';
const GET_ONE = 'videos/GET_ONE';


//action creators

const getAll = (videos) => ({
    type: GET_ALL,
    payload: videos,
});
const getOne = (video) => ({
    type: GET_ALL,
    payload: video,
});

export const getVideos = () => async (dispatch) => {
    // getState is a function that can be passed to a thunk that returns the current store
    const res = await fetch(`/api/videos`);

    if (res.ok) {
        const list = await res.json();
        dispatch(getAll(list.videos));
        return res;
    } else throw res;
};
export const getVideo = (id) => async (dispatch) => {
    const res = await fetch(`/api/video/${id}`);

    if (res.ok) {
        const video = await res.json();
        dispatch(getVideo(video));
        return res;
    } else throw res;
};


const initialState = {
    videos: {},
    currentVideoId: null,
};

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            const videoData = {};
            //   profileData['currentProfile'] = ...state.currentProfile
            // profileData['profiles'] = {};

            for (let video of action.payload) {
                videoData[video.id] = video;
            }
            return { ...state, videos: videoData };
        case GET_ONE:
            return {
                ...state,
                currentVideoId: action.payload.current_video_id,
            };
        default:
            return state;
    }
};

export default videoReducer;
