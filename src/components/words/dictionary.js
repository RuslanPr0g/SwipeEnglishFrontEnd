import React, { Component } from 'react';
import axios from 'axios';

const Word = props => (
  <tr>
    <td>{props.word.name}</td>
    <td>{props.word.difficulty}</td>
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

  render() {
    return (
      <div>
        <h3 className="d-flex justify-content-center display-4">Dictionary Of Swipe English!</h3>
        <p className="blockquote-footer">Quantity Of Words: { this.numberOfWords() }</p>
        <table className="table">
          <thead className="table table-dark">
            <tr>
              <th>Word</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            { this.wordsList() }
          </tbody>
        </table>
      </div>
    )
  }
}