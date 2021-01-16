/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

// starting board variable
const startingBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// to check for winning condition
// returns true if there is a winning condition, else false
const checkWin = (board) => {
  let row;
  let column;
  let matches = 0;
  // boolean that returns true is the player has won
  let isWin = false;
  // variable to store number of matching symbols needed to meet the winning condition.
  const matchesToWin = 2;

  // check each row for winning condition
  for (row = 0; row < board.length; row += 1) {
    for (column = 0; column < (board[row].length - 1); column += 1) {
      // if the value of board[row][column] is not empty && === value of the next column
      // add 1 to matchesToWin.
      if (board[row][column] !== '' && board[row][column] === board[row][column + 1]) {
        matches += 1;
        console.log(matches);
      }
    }

    // stop checking other rows if the current row has the wining condition
    if (matches === matchesToWin) {
      isWin = true;
    } else {
      // reset matches to zero to check for next row
      matches = 0;
    }
  }

  // check each column for winning condition
  for (column = 0; column < board.length; column += 1) {
    for (row = 0; row < (board[column].length - 1); row += 1) {
      // if the value of board[row][column] is not empty && === value in the next row
      // add 1 to matchesToWin.
      if (board[row][column] !== '' && board[row][column] === board[row + 1][column]) {
        matches += 1;
      }
    }

    // stop checking other columns if the current row has the wining condition
    if (matches === matchesToWin) {
      isWin = true;
    } else {
      // reset matches to 0 to check for next column
      matches = 0;
    }
  }

  // check diagonally right for winning condition
  for (column = 0; column < (board.length - 1); column += 1) {
    for (row = 0; row < (board[column].length - 1); row += 1) {
      const innerColumn = row;
      // if the value of board[row][innerColumn] is not empty
      // && === value of board[row+1][innerColumn+1]
      // add 1 to matchesToWin.
      if (board[row][innerColumn] !== '' && board[row][innerColumn] === board[row + 1][innerColumn + 1]) {
        matches += 1;
      }
    }

    if (matches === matchesToWin) {
      isWin = true;
    } else {
      // reset matches to 0
      matches = 0;
    }
  }

  // check diagonally left for winning condition
  for (row = 0; row < (board.length - 1); row += 1) {
    const innerColumn = (board.length - 1 - row);
    // if the value of board[row][innerColumn] is not empty
    // && === value of board[row+1][innerColumn-1]
    // add 1 to matchesToWin.
    if (board[row][innerColumn] !== '' && board[row][innerColumn] === board[row + 1][innerColumn - 1]) {
      matches += 1;
      console.log('adding matches');
      console.log(`matches ${matches}`);
    }
  }

  if (matches === matchesToWin) {
    isWin = true;
  } else {
    // reset matches to 0
    matches = 0;
  }

  return isWin;
};

// resets a game
const handleResetButtonClick = (setBoard, setWinningPlayer) => function () {
  console.log('resetting..');

  setBoard(
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  );

  setWinningPlayer('none');
};

// component for reset button
function ResetButton(props) {
  const { onClick } = props;
  return (
    <button onClick={onClick}>reset game</button>
  );
}

// component for the tic tac toe board
function TicTacToeBoard() {
  const [currentBoard, setBoard] = useState(startingBoard);
  const [currentPlayer, setPlayer] = useState('X');
  const [winningPlayer, setWinningPlayer] = useState('none');

  // function to update the current board with the player who cliked on the square
  // and toggle to the next player
  const squareClick = (columnIndex, rowIndex) => {
    console.log('an iteration of square click');
    // see if the clicked square has been clicked on before
    if (currentBoard[rowIndex][columnIndex] === '') {
      // alter the board, set that square with the current player symbol
      currentBoard[rowIndex][columnIndex] = currentPlayer;

      // set the updated state of the board
      setBoard(currentBoard);

      // this line will run before the next iteration of the whole TicTacToe component
      // caused by setBoard()
      console.log(currentBoard);

      // check if the current play is a winning play
      const isWinningPlay = checkWin(currentBoard);

      // set the winner if it is a winner play, else find the next play
      if (isWinningPlay === true) {
        setWinningPlayer(currentPlayer);
      } else {
        // find the next player
        // eslint-disable-next-line no-lonely-if
        if (currentPlayer === 'X') {
          setPlayer('O');
        } else {
          setPlayer('X');
        }
      }
    }
  };

  // build the squares of the tic tac toe
  const buildColumnSquares = (row, rowIndex) => {
    const columnSquares = row.map((column, columnIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`col_${columnIndex}`} className="col-4 column">
        <div className="square">
          <div
            className="content"
            onClick={() => {
              squareClick(columnIndex, rowIndex);
            }}
          >
            {column}
          </div>
        </div>
      </div>
    ));

    return columnSquares;
  };

  // returns an updated board
  const updatedBoard = currentBoard.map((row, rowIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`row_${rowIndex}`} className="row">
      {buildColumnSquares(row, rowIndex)}
    </div>
  ));

  return (
    <div className="container">
      { updatedBoard }
      {/* <button onClick={handleResetButtonClick(setBoard, setWinningPlayer)}>reset</button> */}
      <ResetButton onClick={handleResetButtonClick(setBoard, setWinningPlayer)} />
      <p>{`Winner Player: ${winningPlayer}`}</p>
    </div>
  );
}

// component for the app template
export default function App() {
  return (
    <div className="row">
      <div className="col-4">
        <TicTacToeBoard />
      </div>
    </div>
  );
}
