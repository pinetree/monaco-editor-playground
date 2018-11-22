import { combineReducers } from 'redux'
import preferencesReducer from './preferences/reducers.js'

const rootReducer = combineReducers({
  preferences: preferencesReducer
})

export default rootReducer
