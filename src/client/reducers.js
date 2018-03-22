/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import { PrefetchReducer as prefetch } from '../server/prefetch';
import intl from '../modules/Intl/IntlReducer';
import property from '../modules/Property/PropertyReducer';

let combinedReducers = {
  intl,
  property
}

if (!global.navigator) {
  combinedReducers.prefetch = prefetch
}

// Combine all reducers into one root reducer
export default combineReducers({ ...combinedReducers })
