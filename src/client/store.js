/**
 * Main store function
 */
import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';

let initialState = {};
// const store = createStore(rootReducer, initialState, compose(...enhancers));
const store = createStore(rootReducer, initialState);

export default store;
