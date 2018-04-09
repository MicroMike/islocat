/**
 * Main store function
 */
import { createStore } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';

let initialState = {};
// const store = createStore(rootReducer, initialState, compose(...enhancers));
const newStore = (init) => createStore(rootReducer, init || initialState);

export default newStore;
