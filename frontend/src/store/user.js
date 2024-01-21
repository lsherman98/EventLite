import { createSlice } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const fetchUser = userId => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`)
    const data = await response.json()
    if (response.ok) {
        dispatch(setUser(data.user))
        return data
    }
}


const userProfileReducer = createSlice({
    name: 'profile',
    initialState: { user: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userProfileReducer.actions
export default userProfileReducer.reducer

