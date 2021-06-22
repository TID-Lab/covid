import { combineReducers } from 'redux'

import filtersReducer from './filters';
import postsReducer from './posts';
import popupReducer from './popup';

const rootReducer = combineReducers({
    filters: filtersReducer,
    posts: postsReducer,
    popup: popupReducer,
});
  
export default rootReducer;