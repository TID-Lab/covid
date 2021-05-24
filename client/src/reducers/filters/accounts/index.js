import { combineReducers } from 'redux'

import curatedOnlyReducer from './curatedOnly';
import institutionsReducer from './institutions';
import locationReducer from './location';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
    curatedOnly: curatedOnlyReducer,
    institutions: institutionsReducer,
    location: locationReducer,
    categories: categoriesReducer
});
  
export default rootReducer;