import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './components/registration-form'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegistrationForm />
      </div>
    );
  }
}

export default App;
