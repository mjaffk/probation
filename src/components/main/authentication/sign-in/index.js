import React from 'react'
import AuthMenu from '../auth-menu'
import { reduxForm, Field } from 'redux-form'
import Input from '../../input'
import { required } from '../../input/validate'

const  SignIn = ( ) => {
  return (<div className="< d-flex position-absolute h-75 w-100">
    <div className="container d-flex flex-column m-auto col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">
      <h1 className="h3 text-left font-wight-normal">Войти в аккаунт</h1>
      <form onSubmit={ (values) =>  console.log(values) }>

        <Field
          className="form-control"
          name="username"
          type="text"
          component={ Input }
          placeholder="Введите идентификационный номер"
          validate={ [ required ] }
          prependIcon='user'
        />

        <Field
          className="form-control"
          name="password"
          type="password"
          component={ Input }
          placeholder="Введите пароль"
          validate={ [ required ] }
          prependIcon='unlock-alt'
        />

        <div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Войти
          </button>
        </div>

      </form>
      <AuthMenu/>
    </div>
  </div>)
}

const validate =(values) => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Поле обязательно'
  }

  if (!values.password) {
    errors.password = 'Поле обязательно'
  }

  return errors
}

export default reduxForm( {
  form : 'signIn',
  validate,
} )( SignIn )