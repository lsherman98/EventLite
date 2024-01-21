import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import userProfileReducer from './user'
import eventReducer from './events'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        profile: userProfileReducer,
        events: eventReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});


if (import.meta.env.MODE !== 'production') {
    window.store = store;
}

export default store;