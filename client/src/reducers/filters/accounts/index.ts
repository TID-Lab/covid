// The reducer for the all account-related filters

import { combineReducers } from 'redux'

import curatedOnlyReducer from './curatedOnly';
import institutionsReducer from './institutions';
import locationReducer from './location';
import categoriesReducer from './categories';
import identitiesReducer from './identities';

const rootReducer = combineReducers({
    curatedOnly: curatedOnlyReducer,
    institutions: institutionsReducer,
    location: locationReducer,
    categories: categoriesReducer,
    identities: identitiesReducer
});
  
export default rootReducer;