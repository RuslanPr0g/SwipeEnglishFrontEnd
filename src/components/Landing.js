import React, { Component } from 'react'
import CardSwiper from './swipe-card-components/Main'

class Landing extends Component {
  render() {
    return (
      <div className="container">
        {localStorage.usertoken ? <CardSwiper></CardSwiper> : null}
      </div>
    )
  }
}

export default Landing