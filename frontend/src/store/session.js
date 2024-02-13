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
        return data
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
    if (response.ok) {
        // dispatch(addRegistration(data));
        dispatch(loginUser(data.user))
        // sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    }
}

export const  registrationUpdate = (registration) => async dispatch => {
    const response = await csrfFetch(`/api/registrations/${registration.id}`, {
        method: "PUT",
        body: JSON.stringify(registration),
        headers: {
            "content-type": "application/json"
        }
    })
    // eslint-disable-next-line no-unused-vars
    const data = await response.json();
    if (response.ok) {
        // dispatch(updateRegistration(registration));
        dispatch(loginUser(data.user))
        // sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    }
}

export const registrationRefund = (registrationId) => async dispatch => {
    const response = await csrfFetch(`/api/registrations/${registrationId}`, {
        method: "DELETE"
    })
    const data = await response.json();
    if (response.ok) {
        // dispatch(removeTicket(data));
        dispatch(loginUser(data.user))
        // sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    }
}

export const like = (like) => async dispatch => {
    const response = await csrfFetch('/api/bookmarks', {
        method: "POST",
        body: JSON.stringify(like)
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(addLike(data.event))
        return data
    }
}

export const unLike = (like) => async dispatch => {
    const response = await csrfFetch('/api/bookmarks/undefined', {
        method: "DELETE",
        body: JSON.stringify(like)
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(removeLike(data.event))
        return response
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
            // state.user.tickets.push(action.payload)
            state.user.tickets = action.payload.user.tickets
        },
        addEvent: (state, action) => {
            state.user.events.push(action.payload)
        },
        removeEvent: (state, action) => {
            state.user.events = state.user.events.filter(event => event.id !== action.payload.id)
        },
        addLike: (state, action) => {
            state.user.likes.push(action.payload)
        },
        removeLike: (state, action) => {
            state.user.likes = state.user.likes.filter(like => like.id !== action.payload.id)
        },
        updateRegistration: (state, action) => {
           state.user.tickets.forEach(ticket => {
                if (ticket.registrationId === action.payload.id) {
                    ticket.ticketAmount = parseInt(action.payload.quantity)
                } 
           })
        },
        removeTicket: (state, action) => {
            state.user.tickets = state.user.tickets.filter(ticket => {
                if (ticket.id !== action.payload.event_id) {
                    return ticket
                }
            })
        }
    },
});

// Export actions directly from the slice
export const { loginUser, logoutUser, addRegistration, addEvent, removeEvent, addLike, removeLike, updateRegistration, removeTicket } = sessionReducer.actions;

// Export the reducer
export default sessionReducer.reducer;