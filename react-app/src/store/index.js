
import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './profile'
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import sessionReducer from './session'
import logger from 'redux-logger'
// const rootReducer = combineReducers({
//   session,
// });
export const store = configureStore(
  {
  reducer: {
    session: sessionReducer,
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
}
)


// let enhancer;

// if (process.env.NODE_ENV === 'production') {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = require('redux-logger').default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };
