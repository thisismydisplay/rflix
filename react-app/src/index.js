import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import './index.css';
// import './reset.css';

import App from './App';
import { store } from './store';

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

//NOTE: strict mode renders components twice on development to detect errors in your code.
//thus if you have an alert, would show the alert twice
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// For testing out non-strict mode
// ReactDOM.render(<Root />, document.getElementById('root'));
