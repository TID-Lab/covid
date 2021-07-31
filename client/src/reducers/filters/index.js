// The reducer for all dashboard filters

import { combineReducers } from 'redux'

import datesReducer from './dates';
import topicReducer from './topic';
import accountsReducer from './accounts';
import platformsReducer from './platforms';
import searchReducer from './search';
import sortByReducer from './sortBy';

const filtersReducer = combineReducers({
    dates: datesReducer,
    topic: topicReducer,
    accounts: accountsReducer,
    platforms: platformsReducer,
    search: searchReducer,
    sortBy: sortByReducer,
});
  
export default filtersReducer;