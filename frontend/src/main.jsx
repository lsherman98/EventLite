// import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { restoreSession } from './store/csrf';
import store from './store/store';
// import { signup, login, logout } from './store/session'


// if (import.meta.env.MODE !== "production") {
//   window.signup = signup
//   window.login = login
//   window.logout = logout
//   window.dummyUser = {
//   username: "testUser",
//   email: "email@email.com",
//   first_name: "test",
//   last_name: 'user'
//  }
// }

export const initializeApp = () => {


  const root = createRoot(document.getElementById('root'));

  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    // </React.StrictMode>
  );
};

restoreSession().then(initializeApp())
