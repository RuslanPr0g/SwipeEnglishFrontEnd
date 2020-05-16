  import React, { Component } from 'react';
  import axios from 'axios';
  import './css/main.css';
  
  const Word = props => (
    <tr className="row100">
      <td className="column100 column1" data-column="column1">{props.word.word}</td>
      { props.word.definition ? <td className="column100 column2" data-column="column2">{props.word.definition}</td> : <td className="column100 column2" data-column="column2">--</td>}
      { props.word.partOfSpeech ?  <td className="column100 column3" data-column="column3">{props.word.partOfSpeech}</td> : <td className="column100 column3" data-column="column3">--</td>}
      { props.word.synonyms.length > 0 ? <td className="column100 column4" data-column="column4">{props.word.synonyms.join(', ')}</td> : <td className="column100 column4" data-column="column4">--</td> }
      { props.word.typeOf.length > 0 ? <td className="column100 column5" data-column="column5">{props.word.typeOf.join(', ')}</td> : <td className="column100 column5" data-column="column5">--</td> }
    </tr>
  );
  
  export default class Dictionary extends Component {
    constructor(props) {
      super(props);
  
      this.state = {words: []};
  }
  
    componentDidMount() {
      axios.get('/words/')
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
          <p className="blockquote-footer">Quantity Of Words: { this.numberOfWords() }</p>
          <table className="table content-table">
            <thead className="table table-dark">
              <tr className="tr-main">
                <th className="th">Word</th>
                <th className="th">Definition</th>
                <th className="th">Part Of Speech</th>
                <th className="th">Synonyms</th>
                <th className="th">Type Of</th>
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