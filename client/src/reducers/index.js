// Combines together every reducer into a root reducer

import { combineReducers } from 'redux'

import filtersReducer from './filters';
import postsReducer from './posts';
import popupReducer from './popup';
import postingMenuReducer from './postingMenu';

const rootReducer = combineReducers({
    filters: filtersReducer,
    posts: postsReducer,
    popup: popupReducer,
    postingMenu: postingMenuReducer,
});
  
export default rootReducer;