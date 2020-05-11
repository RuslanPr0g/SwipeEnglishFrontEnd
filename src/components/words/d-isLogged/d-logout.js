import React, { Component } from 'react';
import axios from 'axios';

const Word = props => (
  <tr>
    <td>{props.word.word}</td>
    <td>{props.word.definition}</td>
    <td>{props.word.partOfSpeech}</td>
    <td>{props.word.synonyms}</td>
    <td>{props.word.typeOf}</td>
  </tr>
);

export default class Dictionary extends Component {
  constructor(props) {
    super(props);

    this.state = {words: []};
}

  componentDidMount() {
    axios.get('http://localhost:5000/words/')
      .then(response => {
        this.setState({ words: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  wordsList() {
    return this.state.words.map(currentword => <Word word={currentword} key={currentword._id} />)
  }

  numberOfWords() {
      let c = 0;
      this.wordsList().forEach(element => c++);
      return c;
  }

  pushToRegister(){
    window.location.href = '/register'
  }

  render() {
    return (
      <div>
        <h3 className="d-flex justify-content-center display-4">Dictionary Of Swipe English!</h3>
        <p className="blockquote-footer">Quantity Of Words: { 11982 /*this.numberOfWords()*/ }</p>
        <table className="table">
          <thead className="table table-dark">
            <tr>
              <th>Word</th>
              <th>Definition</th>
              <th>Part Of Speech</th>
              <th>Synonyms</th>
              <th>Type Of</th>
            </tr>
          </thead>
          <tbody>
            { this.wordsList().slice(0, 11) }
          </tbody>
        </table>
        <div className="container d-flex justify-content-center mb-5">
          <button onClick={this.pushToRegister.bind(this)} className="font-weight-bold btn btn-outline-info">Sign Up</button></div> 
      </div>
    )
  }
}