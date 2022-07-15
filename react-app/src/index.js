import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import './index.css';
import './reset.css';

import App from './App';
import { store } from './store';

import * as session from './store/session';
import * as profile from './store/profile';
import * as video from './store/video';
import * as comment from './store/comment';

if (process.env.NODE_ENV !== 'production') {
    window.store = store; //easy access to store and its methods in browser console
    window.session = session; //test session redux state
    window.profile = profile; //test session redux state
    window.video = video; //test session redux state
    window.comments = comment; //test session redux state
}

//root wrapper used to wrap <App/>  in various provider components
function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
