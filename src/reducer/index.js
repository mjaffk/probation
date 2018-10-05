import { combineReducers } from 'redux'
import dictionary from './dictionary'
import { reducer as FormReducer } from 'redux-form'


export default combineReducers({
  dictionary,
  form: FormReducer
})