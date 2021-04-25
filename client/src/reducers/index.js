import { combineReducers } from 'redux'

import filtersReducer from './filters';
import postsReducer from './posts';

const rootReducer = combineReducers({
    filters: filtersReducer,
    posts: postsReducer
});
  
export default rootReducer;