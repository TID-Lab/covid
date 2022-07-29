// Combines together every tag reducer into a root reducer

import { combineReducers } from 'redux';
import alltagsReducer from './alltags';
import activetagsReducer from './activetags';

const rootReducer = combineReducers({
  alltags:alltagsReducer,
  activetags:activetagsReducer
});

export default rootReducer;
