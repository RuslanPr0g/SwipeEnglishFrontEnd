import React, { Component } from 'react'
import CardWord from './swipe-card-components/Main'

class Landing extends Component {
  render() {
    return (
      <div className="container">
        {localStorage.usertoken ? <CardWord></CardWord> : null}
      </div>
    )
  }
}

export default Landing