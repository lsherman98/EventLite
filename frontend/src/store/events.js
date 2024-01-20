import { createSlice } from "@reduxjs/toolkit"
import { csrfFetch } from "./csrf"


export const getEvents = () => async dispatch => {
    const response = await csrfFetch("/api/events")
    let data = await response.json()
    if (response.ok){
        dispatch(addEvents(data))
        return data
    }
}

export const getEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`)
    let data = await response.json()
    if (response.ok) {
        dispatch(addEvent(data))
    }
}

export const createEvent = (event) => async dispatch => {
    const response = await csrfFetch("/api/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "content-type": "application/json"
        }
    })
    let data = await response.json()
    if (response.ok) {
        dispatch(addEvent(data))
    } else {
        return data
    }
}

export const updateEvent = (event) => async dispatch => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(event),
        headers: {
            "content-type": "application/json"
        }
    })
    let data = await response.json()
    if (response.ok) {
        dispatch(addEvent(data))
    } else {
        return data.errors
    }
}

export const deleteEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`api/events/${eventId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeEvent(eventId))
    }
}


const eventReducer = createSlice({
    name: 'events',
    initialState: { },
    reducers: {
        addEvent: (state, action) => {
            return {...state, ...action.payload}
        },
        addEvents: (state, action) => {
           return {...state, ...action.payload}
        },
        removeEvent: (state, action) => {
            delete state.events[action.payload]
        }

     }
})

export const { addEvent, addEvents, removeEvent } = eventReducer.actions
export default eventReducer.reducer