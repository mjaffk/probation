import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import saga from "../saga"
import thunk from 'redux-thunk'

const composeEnhancers = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
	applyMiddleware(sagaMiddleware,logger, thunk)
)

export const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)
