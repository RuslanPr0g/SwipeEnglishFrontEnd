import React, { Component } from 'react'
import { register } from './UserFunctions'
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      email: '',
      password: '',
      errors: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteToken = this.deleteToken.bind(this)
    this.fieldsAreSuitable = this.fieldsAreSuitable.bind(this)
  }

  deleteToken() {
    localStorage.removeItem('usertoken')
    window.location.href = '/login'
  }

  fieldsAreSuitable(newUser){
    if(newUser.username.length === 0 || newUser.email.length === 0 || newUser.password.length === 0){
      this.setState({error: "Some Fields Are Empty.."});
      setTimeout(()=>{this.setState({error: null})},2000);
      this.setState({
      username: '',
      email: '',
      password: ''
      });
      return false;
    }
    if(newUser.username.length < 6){
      this.setState({error: "Username is small (min length is 5)"});
      setTimeout(()=>{this.setState({error: null})},2000);
      this.setState({
      username: ''
      });
      return false;
    }
    if(newUser.password.length < 6){
      this.setState({error: "Password is small (min length is 5)"});
      setTimeout(()=>{this.setState({error: null})},2000);
      this.setState({
      password: ''
      });
      return false;
    }
    return true;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    if(localStorage.usertoken)
    {
      this.deleteToken();
    }

    if(this.fieldsAreSuitable(newUser))
    {
      register(newUser)
        .then(res => {
         this.props.history.push(`/login`)
        })
        .catch(function (error) {
          this.setState({error: error.error});
          setTimeout(()=>{this.setState({error: null})},2000);
        })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal display-4">Sign Up</h1>
              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  minLength="5"
                  placeholder="Username"
                  required
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  required
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
                  minLength="5"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign Up
              </button>
              <br/>
              <div className="px-auto container">
                <span className="mx-auto">Have An Account? <Link to="/login">Log In</Link></span>
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

export default Register