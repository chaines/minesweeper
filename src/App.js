import React from 'react';
import './App.scss';

import GameBoard from './components/GameBoard';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleGameBoardHeightChange = this.handleGameBoardHeightChange.bind(this);
    this.handleGameBoardWidthChange = this.handleGameBoardWidthChange.bind(this);
    this.handleMineCountChange = this.handleMineCountChange.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentWillMount() {
    this.setState({
      gameBoardWidth: 10,
      gameBoardHeight: 10,
      mineCount: 10
    });
  }

  reset() {
    this.refs.gameboard.resetGame();
  }

  handleGameBoardWidthChange(event) {
    this.setState({
      gameBoardWidth: event.target.value
    }, this.reset);
  }

  handleGameBoardHeightChange(event) {
    this.setState({
      gameBoardHeight: event.target.value
    }, this.reset);
  }

  handleMineCountChange(event) {
    this.setState({
      mineCount: event.target.value
    }, this.reset);
  }

  render() {

    //Generate option components:
    let gameBoardWidthOptions = [];
    for(let i = 4; i < 50; i++) {
        gameBoardWidthOptions.push(
            <option key={i} value={i}>{i}</option>
        );
    }

    let gameBoardHeightOptions = [];
    for(let i = 4; i < 100; i++) {
        gameBoardHeightOptions.push(
            <option key={i} value={i}>{i}</option>
        );
    }

    let mineCountOptions = [];
    for(let i=1; i < 100; i++) {
        mineCountOptions.push(
            <option key={i} value={i}>{i}</option>
        );
    }

    return <div className="App">
      <header>MineSweeper</header>
      <form className="options">
        {/*<label>Width: </label>
        <select value={this.state.gameBoardWidth} id="gameBoardWidthSelect" onChange={this.handleGameBoardWidthChange}>
          {gameBoardWidthOptions}
        </select>
        <label>Height:</label>
        <select value={this.state.gameBoardHeight} id="gameBoardHeightSelect" onChange={this.handleGameBoardHeightChange}>
          {gameBoardHeightOptions}
        </select>
        <label>Mine Count: </label>
        <select value={this.state.mineCount} id="mineCountSelect" onChange={this.handleMineCountChange}>
          {mineCountOptions}
        </select> */}

        <button type="button" onClick={this.reset}>Reset Game</button>
      </form>
      <GameBoard ref="gameboard" 
        width={this.state.gameBoardWidth} 
        height={this.state.gameBoardHeight} 
        mines={this.state.mineCount}>
        key={this.state.gameBoardHeight + '' + this.state.gameBoardWidth + '' + this.state.mineCount}
      </GameBoard>
    </div>
  }
}

export default App;
