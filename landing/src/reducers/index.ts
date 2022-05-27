// Combines together every reducer into a root reducer

import { combineReducers } from 'redux';

import popupReducer from './popup';

const rootReducer = combineReducers({
  // keeping popup just in case we need it
  popup: popupReducer,
});

export default rootReducer;
