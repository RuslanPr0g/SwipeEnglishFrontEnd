import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
//import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import Landing from './components/Landing'
import Login from './components/login-components/Login'
import Register from './components/login-components/Register'
import Profile from './components/Profile'
import Dictionary from './components/words/dictionary'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component = {Landing} />
        <Route path="/edit/:id" component = {EditExercise} />
        <Route path="/create" component = {CreateExercise} />
        <Route exact path="/words" component = {Dictionary} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <br/><br/>
        Made By <strong>Rudenko Ruslan @Student</strong>
      </div>
    </Router>
  );
}

export default App;