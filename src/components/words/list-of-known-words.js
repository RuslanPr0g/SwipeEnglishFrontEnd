import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Word = props => (
  <tr>
    <td>{props.word}</td>
    <td className="d-flex justify-content-end">
      <button className="btn btn-outline-danger" onClick={() => { props.deleteWord(props) }}>FORGET</button>
    </td>
  </tr>
);

export default class WordsList extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.usertoken
    const decoded = jwt_decode(token)

    this.deleteWord = this.deleteWord.bind(this)

    this.state = {id: decoded._id, words: []}
}

  componentDidMount() { 
    axios.get('http://localhost:5000/users/get-words/' + this.state.id)
      .then(response => {
        this.setState({ words: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteWord(props) {
    axios
    .delete('http://localhost:5000/users/delete-word/' + this.state.id, { data: { word: props.word }} )
    .then(function(response) {console.log(response.data)})

    this.setState({
      words: this.state.words.filter(el => el !== props.word)
    })
  }

  WordsList() {
    return this.state.words.map(currentWord => <Word word={currentWord} deleteWord={this.deleteWord} key={currentWord} />)
  }

  render() {
    return (
      <div>
        <h3 className="d-flex justify-content-center">You Already Know</h3>
        <br />
        <table className="table">
          <thead className="table table-dark">
            <tr>
              <th>Word</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.WordsList() }
          </tbody>
        </table>
      </div>
    )
  }
}