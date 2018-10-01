import React, { Component } from 'react';

class RegistrationForm extends Component {
  state = {
    password: '',

  }

  render() {
    return (
      <div>
        <h1>Регистрация</h1>
        <form>
          <input type="password" value={this.state.password} required
                 onChange={this.readPassword} placeholder="Введите пароль"
          />
          <p>Пароль должен удовлетворять <span>политике безопасности</span></p>
          <input type="password" value={this.state.password} required
                 onChange={this.handleChange} placeholder="Подтвердите пароль"
          />
        </form>
      </div>
    );
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({password : event.target.value})
  }

  readPassword = (event) => {
    event.preventDefault()
    if (this.state.password.indexOf(event.target.value) === 0 ) event.target.className // todo: дописать проверку строки
  }
}

export default RegistrationForm;
