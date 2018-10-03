import React, { Component } from 'react'
import AuthMenu from '../auth-menu'
import { reduxForm, Field } from 'redux-form'
import Input from '../../input'

class SignIn extends Component {
  render() {
    return (<div className="container login-form">
      <div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-2 col-lg-4"></div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-4">
            <div className="row">
              <h2 className="text-center">Войти в аккаунт</h2>
              <form className="w-100" onSubmit={ ( values ) => console.log( values ) }>
                <Field
                  name="username"
                  type="text"
                  component={ Input }
                  placeholder="Введите идентификационный номер"
                  validate={ [ required ] }

                />
                { /*<PasswordInput/>*/ }
                <div>
                  <button type="submit" className="btn btn-primary btn-lg w-100">
                    Войти
                  </button>
                </div>
              </form>
            </div>
            <AuthMenu/>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default reduxForm( { form : 'signIn' } )( SignIn )

const required = value => (value || typeof value === 'number' ? undefined : 'Поле обязательно')

// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined
//
// const maxLength15 = maxLength(15)

// export const minLength = min => value =>
//   value && value.length < min ? `Must be ${min} characters or more` : undefined
//
// export const minLength2 = minLength(2)

// const number = value =>
//   value && isNaN(Number(value)) ? 'Must be a number' : undefined

// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
//
// const minValue13 = minValue(13)

// const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//   ? 'Invalid email address'
//   : undefined
//
// const aol = value =>
//   value && /.+@aol\.com/.test(value)
//   ? 'Really? You still use AOL for your email?'
//   : undefined
//
// const alphaNumeric = value =>
//   value && /[^a-zA-Z0-9 ]/i.test(value)
//   ? 'Only alphanumeric characters'
//   : undefined
//
// export const phoneNumber = value =>
//   value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//   ? 'Invalid phone number, must be 10 digits'
//   : undefined


// const FieldLevelValidationForm = props => {
//   const { handleSubmit, pristine, reset, submitting } = props
//   return (
//     <form onSubmit={handleSubmit}>
//       <Field
//         name="username"
//         type="text"
//         component={renderField}
//         label="Username"
//         validate={[required, maxLength15, minLength2]}
//         warn={alphaNumeric}
//       />
//       <Field
//         name="email"
//         type="email"
//         component={renderField}
//         label="Email"
//         validate={email}
//         warn={aol}
//       />
//       <Field
//         name="age"
//         type="number"
//         component={renderField}
//         label="Age"
//         validate={[required, number, minValue13]}
//         warn={tooYoung}
//       />
//       <Field
//         name="phone"
//         type="number"
//         component={renderField}
//         label="Phone number"
//         validate={[required, phoneNumber]}
//       />
//       <div>
//         <button type="submit" disabled={submitting}>
//           Submit
//         </button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}>
//           Clear Values
//         </button>
//       </div>
//     </form>
//   )
// }
