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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          )
      
          const userLink = (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  User
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                  Log Out
                </a>
              </li>
            </ul>
          )
          
          return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample10"
                aria-controls="navbarsExample10"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
      
              <div
                className="collapse navbar-collapse justify-content-md-center"
                id="navbarsExample10"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                </ul>
                {localStorage.usertoken ? userLink : loginRegLink}
              </div>
            </nav>
          )
    }

}

export default withRouter(Landing)

/* <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
<Link to="/" className="navbar-brand">Swipe English</Link>
<div className="collapse navbar-collapse ">
    <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
            <Link to="/" className="nav-link">Swipe</Link>
        </li>
        <li className="navbar-item">
            <Link to="" className="nav-link text-danger disabled">D̷i̷c̷t̷i̷o̷n̷a̷r̷y̷</Link>
        </li>
        <li className="navbar-item">
            <Link to="/create" className="nav-link">English Practice</Link>
        </li>
        <li className="navbar-item">
            <Link to="" className="nav-link text-danger disabled">V̷o̷c̷a̷b̷u̷l̷a̷r̷y̷</Link>
        </li>
        <li className="navbar-item">
            <Link to="/user" className="nav-link">Log Out</Link>
        </li>
    </ul>
</div>
</nav> */