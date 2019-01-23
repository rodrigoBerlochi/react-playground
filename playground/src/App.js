import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// Below this line, import file from every play and render later
// call always Tree to the export from a play
/// import {Tree} from './contextAPI/play-context';
import {Tree} from './redux-context-arch/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Playground</h1>
        <Tree />
      </div>
    );
  }
}

export default App;
