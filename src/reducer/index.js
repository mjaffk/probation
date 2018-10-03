import { combineReducers } from 'redux'
import user from './user'
import { reducer as FormReducer } from 'redux-form'


export default combineReducers({
  user,
  form: FormReducer
})