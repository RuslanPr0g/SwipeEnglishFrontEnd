import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Word = props => (
    <tr className="d-flex justify-content-center">
      <td>{props.word}</td>
    </tr>
  );

class Landing extends Component {
    constructor(props) {
        super(props);

        this.generateRandomWord = this.generateRandomWord.bind(this)
        this.addWord = this.addWord.bind(this)
        this.addTest = this.addTest.bind(this)
        this.wordsList = this.wordsList.bind(this)

        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
    
        this.state = {user: decoded, random_word: null, definition: null, countWords: -1, toTest: [], isLimit: false};
    }

    addWord() {
        axios
            .post('http://localhost:5000/users/add-word/' + this.state.user._id, { data: { word: this.state.random_word }} )
            .then(function(response) {console.log(response.data)})
        this.generateRandomWord();
      }

    addTest(word) {
      let new_test = this.state.toTest;
      new_test.push(word);
      this.setState({toTest: new_test})
      this.generateRandomWord()
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

    wordsList() {
      return this.state.toTest.map(word => <Word word={word} key={word} />)
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
            <button className="btn btn-outline-info btn-lg" onClick={() => { this.addTest(this.state.random_word) }}>TEST</button>
            <button className="btn btn-outline-success btn-lg" onClick={() => { this.addWord()}}>KNOW</button>
            </div>
        </div>
        )

    return (
      <div className="container">
        <div className="d-flex justify-content-between">
        <div className="w-25">
        <table className="table content-table w-75">
          <thead className="table table-dark">
            <tr className="tr-main d-flex justify-content-center">
              <th className="th d-flex justify-content-center">WORDS TO TEST</th>
            </tr>
          </thead>
          <tbody>
            { this.wordsList() }
          </tbody>
        </table>
        {this.state.toTest.length >= 5 ? this.state.isLimit = true : this.state.isLimit = false}
    {this.state.isLimit ? <button className="btn btn-outline-primary">LET'S GO</button> : <h4 className="btn btn-secondary">{this.state.toTest.length}/5</h4>}
      </div>
        <div className="jumbotron mt-5 w-50">
          { this.state.isLimit ?
          <h1 className="display-3">Please, pass the test</h1>
          :
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
          }
        </div>
        </div>
      </div>
    )
  }
}

export default Landing