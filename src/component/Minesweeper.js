import { randomInt } from "mathjs";
import React, { Component } from "react";
import '../stylesheets/minesweeper.css';

import mine from '../icons/mine.png';
import flag from '../icons/flag.png';

export class Minesweeper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameOver: false,
            win: false,
            boardSize: { width: 10, height: 10 },
            windowSize: { width: 0, height: 0},
            cellSize: 30,
            board: [[0]],
            state: [[0]],
            flagNum: 0,
            correctFlagNum: 0,
            bombNum: 1,
            bombs: [],
            timerID: 0,
            timeout: 1000,
            time: 0,
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.resetGame = this.resetGame.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.container = React.createRef();
    }

    handleKeyDown(e) {
        switch(e.keyCode) {
            default:
        }
    }

    handleClick = (e, coord) => {
        console.log(e.target);
    }

    resetGame() {
        // Init board
        var board = []
        for (var i=0;i<this.state.boardSize.height;++i) {
            var line = []
            for (var j=0;j<this.state.boardSize.width;++j) {
                line.push(0)
            }
            board.push(line);
        }

        // Init revealed
        var state = []
        for (i=0;i<this.state.boardSize.height;++i) {
            line = []
            for (j=0;j<this.state.boardSize.width;++j) {
                line.push(0)
            }
            state.push(line);
        }

        function isEqual(arr1, arr2) {
            return arr1[0] === arr2[0] && arr1[1] === arr2[1];
        }

        function isValid (bombs, point) {
            for(var i=0;i<bombs.length;++i){
                var bomb = bombs[i];
                if(isEqual(bomb, point)) return false;
            };

            return true;
        }

        // Assign bombs
        var bombs = []
        for (i=0;i<this.state.bombNum;++i) {
            var x = randomInt(0, this.state.boardSize.width);
            var y = randomInt(0, this.state.boardSize.height);

            while(!isValid(bombs, [x, y])) {
                x = randomInt(0, this.state.boardSize.width);
                y = randomInt(0, this.state.boardSize.height);
            }

            bombs.push([x, y]);
        }

        const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]

        // Update board values based on bomb locations
        bombs.forEach(bomb => {
            board[bomb[1]][bomb[0]] = -1;
            dirs.forEach(dir => {
                var x = bomb[0] + dir[0];
                var y = bomb[1] + dir[1];

                if (x >= 0 && x < this.state.boardSize.width 
                    && y >= 0 && y < this.state.boardSize.height && board[y][x] !== -1) {
                        board[y][x] += 1;
                }
            })
        });

        this.setState({board, bombs, state, time: 0, flagNum: 0, correctFlagNum: 0, gameOver: false, win: false});
        this.gameLoop();
    }

    componentDidMount() {
        const w = this.container.current.offsetParent.clientWidth;
        const h = this.container.current.offsetParent.clientHeight;
        const bW = Math.floor(w/this.state.cellSize);
        const bH = Math.floor(h/this.state.cellSize)-1;

        this.setState({windowSize: { width: w, height: h }});

        this.resetGame();

        this.gameLoop();
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        clearTimeout(this.state.timerID);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    gameLoop() {
        var timerID = setTimeout(() => {
            if(!this.state.gameOver && !this.state.win) {
                this.gameLoop();
            }

            var time = this.state.time + 1;
            this.setState({time});
        }, this.state.timeout);
        this.setState({timerID});
    }

    reveal(i, j) {
        const { board, boardSize, bombs } = this.state;
        var { state } = this.state;

        i = Number(i);
        j = Number(j);

        if(board[i][j] === -1) {
            bombs.forEach(bomb => {
                state[bomb[1]][bomb[0]] = 1;
            });

            this.setState({gameOver: true, state});
            return;
        }

        if(board[i][j] > 0) {
            state[i][j] = 1;
            this.setState({state});
            return;
        }

        var que = [[i,j]];
        var visited = [];
        for (i=0;i<this.state.boardSize.height;++i) {
            var line = []
            for (j=0;j<this.state.boardSize.width;++j) {
                line.push(false)
            }
            visited.push(line);
        }
        
        while(que.length > 0) {
            var p = que.pop();

            state[p[0]][p[1]] = 1;

            if(p[0] > 0 && state[p[0]-1][p[1]] === 0) {
                if(board[p[0]-1][p[1]] > 0)
                    state[p[0]-1][p[1]] = 1
                else if(!visited[p[0]-1][p[1]]){
                    visited[p[0]-1][p[1]] = true;
                    que.push([p[0]-1,p[1]]);
                }
            }
            
            if(p[1] > 0 && state[p[0]][p[1]-1] === 0) {
                if(board[p[0]][p[1]-1] > 0)
                    state[p[0]][p[1]-1] = 1
                else if(!visited[p[0]][p[1]-1]){
                    visited[p[0]][p[1]-1] = true;
                    que.push([p[0],p[1]-1]);
                }
            }
            
            if(p[0] < boardSize.height-1 && state[p[0]+1][p[1]] === 0) {
                if(board[p[0]+1][p[1]] > 0)
                    state[p[0]+1][p[1]] = 1
                else if(!visited[p[0]+1][p[1]]){
                    visited[p[0]+1][p[1]] = true;
                    que.push([p[0]+1,p[1]]);
                }
            }
            
            if(p[1] < boardSize.width-1 && state[p[0]][p[1]+1] === 0) {
                if(board[p[0]][p[1]+1] > 0)
                    state[p[0]][p[1]+1] = 1
                else if(!visited[p[0]][p[1]+1]){
                    visited[p[0]][p[1]+1] = true;
                    que.push([p[0],p[1]+1]);
                }
            }
        }
    }

    flag(i, j) {
        function isEqual(arr1, arr2) {
            return arr1[0] === arr2[0] && arr1[1] === arr2[1];
        }

        function isBomb(p, bombs) {
            for(var i=0;i<bombs.length;++i)
                if(isEqual(bombs[i], p)) return true;

            return false;
        }

        const { bombNum, bombs } = this.state;
        var { state, correctFlagNum, flagNum, win } = this.state;

        i = Number(i);
        j = Number(j);

        // Set/Unset flag
        if(state[i][j] === 0) {
            state[i][j] = 2;
            flagNum++;
            if(isBomb([j,i], bombs)) correctFlagNum++;
        }
        else if(state[i][j] === 2) {
            state[i][j] = 0;
            flagNum--;
            if(isBomb([i,j], bombs)) correctFlagNum--;
        }

        // Check win condition
        if(bombNum === flagNum && bombNum === correctFlagNum) 
            win = true;

        this.setState({state, flagNum, correctFlagNum, win});
    }

    render() {
        const { board, boardSize, state } = this.state;

        const grid = [];
        for(var i=0;i<board.length;++i) {
            for(var j=0;j<board[i].length;++j) {
                if(state[i][j] === 0)
                    grid.push(
                        <div key={i + ' ' + j} 
                            className="cell" 
                            style={{backgroundColor:'white'}} 
                            x={i} y={j} 
                            onClick={
                                (e) => {this.reveal(e.target.getAttribute('x'), e.target.getAttribute('y'))}
                                }
                            onContextMenu={
                                (e) => {this.flag(e.target.getAttribute('x'), e.target.getAttribute('y'))}
                            }>
                        </div>);
                else if(state[i][j] === 1)
                    grid.push(
                        <div key={i + ' ' + j} 
                            className="revealed cell" 
                            style={{backgroundColor:'white'}} 
                            x={i} y={j} 
                            onClick={
                                (e) => {this.reveal(e.target.getAttribute('x'), e.target.getAttribute('y'))}
                                }
                            onContextMenu={
                                (e) => {this.flag(e.target.getAttribute('x'), e.target.getAttribute('y'))}
                            }>
                            {(state[i][j] === 1 && board[i][j] > 0) && board[i][j]}
                            {(state[i][j] === 1) && (board[i][j] === -1) && <img src={mine} alt='' style={{width:'80%', pointerEvents:'none'}}></img>}
                        </div>);
                else
                    grid.push(
                        <div key={i + ' ' + j} 
                            className="cell" 
                            style={{backgroundColor:'white'}} 
                            x={i} y={j} 
                            onContextMenu={
                                (e) => {this.flag(e.target.getAttribute('x'), e.target.getAttribute('y'))}
                            }>
                            {<img src={flag} alt='' style={{width:'80%', pointerEvents:'none'}}></img>}
                        </div>);
            }
        }

        const bombLeft = this.state.bombNum - this.state.flagNum;

        return (
            <div className='gameBoard' ref={this.container} onContextMenu={(e) => {e.preventDefault()}}>
                <div className='top'>
                    <div className='left'>
                        {bombLeft >= 0 && String(bombLeft).padStart(3, '0')}
                        {bombLeft < 0 && '-'+String(-(bombLeft)).padStart(2, '0')}
                    </div>
                    <div className='resetBtn' onClick={this.resetGame}>
                        {this.state.gameOver && "x("}
                        {this.state.win && ":D"}
                        {!(this.state.gameOver || this.state.win) && ":)"}
                    </div>
                    <div className='timer'>
                        {String(this.state.time).padStart(3,'0')}
                    </div>
                </div>
                <div className='grid' style={{ gridTemplate: `repeat(${boardSize.height}, 25px) / repeat(${boardSize.width}, 25px)` }}>
                    {grid}
                </div>
            </div>
        )
    }
}
export default Minesweeper;