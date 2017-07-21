import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Square(props) {
  return (
    <div className="square" onClick={props.onClick}>{props.value}</div>
  );
}

class GameContent extends Component{

  render() {
    return (
      <div className="game-content">
        <div className="game-row">
          <Square onClick={()=>this.props.onClick(0)} value={this.props.squares[0]} />
          <Square onClick={()=>this.props.onClick(1)} value={this.props.squares[1]} />
          <Square onClick={()=>this.props.onClick(2)} value={this.props.squares[2]} />
        </div>
        <div className="game-row">
          <Square onClick={()=>this.props.onClick(3)} value={this.props.squares[3]} />
          <Square onClick={()=>this.props.onClick(4)} value={this.props.squares[4]} />
          <Square onClick={()=>this.props.onClick(5)} value={this.props.squares[5]} />
        </div>
        <div className="game-row">
          <Square onClick={()=>this.props.onClick(6)} value={this.props.squares[6]} />
          <Square onClick={()=>this.props.onClick(7)} value={this.props.squares[7]} />
          <Square onClick={()=>this.props.onClick(8)} value={this.props.squares[8]} />
        </div>
      </div>
    );
  }
}

class GameBoard extends Component {

  render() {
    return (
      <div className="game-board">
        <h1>Tic-Tac-Toe</h1>
        <GameContent onClick={this.props.onClick} squares={this.props.squares}/>
      </div>

    );
  }
}

class NextPlayer extends Component{
  render() {
    const info = this.props.result ? `The winner is ${this.props.result}!`: `The next player is ${this.props.player}`;
    console.log(this.props);
    return (
      <div className="info-header">
        {info}
      </div>
    );

  }
}

class GameMoves extends Component {
  render() {
    let desc = '';
    return (
      <ol>
        {
          this.props.moves.map((move, idx)=>{
            desc = idx === 0 ? 'Game start' : 'move '+idx;
            return (
              <li key={idx}>
                <button onClick={()=>this.props.jumpTo(idx)}>{desc}</button>
              </li>)
          })
        }
      </ol>
    );

  }
}

class GameInfo extends Component {
  render() {
    var player = this.props.xIsNext? 'X' : 'O';
    return (
      <div className="game-info">
        <NextPlayer result={this.props.result} player={player}/>
        <GameMoves jumpTo={this.props.jumpTo} moves={this.props.moves}/>
      </div>
    );
  }
}

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
    const squares = this.state.history[this.state.stepNumber];
    const result = checkWin(squares);
    return (
      <div className="game">
        <GameBoard onClick={(id)=>this.handleClick(id)} squares={squares}/>
        <GameInfo jumpTo={(id)=>this.jumpTo(id)} xIsNext={this.state.xIsNext} result={result} moves={this.state.history}/>
      </div>
    );
  }
}

function checkWin(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for(let i = 0, len = lines.length; i < len; i+= 1) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]) {
      return squares[a];
    }
  }

  return false;
}

export default App;
