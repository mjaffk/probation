import {combineReducers} from 'redux'
import dictionary from './dictionary'
import captcha from './captcha'
import user from './user'
import {reducer as FormReducer} from 'redux-form'


export default combineReducers({
	dictionary,
	captcha,
	user,
	form: FormReducer,
})