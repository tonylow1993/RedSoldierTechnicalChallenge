import { combineReducers } from 'redux'
import marker from './marker'
import restaurants from './restaurants'

export default combineReducers({
  marker,
  restaurants
})