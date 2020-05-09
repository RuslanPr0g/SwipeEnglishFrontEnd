import React, { Component } from 'react'
import { login } from './UserFunctions'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      error: null 
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteToken = this.deleteToken.bind(this)
}

  deleteToken() {
      localStorage.removeItem('usertoken')
      window.location.href = '/login'
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
  
    const user = {
      email: this.state.email,
      password: this.state.password
    }
  
    login(user)
      .then(res => {
      if (res.error !== 'User does not exist' && res.error !== 'Wrong Password') {
        this.props.history.push('/profile')
      }
      else
      {
        this.setState({error: res.error});
        setTimeout(()=>{this.setState({error: null})},2000);
        this.deleteToken();
      }
    })
    .catch(function (error) {
      console.log(error);
    })

    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal display-4">Log In</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Log In
              </button>
              <br/>
              <div className="px-auto container">
                <span className="mx-auto">New Here? <Link to="/register">Sign Up</Link></span>
              </div>
              { this.state.error &&
  <div id="error" className="alert alert-danger mt-2" role="alert"> { this.state.error }</div>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login