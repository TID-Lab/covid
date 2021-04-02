import { combineReducers } from 'redux'

import filtersReducer from './filters';

const rootReducer = combineReducers({
    filters: filtersReducer,
});
  
export default rootReducer;