import React, { useState, useEffect } from 'react'
import { useInterval } from '../Lib/utils';
import Blank from '../Images/blank.png'
import Snake from '../Images/snake.png'
import Food from '../Images/food.png'
import "./SnakeBoard.css"

const DEFAULT_BOARD_SIZE = 10;

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}

const SnakeBoard = () => {
  const grid: string[][] = [];
  for (let i = 0; i < DEFAULT_BOARD_SIZE; i++) {
    grid.push([]);
    for (let j = 0; j < DEFAULT_BOARD_SIZE; j++) {
      grid[i].push('blank');
    }
  }

  const [rows, setRows] = useState(grid);
  const [snake, setSnake] = useState([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [food, setFood] = useState(randomPosition());
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      handleKeydown(e);
    });
  }, []);


  const handleKeydown = (e: KeyboardEvent) => {
    const newDirection = getDirectionKey(e.key) as Direction;
    const isValidDirection = getDirectionKey(e.key) !== "";

    if (!isValidDirection) return;

    setDirection(newDirection);
  }

  const displaySnake = () => {
    const newGrid = grid;
    snake.forEach(cell => {
      newGrid[cell.x][cell.y] = 'snake'; //snake
    });
    newGrid[food.x][food.y] = 'food'; //food
    setRows(newGrid);
  }

  const moveSnake = () => {
    const newSnake = [];

    switch (direction) {
      case Direction.RIGHT:
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % DEFAULT_BOARD_SIZE });
        break;
      case Direction.LEFT:
        newSnake.push({ x: snake[0].x, y: (snake[0].y - 1 + DEFAULT_BOARD_SIZE) % DEFAULT_BOARD_SIZE });
        break;
      case Direction.UP:
        newSnake.push({ x: (snake[0].x - 1 + DEFAULT_BOARD_SIZE) % DEFAULT_BOARD_SIZE, y: snake[0].y })
        break;

      case Direction.DOWN:
        newSnake.push({ x: (snake[0].x + 1) % DEFAULT_BOARD_SIZE, y: snake[0].y });
        break;
    }
    snake.forEach(cell => {
      newSnake.push(cell);
    });

    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(randomPosition());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    displaySnake();
  }

  useInterval(moveSnake, 100);

  const displayRows = rows.map((row, rowIdx) => (
    <div key={rowIdx} className="row">
      {row.map((cellValue, cellIdx) => {
        switch (cellValue) {
          case 'blank':
            return <img key={cellIdx} src={Blank} />
          case 'snake':
            return <img key={cellIdx} src={Snake} />
          case 'food':
            return <img key={cellIdx} src={Food} />
        }
      })}
    </div>
  ));

  return (
    <>
      <h1 className="score">Score: {score}</h1>
      <div className="board">
        {displayRows}
      </div>
    </>
  )
}

function randomPosition(boardSize: number = DEFAULT_BOARD_SIZE) {
  const position = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize)
  };
  return position;
}

function getDirectionKey(key: string) {
  if (key === "ArrowUp") return Direction.UP;
  if (key === "ArrowRight") return Direction.RIGHT;
  if (key === "ArrowLeft") return Direction.LEFT;
  if (key === "ArrowDown") return Direction.DOWN;
  return '';
}

export default SnakeBoard;
