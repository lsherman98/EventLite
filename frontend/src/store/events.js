import { createSlice } from "@reduxjs/toolkit"
import { csrfFetch } from "./csrf"
import { addEvent, removeEvent } from "./session"


export const getEvents = () => async dispatch => {
    const response = await csrfFetch("/api/events")
    let data = await response.json()
    if (response.ok){
        dispatch(addEvents(data))
        localStorage.setItem('cachedEvents', JSON.stringify(data));
        return data
    }
}

export const getEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`)
    let data = await response.json()
    if (response.ok) {
        dispatch(showEvent(data))
    } 
    return response
}

export const createEvent = (event) => async dispatch => {
    const response = await csrfFetch("/api/events", {
        method: "POST",
        body: event
    })
    let data = await response.json()
    if (response.ok) {
        dispatch(addEvent(data.event))
        return data.event
    } else {
        return data
    }
}

export const updateEvent = (event) => async dispatch => {
    const response = await csrfFetch(`/api/events/${event.get('id')}`, {
        method: "PUT",
        body: event
    })
    let data = await response.json()
    if (response.ok) {
        dispatch(showEvent(data))
        return data
    } else {
        return data
    }
}

export const deleteEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: "DELETE"
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(removeEvent(data.event))
    }
}

const eventReducer = createSlice({
    name: 'events',
    initialState: {},
    reducers: {
        addEvents: (state, action) => {
           const newState = {...state, ...action.payload}
           return newState
        },
        showEvent: (state, action) => {
            return {...state, ...action.payload}
        }
     }
})

export const { addEvents, showEvent } = eventReducer.actions
export default eventReducer.reducer