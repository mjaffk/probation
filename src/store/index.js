import { createStore, applyMiddleware} from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk'
import addUUID from '../middleweres/addUUID'


export const store = createStore(reducer, applyMiddleware(thunk, addUUID))

