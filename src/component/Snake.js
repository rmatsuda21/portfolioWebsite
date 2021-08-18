import { randomInt } from "mathjs";
import { Component } from "react";
import '../stylesheets/snake.css';

class Snake extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeout: 150,
            gameOver: false,
            boardSize: { width: 20, height: 10 },
            cellSize: 30,
            snake: [],
            food: [],
            direction: 0,
            directionVal: [[1,0],[0,-1],[-1,0],[0,1]],
            timerID: 0,
            key: 0,
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    init() {
        var snake = [];
        for(var i=10;i>=0;--i) {
            snake.push({ x: i, y: 1 });
        }
        var food = [];
        food.push({ x: 5, y: 5 });
        this.setState({ food, snake });
    }

    reset() {
        var snake = [];
        for(var i=10;i>=0;--i) {
            snake.push({ x: i, y: 1 });
        }
        var food = [];
        food.push({ x: 5, y: 5 });

        this.setState({ food, 
                        snake, 
                        gameOver: false, 
                        direction: 0,
                        timeout: 150 });
    }

    handleKeyDown(e) {
        // console.log(e.keyCode);
        this.setState({key: e.keyCode});
        var direction = this.state.direction;
        switch(e.keyCode) {
            case 37:
                direction = (direction === 0 ? 0 : 2);
                break;
            case 38:
                direction = (direction === 3 ? 3 : 1);
                break;
            case 39:
                direction = (direction === 2 ? 2 : 0);
                break;
            case 40:
                direction = (direction === 1 ? 1 : 3);
                break;
            case 32:
                this.state.gameOver && this.reset();
                direction = 0;
                break;
            default:
        }
        this.setState({direction});
    }

    componentDidMount() {
        this.gameLoop();
        window.addEventListener('keydown', this.handleKeyDown);
        this.init();
    }

    componentWillUnmount() {
        clearTimeout(this.state.timerID);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    moveSnake() {
        var snake = this.state.snake;
        var prevPartX = snake[0].x;
        var prevPartY = snake[0].y;

        this.moveHead();

        for(var i=1;i<snake.length;++i) {
            var tmpX = snake[i].x;
            var tmpY = snake[i].y;
            snake[i].x = prevPartX;
            snake[i].y = prevPartY;
            prevPartX = tmpX;
            prevPartY = tmpY;
        }

        this.setState({snake});
    }

    moveHead() {
        var snake = this.state.snake;
        // console.log(this.state.directionVal[this.state.direction]);
        snake[0].x += this.state.directionVal[this.state.direction][0];
        snake[0].y += this.state.directionVal[this.state.direction][1];

        // Check for lose state
        if(snake[0].x < 0 || snake[0].x > this.state.boardSize.width || snake[1].y < 0 || snake[1].y > this.state.boardSize.height)
            this.setState({gameOver: true});
        this.setState({snake});
    }

    isOverlap(p1, p2) {
        return p1.x === p2.x && p1.y === p2.y;
    }

    eatFood(index) {
        var snake = this.state.snake;
        var food = this.state.food;

        snake.push({x:food[index].x, y:food[index].y});
        
        var newFood = {x: randomInt(0, this.state.boardSize.width), y: randomInt(0, this.state.boardSize.height)};

        while(this.isOverlap(snake[0], newFood)) {
            newFood = {x: randomInt(0, this.state.boardSize.width), y: randomInt(0, this.state.boardSize.height)};
        }

        food[index] = newFood;
        
        var timeout = this.state.timeout - 10;

        this.setState({ snake, food, timeout });
    }

    checkCollisions() {
        const snake = this.state.snake;
        const food = this.state.food;

        for(var i=1; i<snake.length; ++i) {
            if(this.isOverlap(snake[i], snake[0]))
                this.setState({ gameOver: true });
        }
        for(i=0; i<food.length; ++i) {
            if(this.isOverlap(food[i], snake[0]))
                this.eatFood(i);
        }
    }

    gameLoop() {
        var timerID = setTimeout(() => {
            if(!this.state.gameOver) {
                this.moveSnake();
                this.checkCollisions();
            }

            this.gameLoop();
        }, this.state.timeout);
        this.setState({timerID});
    }

    render() {
        if(this.state.gameOver) {
            return(
                <div style={{flexGrow:1}}>
                    <h1 style={{textAlign:'center'}}>GAME OVER</h1>
                    <h4 style={{textAlign:'center'}}>Press Space to restart</h4>
                </div>
            )
        }
        
        const snake = this.state.snake.map((snakeComp, index) => {
            const cellSize = this.state.cellSize;
            return (
            <div key={index} style={{position: "absolute",
                         left: `${snakeComp.x*cellSize}px`,
                         top: `${snakeComp.y*cellSize}px`, 
                         backgroundColor:'white', 
                         height: `${cellSize}px`,
                         width: `${cellSize}px`}}/>)
        });

        const food = this.state.food.map((f, index) => {
            const cellSize = this.state.cellSize;
            return (
            <div key={'f'+index} style={{position: "absolute",
                         left: `${f.x*cellSize}px`,
                         top: `${f.y*cellSize}px`, 
                         backgroundColor:'white', 
                         height: `${cellSize}px`,
                         width: `${cellSize}px`}}/>)
        });

        return (
            <div style={{gridTemplateColumns:`repeat(${10}, auto)`, width:'300px'}} className='gameBoard'>
                { snake }
                { food }
                {/* {this.state.key} */}
            </div>
    )}
}
export default Snake