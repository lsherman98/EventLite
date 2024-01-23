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


export const updateUser = (user) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.get('id')}`, {
        method: "PUT",
        body: user
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

export const signup = (newUser) => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: newUser
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

export const logout = () => async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    sessionStorage.setItem('currentUser', null)
    if (response.ok) {
        dispatch(logoutUser());
    }
};

export const register = ({user_id, event_id, quantity}) => async dispatch => {
    console.log(user_id, event_id, quantity)
    const response = await csrfFetch('/api/registrations', {
        method: "POST",
        body: JSON.stringify({
            registration: {
                user_id,
                event_id,
                quantity
            }
        }),
        headers: {
            "content-type": "application/json"
        }
    })
    const data = await response.json();
    console.log(data)
    if (response.ok) {
        dispatch(addRegistration(data.event));
    }
}



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
        addRegistration: (state, action) => {
            console.log(action.payload)
            state.user.tickets.push(action.payload)
        },
        addEvent: (state, action) => {
            state.user.events.push(action.payload)
        },
        removeEvent: (state, action) => {
            state.user.events = state.session.user.events.filter(event => event !== action.payload)
        }
    },
});

// Export actions directly from the slice
export const { loginUser, logoutUser, addRegistration, addEvent, removeEvent} = sessionReducer.actions;

// Export the reducer
export default sessionReducer.reducer;