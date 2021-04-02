import { combineReducers } from 'redux'

import datesReducer from './dates';
import topicReducer from './topic';
import sourcesReducer from './sources';
import platformsReducer from './platforms';
import searchReducer from './search';
import sortByReducer from './sortBy';

const filtersReducer = combineReducers({
    dates: datesReducer,
    topic: topicReducer,
    sources: sourcesReducer,
    platforms: platformsReducer,
    search: searchReducer,
    sortBy: sortByReducer,
});
  
export default filtersReducer;