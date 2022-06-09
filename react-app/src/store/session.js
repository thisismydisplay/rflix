import { createReducer } from '@reduxjs/toolkit';

//helper functions that accept state as argument (selectors) library-> reselect

// constants
export const SET_USER = 'session/SET_USER';
export const REMOVE_USER = 'session/REMOVE_USER';
export const SET_CURRENT = 'session/SET_CURRENT';

const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

const setCurrent = (profile) => ({
    type: SET_CURRENT,
    payload: profile,
});

const removeUser = () => ({
    type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setUser(data));
    }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            rememberMe,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};

export const signUp = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const setCurrentProfile = (id) => async (dispatch) => {
    const res = await fetch(`/api/auth/profile`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            current_profile_id: id
        }),
    });

    if (res.ok) {
        const profile = await res.json();
        dispatch(setCurrent(profile));
        return res;
    } else throw res;
};

export default createReducer(initialState, (builder) => {
    builder.addCase(SET_USER, (state, action) => {
        state.user = action.payload;
    });
    builder.addCase(REMOVE_USER, (state) => {
        state.user = null;

    });
});

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_USER:
//       return { user: action.payload }
//     case REMOVE_USER:
//       return { user: null }
//     default:
//       return state;
//   }
// }
