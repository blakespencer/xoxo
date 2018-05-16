import { Map } from 'immutable';
import { combineReducers } from 'redux';
// const board = Map()

function streak(board, first, second, third) {
  let player0
  let player1
  let player2
  if (board.hasIn(first)) {
    player0 = board.getIn(first);
  }
  if (board.hasIn(second)) {
    player1 = board.getIn(second);
  }
  if (board.hasIn(third)) {
    player2 = board.getIn(third);
  }
  if (player0 === player1 && player0 === player2) {
    return player0;
  } else {
    return null;
  }
}

function winner(board) {
  for (let i = 0; i < 3; i++) {
    let result = streak(board, [i, 0], [i, 1], [i, 2]);
    if (result) {
      return result + " wins!";
    }
  }
  for (let i = 0; i < 3; i++) {
    let result = streak(board, [0, i], [1, i], [2, i]);
    if (result) {
      return result + " wins!";;
    }
  }
  let result = streak(board, [0, 0], [1, 1], [2, 2]);
  if (result) {
    return result + " wins!";
  }
  result = streak(board, [0, 2], [1, 1], [2, 0]);
  if (result) {
    return result + " wins!";
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board.hasIn([i, j])) {
        return null;
      }
    }
  }

  return 'Its a draw';
}

export const move = (player, arr) => {
  return {
    type: 'MOVE',
    position: arr,
    player,
  };
};



const turnReducer = (turn = 'X', action) => {
  switch (action.type) {
    case "MOVE":
      turn = turn === 'X' ? 'O' : 'X';
      return turn
    default:
      return turn
  }
}


const boardReducer = (board = Map(), action) => {
  switch (action.type) {
    case "MOVE":
      board = board.setIn(action.position, action.player);
      return board
    default:
      return board
  }
}


function reducer(state = {}, action) {
  const winBoard = boardReducer(state.board, action)
  const win = winner(winBoard)
  return {
    board: boardReducer(state.board, action),
    turn: turnReducer(state.turn, action),
    win
  }
}

export default reducer


// export default function reducer(state = { turn: 'X', board }, action) {
//   // TODO
//   switch (action.type) {
//     case 'MOVE':
//       const board = state.board.setIn(action.position, action.player);
//       const turn = state.turn === 'X' ? 'O' : 'X';
//       return { turn, board };
//     default:
//       return state;
//   }
// }

