import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import d_login from './d-isLogged/d-login'
import d_logout from './d-isLogged/d-logout'

export default class Dictionary extends Component {
  render() {
    return (
      <div>
        *        научиться делать подгрузку
        <Router>
          <div className="container">
          {localStorage.usertoken ? <Route component = {d_login} /> : <Route component = {d_logout} />}
          </div>
        </Router>
      </div>
    )
  }
}