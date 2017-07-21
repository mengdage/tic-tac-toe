import React, {Component} from 'react';

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
    const stepNumber = this.props.stepNumber;
    let desc = '';
    return (
      <ol>
        {
          this.props.moves.map((move, idx)=>{
            desc = idx === 0 ? 'Game start' : 'move '+idx;
            return (
              <li key={idx}>
                <button className={'btn-step ' + (stepNumber===idx? 'active':'')} onClick={()=>this.props.jumpTo(idx)}>{desc}</button>
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
        <GameMoves stepNumber={this.props.stepNumber} jumpTo={this.props.jumpTo} moves={this.props.moves}/>
      </div>
    );
  }
}

export default GameInfo;
