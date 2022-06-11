const GET_ALL = 'comments/GET_ALL';
const ADD_ONE = 'comments/ADD_ONE';
const DELETE = 'comments/DELETE';

const getAll = (comments) => ({
    type: GET_ALL,
    payload: comments,
});

const addOne = (comment) => ({
    type: ADD_ONE,
    payload: comment,
});

const deleteOne = (commentId) => ({
    type: DELETE,
    payload: commentId,
});

export const getComments = (videoId) => async (dispatch) => {
    // getState is a function that can be passed to a thunk that returns the current store
    const res = await fetch(`/api/comments/${videoId}`);

    if (res.ok) {
        const list = await res.json();
        dispatch(getAll(list.comments));
        return res;
    } else throw res;
};

export const addComment = (formData) => async (dispatch) => {
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: formData.text,
            profileId: formData.profileId,
            videoId: formData.videoId,
        }),
    });

    if (res.ok) {
        const newComment = await res.json();
        dispatch(addOne(newComment));
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

export const updateComment = (formData, commentId) => async (dispatch) => {
    console.log("commentID: ",commentId)
    console.log("formData", formData)
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: formData.text,
            profileId: formData.profileId,
            videoId: formData.userId,
        }),
    });
    if (res.ok) {
        const updatedComment = await res.json();
        dispatch(addOne(updatedComment));
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

export const deleteComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
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

const initialState = {
    comments: {},
    // currentCommentId: null
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            const commentData = {};
            //   commentData['currentcomment'] = ...state.currentcomment
            // commentData['comments'] = {};

            for (let comment of action.payload) {
                commentData[comment.id] = comment;
            }
            return { ...state, comments: commentData };

        case ADD_ONE:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.payload.id]: action.payload,
                },
            };

        case DELETE:
            const newState = { ...state, comments: {...state.comments} };
            console.log(newState)
            delete newState['comments'][action.payload];
            return newState;
        default:
            return state;
    }
};

export default commentReducer;
