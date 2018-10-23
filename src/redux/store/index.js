import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer/index'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import saga from "../saga/index"
import {routerMiddleware} from 'react-router-redux'
import history from '../../utils/history'
import {ReducerRecord as RegionRecord} from "../reducer/regions"
import {ReducerRecord as UserRecord} from "../reducer/user"
import errorParser from "../middleware/error-parser"


/**
 * Compose for redux dev tool
 */
const composeEnhancers = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose


/**
 * Init saga middleware
 * @type {SagaMiddleware<object>}
 */
const sagaMiddleware = createSagaMiddleware()


/**
 * Compose all middleware to StoreEnhancer
 */
const enhancer = composeEnhancers(
	applyMiddleware(routerMiddleware(history), sagaMiddleware, logger, errorParser)
)


/**
 * Get Initial State from Local and Session Storage
 * @see https://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app/37690899#37690899?newreg=038466ee6a6a46ad82f2fbd23ed20fe7
 * @return {Object} - initial state
 */
const persistedState = () => {
	/**
	 * Get Data from Local Storage in necessary form
	 * @returns {object}
	 */
	const getDataFromLocalStorage = () => {
		if (!localStorage.getItem('reduxState')) return {}

		const {regions, userId, token} = JSON.parse(localStorage.getItem('reduxState'))

		return {
			regions: new RegionRecord(regions),
			user: new UserRecord(userId, token)
		}
	}

	/**
	 * Get Data from Session Storage in necessary form
	 * @return {Object}
	 */
	const getDataFromSessionStorage = () => {
		if (!sessionStorage.getItem('reduxForm')) return {}
		return {
			form: JSON.parse(sessionStorage.getItem('reduxForm')).form,
		}
	}

	return ({...getDataFromLocalStorage(), ...getDataFromSessionStorage()})
}


/**
 * Init Store
 */
export const store = createStore(reducer, persistedState(), enhancer)


/**
 * Update Storage
 */
store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify({
		userid: store.getState().user.userId,
		token: store.getState().user.token,
		regions: store.getState().regions.regions && store.getState().regions.regions.toArray()
	}))
	sessionStorage.setItem('reduxForm', JSON.stringify({
		form: store.getState().form
	}))
})


/**
 * Run Saga watcher
 */
sagaMiddleware.run(saga)
