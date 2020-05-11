import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// const Word = props => (
//     <tr>
//       <td>{props.word.name}</td>
//       <td>{props.word.difficulty}</td>
//       <td>{props.word.speech}</td>
//     </tr>
//   );

class Landing extends Component {
    constructor(props) {
        super(props);

        this.generateRandomWord = this.generateRandomWord.bind(this)
        this.addWord = this.addWord.bind(this)

        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
    
        this.state = {user: decoded, random_word: null, definition: null, countWords: -1};
    }

    addWord() {
        axios
            .post('http://localhost:5000/users/add-word/' + this.state.user._id, { data: { word: this.state.random_word }} )
            .then(function(response) {console.log(response.data)})
        this.generateRandomWord();
      }

    generateRandomWord(){
        this.setState({countWords: 0})
        axios.get('http://localhost:5000/r-word/')
        .then(response => {
          this.setState({ random_word: response.data[0].word, definition: response.data[0].definition})
        })
        .catch((error) => {
          console.log(error);
        })
    }

  render() {
    const start = (
    <div className="container">
        <h1 className="text-center display-3">SWIPE!</h1>
        <div className="d-flex justify-content-center">
        <button className="btn btn-outline-info btn-lg" onClick={() => { this.generateRandomWord()}}>START</button>
        </div>
    </div>
    )

    const swipe = (
    <div className="container"><p className="blockquote-footer">{this.state.definition}</p>
            <h1 className="text-center display-3">{this.state.random_word}</h1>
            <div className="d-flex justify-content-between">
            <button className="btn btn-outline-info btn-lg" onClick={() => { this.generateRandomWord() }}>SKIP</button>
            <button className="btn btn-outline-success btn-lg" onClick={() => { this.addWord()}}>KNOW</button>
            </div>
        </div>
        )

    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
             <div className="container">
               {this.state.countWords > -1
               ? 
               swipe
               :
               start
               }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing