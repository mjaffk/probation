import { Record } from 'immutable'
import {ADD_USER} from '../constants'

const UserRecord = new Record({
  used_id: '',
  token: ''
})

export default (state = new UserRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_USER:
      return state

    default:
      return state
  }
}