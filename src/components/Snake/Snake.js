import "./Snake.css";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
let audio = new Audio("sweep.wav");
const SNAKE_BLOCK = 10;
const changeDirection = (event, setSnakeDirection) => {
    switch (event.key) {
        case "ArrowLeft": {
            setSnakeDirection("left");
            break;
        }
        case "ArrowRight": {
            setSnakeDirection("right");
            break;
        }
        case "ArrowUp": {
            setSnakeDirection("up");
            break;
        }
        case "ArrowDown": {
            setSnakeDirection("down");
            break;
        }
    }
};

const areColliding = (foodPosition = {}, snakePosition = {}) => {
    const snakeX = snakePosition.x;
    const snakeY = snakePosition.y;
    const foodPositionX = foodPosition.x;
    const foodPositionY = foodPosition.y;
    if (snakeX >= foodPositionX - SNAKE_BLOCK &&
        snakeX <= foodPositionX + SNAKE_BLOCK &&
        snakeY >= foodPositionY - SNAKE_BLOCK &&
        snakeY <= foodPositionY + SNAKE_BLOCK) {
        return true;
    }
    return false;
}

const SnakeGame = () => {
    const [playNow, setPlayNow] = useState(false);
    const [snakeDirection, setSnakeDirection] = useState("right");
    const gameBoard = useRef();
    const rootContainer = useRef();
    const [score, setScore] = useState(0);
    const [foodPosition, setFoodPostion] = useState({ x: 0, y: 0 });
    const [snakePosition, setSnakePosition] = useState({ x: 1, y: 1 });

    useEffect(() => {
        if (gameBoard && gameBoard.current) {
            const xPosition = Math.random() * (gameBoard.current.clientWidth - SNAKE_BLOCK) + SNAKE_BLOCK;
            const yPosition = Math.random() * (gameBoard.current.clientHeight - SNAKE_BLOCK) + SNAKE_BLOCK;
            setFoodPostion({ x: xPosition, y: yPosition })
        }
    }, [gameBoard, gameBoard.current])
    useEffect(() => {
        if (areColliding(foodPosition, snakePosition)) {
            setScore(score + 1);
            if (gameBoard && gameBoard.current) {
                rootContainer.current.focus();
                const xPosition = Math.random() * (gameBoard.current.clientWidth - SNAKE_BLOCK) + SNAKE_BLOCK;
                const yPosition = Math.random() * (gameBoard.current.clientHeight - SNAKE_BLOCK) + SNAKE_BLOCK;
                setFoodPostion({ x: xPosition, y: yPosition })
            }
            if(playNow) audio.play();
        }
    }, [snakePosition, foodPosition])
    return (
        playNow ? 
        (<div
            className="rootContainer"
            tabIndex="1"
            ref={rootContainer}
            onKeyDown={(e) => {
                changeDirection(e, setSnakeDirection);
            }}
        >
            <div className="score">Score {score}</div>
            <div ref={gameBoard} className="gameBoard">
                {gameBoard && gameBoard.current ? (
                    <Food
                        position={foodPosition}
                    />
                ) : (
                    <></>
                )}
                <Snake
                    direction={snakeDirection}
                    gameBoard={gameBoard}
                    setSnakeDirection={setSnakeDirection}
                    foodPosition={foodPosition}
                    increaseScore={() => { setScore(score + 1) }}
                    position={snakePosition}
                    setHeadPosition={setSnakePosition}
                    size={score}
                />
            </div>
        </div>) : <div className="playButton"><button onClick={() => { 
            setPlayNow(true);
            audio.play();
        }}>Play Now</button></div>
    );
};
const SNAKE_SPEED = 5;
const getHeadPosition = (direction, position) => {
    switch (direction) {
        case "left": {
            return { x: position.x - SNAKE_SPEED, y: position.y };
        }
        case "right": {
            return { x: position.x + SNAKE_SPEED, y: position.y };
        }
        case "up": {
            return { x: position.x, y: position.y - SNAKE_SPEED };
        }
        case "down": {
            return { x: position.x, y: position.y + SNAKE_SPEED };
        }
    }
}
const snakeMovement = (direction, position, gameBoard, setSnakeDirection, positions = [], setPositions) => {
    const snakeHead = positions[positions.length - 1];
    if (
        gameBoard &&
        gameBoard.current &&
        snakeHead.x >= gameBoard.current.clientWidth - SNAKE_BLOCK &&
        (direction == "left" || direction == "right")
    ) {
        setSnakeDirection("left");
    }
    if (
        gameBoard &&
        gameBoard.current &&
        snakeHead.x <= 0 &&
        (direction == "left" || direction == "right")
    ) {
        setSnakeDirection("right");
    }
    if (
        gameBoard &&
        gameBoard.current &&
        snakeHead.y <= 0 &&
        (direction == "up" || direction == "down")
    ) {
        setSnakeDirection("down");
    }
    if (
        gameBoard &&
        gameBoard.current &&
        snakeHead.y >= gameBoard.current.clientHeight - SNAKE_BLOCK &&
        (direction == "up" || direction == "down")
    ) {
        setSnakeDirection("up");

    }
    const newPositions = positions.map((value, index, arr) => {
        if (index == arr.length - 1) {
            return getHeadPosition(direction, positions[positions.length - 1]);
        }
        else return arr[index + 1];
    })
    setPositions(newPositions);
};

const newBlockPosition = (position, direction) => {
    const offset = SNAKE_BLOCK
    switch (direction) {
        case "left": {
            return { x: position.x + offset, y: position.y }
        }
        case "right": {
            return { x: position.x - offset, y: position.y }
        }
        case "up": {
            return { x: position.x, y: position.y + offset }
        }
        case "down": {
            return { x: position.x, y: position.y - offset }
        }
    }
}
const Snake = ({ direction, gameBoard, setSnakeDirection, position, setPosition, size, setHeadPosition }) => {
    const [positions, setPositions] = useState([position]);
    useEffect(() => {
        setTimeout(() => {
            snakeMovement(direction, position, gameBoard, setSnakeDirection, positions, setPositions);
            setHeadPosition(positions[positions.length - 1]);
        }, 20);
    }, [position, positions]);
    useEffect(() => {
        setPositions(size > positions.length ? new Array(newBlockPosition(positions[0], direction), ...positions) : new Array(...positions))
    }, [size]);
    return (
        <div className="snake">
            {positions.map((curr, index) => {
                return (
                    <div
                        className="snakeHead"
                        key={index}
                        style={{
                            left: curr.x,
                            top: curr.y,
                        }}
                    >
                    </div>)
            })}</div>
    );
};

const Food = ({ position }) => {
    return <div className="food" style={{ left: position.x, top: position.y }}></div>;
};

export default SnakeGame;
