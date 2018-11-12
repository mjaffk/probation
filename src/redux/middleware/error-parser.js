import { AUTHORIZE_USER, CONFIRM_EMAIL, FAIL } from '../action-types'
import { logoutUser } from '../action-creators'

export default (store) => (next) => (action) => {
  const {type, error, ...rest} = action
  if (!error || typeof error !== 'object') return next(action)

  console.log(action)
  const errorStatus = error.response.status
  let usefulError = error

  switch (errorStatus) {
    case 401:
      switch (type) {
        case AUTHORIZE_USER + FAIL :
          usefulError.errorToUser = 'Неверный логин или пароль. Прооверьте, пожалуйста, раскладку и Caps Lock'
          return next({...rest, type, error: usefulError})

        default:
          usefulError.errorToUser = 'Требуется повторная авторизация'
          next({...rest, type, error: usefulError})
          return next(logoutUser())
      }

    case 409:
      switch (type) {
        case CONFIRM_EMAIL + FAIL :
          usefulError.errorToUser = (error.response.data && error.response.data.token) ||
            'Произошла ошибка, попробуйте повторить попытку позже'
          return next({...rest, type, error: usefulError})

        default:
          return next({...rest, type, error: usefulError})
      }

    default:
      if (errorStatus > 500) {
        usefulError.errorToUser =
          `В настоящий момент сервер временно недоступен, пожалуйста, попробуйте повторить попытку позже`
        return next({...rest, type, error: usefulError})
      }

      usefulError.errorToUser = 'Произошла ошибка, пожалуйста, попробуйте повторить попытку позже'
      console.error(`-- ${type} -- Status: ${errorStatus} -- ${usefulError}`)
      return next({...rest, type, error: usefulError})
  }
}