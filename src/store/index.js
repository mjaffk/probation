import { createStore, applyMiddleware, compose} from 'redux'
import reduser from '../reducer'
import thunk from 'thunk'
import addUUID from '../middleweres/addUUID'

const enhancer = compose( applyMiddleware(thunk, addUUID))

export const store = createStore(reduser, enhancer)

