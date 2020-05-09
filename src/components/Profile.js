import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import list_of_words from './words/list-of-known-words'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount() {

    const token = localStorage.usertoken;
    const decoded =  jwt_decode(token);

    this.setState({
      username: decoded.username,
      email: decoded.email
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Username</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Router>
          <div className="container">
            <Route component = {list_of_words} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Profile