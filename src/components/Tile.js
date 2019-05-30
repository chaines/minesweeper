import React from 'react';
import './Tile.scss';

class Tile extends React.Component {
    constructor(props) {
        super(props)
        this._click = this._click.bind(this);
        this._rightClick = this._rightClick.bind(this);
    }
    render() {
        let classlist="tile";
        if(this.props.flagged) {
            classlist += ' tile--flagged';
            if(!this.props.covered && !this.props.mine) {
                classlist += ' tile--flagged-wrong';
            }
        }
        if(this.props.question) {
            classlist += ' tile--question';
            if(!this.props.covered && !this.props.mine) {
                classlist += ' tile--flagged-wrong'
            }
        }
        if(this.props.covered) {
            classlist += ' tile--covered';
        } else {
            if(this.props.hit) {
                classlist += ' tile--mine-hit';
            }
            if(this.props.mine) {
                classlist += ' tile--mine';
            }
            if(this.props.adjacent) {
                classlist += ' tile--checked-' + this.props.adjacent;
            }
        }

        return <div className={classlist}
                    onClick={this._click}
                    onContextMenu={this._rightClick}></div>
    }

    _click(e) {
        e.preventDefault();
        this.props.onTileClick(this.props.x, this.props.y, false);
    }

    _rightClick(e) {
        e.preventDefault();
        this.props.onTileClick(this.props.x, this.props.y, true);
    }
}

export default Tile;