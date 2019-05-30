import React from 'react';
import Engine from '../engine';
import Tile from './Tile';
import './GameBoard.scss';

class GameBoard extends React.Component {
    
    constructor(props) {
        super(props);
        this.resetGame = this.resetGame.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this.resetGame();
    }


    resetGame() {
        console.log('resetting');
        this.engine = new Engine(this.props.width, this.props.height, this.props.mines);
        this.setState({
            game: this.engine.level,
            gameState: this.engine.state
        });
    }

    generateBoard() {
        let board = [];
        const game = this.engine.game;
        for(let i = 0; i < this.props.height; i++) {
            for(let j = 0; j < this.props.width; j++) {
                let tileProps = {
                    mine: game[i][j].mine,
                    hit: game[i][j].hit,
                    covered: game[i][j].covered,
                    flagged: game[i][j].flagged,
                    question: game[i][j].question,
                    adjacent: game[i][j].adjacent,
                    onTileClick: this._handleClick,
                    x: j,
                    y: i
                }
                
                board.push(<Tile key={i + '' + j} {...tileProps}></Tile>);
            }
        }
        return board;
    }

    generateHeader() {
        if(this.engine.gameState == 'win') {
            return 'You win';
        } else if(this.engine.gameState == 'lose') {
            return 'You lose';
        } else if(this.engine.gameState == 'waiting') {
            return 'Click to Start';
        }
    }

    render() {
        //Inlining the dynamic width
        let style = {
            width: this.props.width*16 + 'px'
        }
        return <div className="GameBoard" style={style}>
        <header>
            {this.generateHeader()}
        </header>
        {this.generateBoard()}</div>
    }

    _handleClick(x, y, right) {
        if(right) {
            this.engine.squareMark(x, y);
        } else {
            this.engine.squareClick(x, y);
        }
        this.setState({
            game: this.engine.game,
            gameState: this.engine.gameState
        });
    }
}

export default GameBoard;