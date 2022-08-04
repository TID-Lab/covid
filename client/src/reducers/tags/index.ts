// Combines together every tag reducer into a root reducer

import { combineReducers } from 'redux';
import alltagsReducer from './alltags';
import activetagsReducer from './activetags';
import searchReducer from 'reducers/tags/search';

const rootReducer = combineReducers({
  alltags: alltagsReducer,
  activetags: activetagsReducer,
  search: searchReducer,
});

export default rootReducer;
