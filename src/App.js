import React, { Component } from 'react'
import { Provider as UserProvider } from './contexts/auth'
import './App.css'
import Main from './components/main'

class App extends Component {
  render() {
    return (<UserProvider>
        { /*<Loader></Loader>*/ }
        <Main/>
      </UserProvider>)
  }
}

export default App
