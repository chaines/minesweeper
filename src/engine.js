class Engine {
    constructor(width, height, mines) {
        this.width = width;
        this.height = height;
        this.mines = mines;
        this.mineTiles = [];
        this.clearTiles = [];
        this.flaggedTiles = [];
        this.uncoveredTiles = [];
        this.gameState = 'waiting';
        this.game = [];
        this.newGame();
    }

    newGame() {
        for(let y = 0; y < this.height; y++) {
            this.game[y] = [];
            for(let x = 0; x < this.width; x++) {
                this.game[y][x] = {
                    mine: false,
                    hit: false,
                    covered: true,
                    flagged: false,
                    question: false,
                    adjacent: 0
                }
                this.clearTiles.push(this.gridToNum([y,x]));
            }
        }
    }

    //create the bombs, taking initial click cell as a parameter (to ensure it's not that cell)
    makeBombs(x, y) {
        for(let i = 0; i < this.mines; i ++) {
            let newBomb = this.clearTiles[Math.floor(Math.random() * this.clearTiles.length)];
            while (newBomb === this.gridToNum([y, x])) {
                newBomb = this.clearTiles[Math.floor(Math.random() * this.clearTiles.length)];
            }
            this.mineTiles.push(newBomb);
            this.clearTiles.splice(this.clearTiles.indexOf(newBomb), 1);
        }
        this.mineTiles.forEach((num) => {
            const coords = this.numToGrid(num);
            this.game[coords[0]][coords[1]].mine = true;
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {
                    if((i||j) 
                      && this.game[coords[0] + i] 
                      && this.game[coords[0] + i][coords[1] + j]) {
                        this.game[coords[0] + i][coords[1] + j].adjacent++;
                    }
                }
            }
        });
    }

    gridToNum(grid) {
        return grid[0]*this.width + grid[1];
    }

    numToGrid(num) {
        return [Math.floor(num/this.width), Math.floor(num%this.width)];
    }
    checkTiles(x, y) {
        const cell = this.game[y][x];
        if(!cell.covered) {
            return;
        } else if(cell.mine) {
            this.gameState = 'lose';
            cell.hit = true;
            this.revealMines();
        } else if(cell.adjacent) {
            cell.covered = false;
            cell.flagged = false;
            cell.question = false;
            this.uncoveredTiles.push(this.gridToNum([y, x]));
        } else {
            cell.covered = false;
            cell.flagged = false;
            cell.question = false;
            this.uncoveredTiles.push(this.gridToNum([y, x]));
            for(let _x = x - 1; _x <= x+1; _x++) {
                for(let _y = y -1; _y <= y+1; _y++) {
                    if(!(x===_x && y===_y)
                      && this.game[_y]
                      && this.game[_y][_x]
                      && this.game[_y][_x].covered) {
                        this.checkTiles(_x, _y);
                    }
                }
            }
        }

    }


    checkWin() {
        console.log(this);
        if(this.uncoveredTiles.length === this.width * this.height - this.mines) {
            //We win
            this.win();
        }
    }

    win() {
        const flag = (function(num) {
            const cell = this.numToGrid(num);
            this.game[cell[0]][cell[1]].flagged = true;
        }).bind(this);
        this.mineTiles.forEach(flag);
        this.gameState = 'win';
    }


    revealMines() {
        const reveal = (function(num) {
            const cell = this.numToGrid(num);
            this.game[cell[0]][cell[1]].covered = false;
        }).bind(this);
        this.mineTiles.forEach(reveal);
        this.flaggedTiles.forEach(reveal);
    }

    squareClick(x, y) {
        if(this.game[y][x].flagged) {
            return;
        }
        switch(this.gameState) {
            case 'waiting':
                this.makeBombs(x, y);
                this.checkTiles(x, y);
                this.gameState = 'running';
                break;
            case 'lose':
            case 'win': 
                break;
            default:
                this.checkTiles(x, y);
                this.checkWin();
                break;
        }
    }
    squareMark(x, y) {
        if(this.gameState === 'win' || this.gameState === 'lose' || !this.game[y][x].covered)
            return;
        const num = this.gridToNum([y, x]);
        if(this.game[y][x].flagged) {
            this.game[y][x].flagged = false;
            this.game[y][x].question = true;
        } else if (this.game[y][x].question) {
            this.game[y][x].question = false;
            this.flaggedTiles.splice(this.flaggedTiles.indexOf(num), 1);
        } else {
            this.game[y][x].flagged = true;
            this.flaggedTiles.push(num);
        }
    }
}

export default Engine;