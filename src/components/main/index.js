import React, { PureComponent } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import Authentication from './authentication'

class Main extends PureComponent {
  render() {
    return (<BrowserRouter basename={ '/' }>
      <Switch>
        <Redirect from={ '/' } to={ '/auth' } exact/>
        <Route path="/auth" component={( Authentication ) }/>
      </Switch>
    </BrowserRouter>)
  }
}

export default Main