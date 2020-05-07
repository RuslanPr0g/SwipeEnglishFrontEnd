import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';

class Landing extends Component {

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        // this.context.history.push(`/`)
        window.location.href = '/'
      }

    render() {
        const loginRegLink = (
          <ul class="nav navbar-nav navbar-right">
          <li> <Link to="/login" className="nav-link">Login</Link></li>
          </ul>
          )
      
          const userLink = (
          <ul class="nav navbar-nav navbar-right">
          <li> <Link to="/profile" className="nav-link">User</Link></li>
          <li> <a href="/" onClick={this.logOut.bind(this)} className="nav-link">Log Out</a></li>
          </ul>
          )
          
          return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
      
              <div className="collapse navbar-collapse justify-content-md-center" id="navbarToggleExternalContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li> <Link to="/words" className="nav-link">Dictionary</Link></li>
                </ul>
                {localStorage.usertoken ? userLink : loginRegLink}
              </div>
            </nav>
          )
    }

}

export default withRouter(Landing)