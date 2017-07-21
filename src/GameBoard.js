import React, {Component} from 'react';

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

export default GameBoard;
