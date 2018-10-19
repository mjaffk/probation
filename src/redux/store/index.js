import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer/index'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import saga from "../saga/index"
import {routerMiddleware} from 'react-router-redux'
import history from '../../utils/history'
import {List} from "immutable"
import merge from 'deepmerge'

const composeEnhancers = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
	applyMiddleware(routerMiddleware(history), sagaMiddleware, logger,)
)
/**
 * @see https://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app/37690899#37690899?newreg=038466ee6a6a46ad82f2fbd23ed20fe7
 */
const persistedLocalState = localStorage.getItem('reduxState') ? {
	user: {
		userId: JSON.parse(localStorage.getItem('reduxState')).userId,
		token: JSON.parse(localStorage.getItem('reduxState')).token
	},
	regions: {
		regions: JSON.parse(localStorage.getItem('reduxState')).regions
	},
} : {}

const persistedSessionState = sessionStorage.getItem('reduxForm') ? {
	form: JSON.parse(sessionStorage.getItem('reduxForm')).form,
} : {}

const persistedState = merge(persistedLocalState, persistedSessionState)

export const store = createStore(reducer, persistedState, enhancer)

store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify({
		userid: store.getState().user.userId,
		token: store.getState().user.token,
		regions: store.getState().regions.regions.toArray() ? store.getState().regions.regions.toArray() : []
	}))
	sessionStorage.setItem('reduxForm', JSON.stringify({
		form: store.getState().form
	}))
})

sagaMiddleware.run(saga)
