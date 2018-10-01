import uuid from 'uuid/v1'

export default (store) => (next) => (action) => {
    if (!action.generateId) return next(action)
    next({
        ...action,
        UUID: uuid()
    })
}