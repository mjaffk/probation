import {combineReducers} from 'redux'
import dictionary from './dictionary'
import captcha from './captcha'
import user from './user'
import {reducer as FormReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'


export default combineReducers({
	dictionary,
	captcha,
	user,
	form: FormReducer,
	router: routerReducer
})