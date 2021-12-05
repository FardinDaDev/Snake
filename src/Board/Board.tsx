import React, { SetStateAction, useState, useEffect } from 'react';
import { useInterval } from '../Lib/utils';
import './Board.css';

const DEFAULT_BOARD_SIZE = 15;

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}

const snakeObject = (board: number[][]) => {
  const rowSize = board.length;
  const colSize = board[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = board[startingRow][startingCol];
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  }
}

const Board = () => {
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(createBoard());
  const [snake, setSnake] = useState({ head: {}, tail: [] });
  const [snakeCell, setSnakeCell] = useState(new Set<[42]>());
  const [food, setFood] = useState({});
  const [direction, setDirection] = useState(Direction.RIGHT);

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      handleKeydown(e);
    });
  }, []);

  useInterval(() => {
    moveSnake();
  }, 150);

  const handleKeydown = (e: KeyboardEvent) => {
    const newDirection = getDirectionKey(e.key) as Direction;
    const isValidDirection = getDirectionKey(e.key) !== "";

    if (!isValidDirection) return;

    setDirection(newDirection);
    console.log(newDirection);
  }

  const moveSnake = () => {
    
  }

  return (
    <>
      <h1>Score: {score}</h1>
      <div className="board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => {
              const className = ``;
              return <div key={cellIdx} className={className}></div>;
            })}
          </div>
        ))}
      </div>
    </>
  )
}

/**
 * The function creates an NxN matrix board.
 */
function createBoard(boardSize: number = DEFAULT_BOARD_SIZE) {
  let counter = 1;
  const board = [];
  for (let row = 0; row < boardSize; row++) {
    const currentRow = [];
    for (let col = 0; col < boardSize; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
}

function getDirectionInCoords(coords: { row: 0, col: 0 }, direction: Direction) {
  switch (direction) {
    case "UP":
      return { row: coords.row, col: coords.col };
    case "DOWN":
      return { row: 10, col: 20 }
    case "LEFT":
      return {}
    case "RIGHT":
      return {}
  }
}

function getDirectionKey(key: string) {
  if (key === "ArrowUp") return Direction.UP;
  if (key === "ArrowRight") return Direction.RIGHT;
  if (key === "ArrowLeft") return Direction.LEFT;
  if (key === "ArrowDown") return Direction.DOWN;
  return '';
}

export default Board;
