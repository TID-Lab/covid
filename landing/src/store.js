// The master Redux store.

import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

export default store;