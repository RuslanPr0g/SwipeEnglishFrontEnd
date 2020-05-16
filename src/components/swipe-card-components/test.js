import React, { Component } from 'react'
import axios from 'axios';

class Test extends Component {
    constructor(props) {
        super(props);

        this.clickedRight = this.clickedRight.bind(this)
        this.clickedWrong = this.clickedWrong.bind(this)
        this.generateRandomDefinition = this.generateRandomDefinition.bind(this)
        this.generateRandomDefinition1 = this.generateRandomDefinition1.bind(this);
        this.generateRandomDefinition2 = this.generateRandomDefinition2.bind(this);
        this.generateRandomPosition = this.generateRandomPosition.bind(this)
        this.addWord = this.addWord.bind(this)
    
        this.state = {user: props.user, words: props.words, showIndex: 0, random_position: 0, random_definition: "", random_definition2: ""};
    }

    componentDidMount(){
        this.generateRandomPosition();
        this.generateRandomDefinition();
    }

    clickedRight()
    {
        if(this.state.showIndex < 4)
        {
            this.setState({showIndex: this.state.showIndex + 1});
            this.generateRandomPosition();
            this.generateRandomDefinition();
        }
        if(this.state.showIndex === 4)
        {
          this.setState({showIndex: 4});
          console.log("Right");
          this.addWord();
          
          this.props.history.push('/profile')
        }
    }

    addWord() {
      axios
          .post('/users/add-word/' + this.state.user._id, { data: { word: this.state.words[this.state.showIndex].word }} )
          .then(function(response) {console.log(response.data)})
    }

    clickedWrong()
    {
        if(this.state.showIndex < 4)
        {
            this.setState({showIndex: this.state.showIndex + 1});
            this.generateRandomPosition();
            this.generateRandomDefinition();
            console.log("Wrong");
        }
    }

    generateRandomDefinition(){

      this.generateRandomDefinition1();

      this.generateRandomDefinition2();
    }

    generateRandomDefinition1()
    {
      axios.get('/r-word/')
      .then(response => {
        if(response.data[0].definition !== this.state.words[this.state.showIndex])
        {
          this.setState({ random_definition: response.data[0].definition})
        }
        else
        {
          this.generateRandomDefinition1();
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    generateRandomDefinition2()
    {
      axios.get('/r-word/')
      .then(response => {
        if(response.data[0].definition !== this.state.words[this.state.showIndex] && response.data[0].definition !== this.state.random_definition)
        {
          this.setState({ random_definition2: response.data[0].definition})
        }
        else
        {
          this.generateRandomDefinition2();
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    generateRandomPosition(){
        this.setState({random_position: Math.floor(Math.random() * 3)});
    }

  render() {
    return (
      <div className="container d-flex justify-content-center">
          <div className="jumbotron mt-5 w-50">
          <div className="row text-capitalize bg-primary d-flex justify-content-center font-weight-bold">{this.state.words[this.state.showIndex].word}</div>
          {
            this.state.random_position === 0 ?
            <div>
            <div className="col-sm bg-info mt-5 text-capitalize h-10 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedRight()}>{this.state.words[this.state.showIndex].definition}</div>
            <div className="col-sm bg-info mt-5 text-capitalize h-25 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedWrong()}>{this.state.random_definition}</div>
            <div className="col-sm bg-info mt-5 text-capitalize h-25 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedWrong()}>{this.state.random_definition2}</div>
            </div>
            :
            this.state.random_position === 2 ?
            <div>
            <div className="col-sm bg-info mt-5 text-capitalize h-10 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedWrong()}>{this.state.random_definition}</div>
            <div className="col-sm bg-info mt-5 text-capitalize h-25 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedWrong()}>{this.state.random_definition2}</div>
            <div className="col-sm bg-info mt-5 text-capitalize h-25 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedRight()}>{this.state.words[this.state.showIndex].definition}</div>
            </div>
            :
            this.state.random_position === 1 ?
            <div>
            <div className="col-sm bg-info mt-5 text-capitalize h-10 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedWrong()}>{this.state.random_definition}</div>
            <div className="col-sm bg-info mt-5 text-capitalize h-25 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedRight()}>{this.state.words[this.state.showIndex].definition}</div>
            <div className="col-sm bg-info mt-5 text-capitalize h-25 d-flex justify-content-center font-weight-bold" onClick={() => this.clickedWrong()}>{this.state.random_definition2}</div>
            </div>
            : null
          }
         </div>
      </div>
    )
  }
}

export default Test