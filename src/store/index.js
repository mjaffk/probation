import { createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk'
import addUUID from '../middleweres/addUUID'


const enhancer = compose( applyMiddleware(thunk, addUUID))

export const store = createStore(reducer, enhancer)

