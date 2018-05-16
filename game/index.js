import { Map } from 'immutable';
let board = Map();

function streak(board, first, second, third) {
  const player0 = board[first[0]][first[1]];
  const player1 = board[second[0]][second[1]];
  const player2 = board[third[0]][third[1]];
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
      return result;
    }
  }
  for (let i = 0; i < 3; i++) {
    let result = streak(board, [0, i], [1, i], [2, i]);
    if (result) {
      return result;
    }
  }
  let result = streak(board, [0, 0], [1, 1], [2, 2]);
  if (result) {
    return result;
  }
  result = streak(board, [0, 2], [1, 1], [2, 0]);
  if (result) {
    return result;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board.hasIn([i, j])) {
        return null;
      }
    }
  }

  return 'draw';
}

export const move = (player, arr) => {
  return {
    type: 'MOVE',
    position: arr,
    player,
  };
};

export default function reducer(state = { turn: 'X', board }, action) {
  // TODO
  switch (action.type) {
    case 'MOVE':
      const board = state.board.setIn(action.position, action.player);
      const turn = state.turn === 'X' ? 'O' : 'X';
      return { turn, board };
    default:
      return state;
  }
}
