import React, { Component } from 'react'
import CardWord from './swipe-card-components/Main'

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center display-3">WELCOME</h1>
          </div>
        </div>
        {localStorage.usertoken ? <CardWord></CardWord> : null}
      </div>
    )
  }
}

export default Landing