import { createSlice } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';


export const login = (user) => async dispatch => {
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify(user)
    });
    let data = await response.json();
    if (response.ok) {
        dispatch(loginUser(data.user));
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        return data
    } else {
        return data.errors
    }
    
};

export const signup = ({username, email, firstName, lastName, password}) => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            user: {
                username,
                email,
                first_name: firstName,
                last_name: lastName,
                password
            }
        })
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(loginUser(data.user));
        sessionStorage.setItem('currentUser', JSON.stringify(data.user))
        return data
    } else {
        return data.errors
    }
};

export const logout = (userId) => async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    sessionStorage.setItem('currentUser', null)
    if (response.ok) {
        dispatch(logoutUser(userId));
    }
};




let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null
let initialState = {}

if (currentUser) {
    initialState = {
        user: currentUser
    }
}

// Create a slice
const sessionReducer = createSlice({
    name: 'sessions',
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        logoutUser: (state, action) => {
            state.user = null;
        },
    },
});

// Export actions directly from the slice
export const { loginUser, logoutUser } = sessionReducer.actions;

// Export the reducer
export default sessionReducer.reducer;