import { combineReducers } from 'redux'

import datesReducer from './dates';
import topicReducer from './topic';
import sourcesReducer from './sources';
import platformsReducer from './platforms';

const filtersReducer = combineReducers({
    dates: datesReducer,
    topic: topicReducer,
    sources: sourcesReducer,
    platforms: platformsReducer,
});
  
export default filtersReducer;