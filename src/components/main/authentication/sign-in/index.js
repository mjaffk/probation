import React, { Component } from 'react'
import AuthMenu from '../auth-menu'
import { reduxForm } from 'redux-form'

class SignIn extends Component {
  render() {
    return (<div className="container login-form">
      <div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-2 col-lg-4"></div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-4">
            <div className="row">
              <h2 className="text-center">Войти в аккаунт</h2>
              {/*todo: write function on submit*/}
              <form className="w-100" onSubmit={ ()=>null}>
                {/*<Input/>*/}
                {/*<PasswordInput/>*/}

              </form>
            </div>
            <AuthMenu/>
          </div>
        </div>
      </div>
    </div>)
  }
}

reduxForm( { form : 'signIn' } )( SignIn )

export default SignIn

