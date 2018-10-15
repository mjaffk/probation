import {createContext} from 'react'

const {Provider, Consumer} = createContext({user: {user_id: '', token: ''}})

export {Provider, Consumer}