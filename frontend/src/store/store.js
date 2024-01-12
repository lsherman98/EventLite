import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import userProfileReducer from './user'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        profile: userProfileReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});


if (import.meta.env.MODE !== 'production') {
    window.store = store;
}

export default store;