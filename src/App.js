import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import {checkWin} from './util';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const starter = Array(9).fill(null);

    this.state = {
      history: [starter],
      stepNumber: 0,
      xIsNext: true
    };
  }

  jumpTo(id) {
    const xIsNext = id%2 ? false : true;
    this.setState({
      stepNumber: id,
      xIsNext: xIsNext
    });
  }

  handleClick(id) {
    const stepNumber = this.state.stepNumber;
    const history = this.state.history.slice(0, stepNumber+1);
    const xIsNext = this.state.xIsNext;
    const current = history[stepNumber];
    const checkResult = checkWin(current);

    if(checkResult || current[id]) {
      return;
    }

    const squares = Array.prototype.slice.call(current);
    squares[id] = xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([squares]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const stepNumber = this.state.stepNumber;
    const squares = this.state.history[stepNumber];
    const result = checkWin(squares);
    return (
      <div className="game">
        <GameBoard onClick={(id)=>this.handleClick(id)} squares={squares}/>
        <GameInfo stepNumber={stepNumber} jumpTo={(id)=>this.jumpTo(id)} xIsNext={this.state.xIsNext} result={result} moves={this.state.history}/>
      </div>
    );
  }
}


export default App;
