export type Player = 1 | 2;
export type Phase = 'PLACE' | 'MOVE' | 'REMOVE' | 'GAME_OVER';

export interface GameState {
  board: (Player | null)[]; // 24 positions
  turn: Player;
  phase: Phase;
  piecesInHand: { 1: number; 2: number };
  piecesOnBoard: { 1: number; 2: number };
  selectedPiece: number | null;
  millFormingPiece: number | null; // Track who caused the remove phase
  winner: Player | null;
}

export const MILLS = [
  // Outer
  [0, 1, 2], [2, 3, 4], [4, 5, 6], [0, 7, 6],
  // Middle
  [8, 9, 10], [10, 11, 12], [12, 13, 14], [8, 15, 14],
  // Inner
  [16, 17, 18], [18, 19, 20], [20, 21, 22], [16, 23, 22],
  // Crosses
  [1, 9, 17], [3, 11, 19], [5, 13, 21], [7, 15, 23]
];

export const ADJACENCY: { [key: number]: number[] } = {
  0: [1, 7], 1: [0, 2, 9], 2: [1, 3], 3: [2, 4, 11], 4: [3, 5], 5: [4, 6, 13], 6: [5, 7], 7: [0, 6, 15],
  8: [9, 15], 9: [8, 10, 1, 17], 10: [9, 11], 11: [10, 12, 3, 19], 12: [11, 13], 13: [12, 14, 5, 21], 14: [13, 15], 15: [8, 14, 7, 23],
  16: [17, 23], 17: [16, 18, 9], 18: [17, 19], 19: [18, 20, 11], 20: [19, 21], 21: [20, 22, 13], 22: [21, 23], 23: [16, 22, 15]
};

export function getInitialState(): GameState {
  return {
    board: Array(24).fill(null),
    turn: 1,
    phase: 'PLACE',
    piecesInHand: { 1: 9, 2: 9 },
    piecesOnBoard: { 1: 0, 2: 0 },
    selectedPiece: null,
    millFormingPiece: null,
    winner: null
  };
}

export function isPartOfMill(board: (Player | null)[], index: number, player: Player): boolean {
  return MILLS.some(mill => mill.includes(index) && mill.every(pos => board[pos] === player));
}

export function canRemovePiece(board: (Player | null)[], index: number, targetPlayer: Player): boolean {
  if (board[index] !== targetPlayer) return false;
  
  // If piece is not in a mill, it can be removed
  if (!isPartOfMill(board, index, targetPlayer)) return true;
  
  // Custom rule: if ALL opponent pieces are in a mill, we can remove one from a mill
  const allInMill = board.every((p, i) => {
    if (p !== targetPlayer) return true;
    return isPartOfMill(board, i, targetPlayer);
  });
  
  return allInMill;
}

export function getValidMoves(state: GameState, position: number): number[] {
  if (state.board[position] !== state.turn) return [];
  
  const canFly = state.piecesInHand[state.turn] === 0 && state.piecesOnBoard[state.turn] === 3;
  
  if (canFly) {
    return state.board.map((p, i) => p === null ? i : -1).filter(i => i !== -1);
  } else {
    return ADJACENCY[position].filter(adj => state.board[adj] === null);
  }
}

export function checkWinCondition(state: GameState): GameState {
  const newState = { ...state };
  
  // A player loses if they have < 3 pieces (only after placement phase)
  const p1Total = newState.piecesInHand[1] + newState.piecesOnBoard[1];
  const p2Total = newState.piecesInHand[2] + newState.piecesOnBoard[2];
  
  const isPlacementFinished = newState.piecesInHand[1] === 0 && newState.piecesInHand[2] === 0;

  if (isPlacementFinished) {
    if (p1Total < 3) {
      newState.winner = 2;
      newState.phase = 'GAME_OVER';
      return newState;
    }
    if (p2Total < 3) {
      newState.winner = 1;
      newState.phase = 'GAME_OVER';
      return newState;
    }
  }

  // A player also loses if it's their turn and they have no valid moves
  if (isPlacementFinished && newState.phase !== 'GAME_OVER') {
    const currentPlayer = newState.turn;
    const canFly = newState.piecesOnBoard[currentPlayer] === 3;
    
    let hasMove = false;
    if (canFly) {
      hasMove = newState.board.includes(null);
    } else {
      for (let i = 0; i < 24; i++) {
        if (newState.board[i] === currentPlayer) {
          if (ADJACENCY[i].some(adj => newState.board[adj] === null)) {
            hasMove = true;
            break;
          }
        }
      }
    }

    if (!hasMove) {
      newState.winner = currentPlayer === 1 ? 2 : 1;
      newState.phase = 'GAME_OVER';
    }
  }

  return newState;
}

export function placePiece(state: GameState, index: number): GameState {
  if (state.phase !== 'PLACE' || state.board[index] !== null) return state;
  
  const newState = {
    ...state,
    board: [...state.board],
    piecesInHand: { ...state.piecesInHand, [state.turn]: state.piecesInHand[state.turn] - 1 },
    piecesOnBoard: { ...state.piecesOnBoard, [state.turn]: state.piecesOnBoard[state.turn] + 1 },
  };
  newState.board[index] = state.turn;
  
  if (isPartOfMill(newState.board, index, state.turn)) {
    newState.phase = 'REMOVE';
    return newState;
  }
  
  newState.turn = state.turn === 1 ? 2 : 1;
  // Check if placement phase ends (both have 0 in hand)
  if (newState.piecesInHand[1] === 0 && newState.piecesInHand[2] === 0 && newState.phase === 'PLACE') {
    newState.phase = 'MOVE';
  }
  return checkWinCondition(newState);
}

export function movePiece(state: GameState, from: number, to: number): GameState {
  if (state.phase !== 'MOVE' || state.board[from] !== state.turn || state.board[to] !== null) return state;
  
  const validMoves = getValidMoves(state, from);
  if (!validMoves.includes(to)) return state;
  
  const newState = { ...state, board: [...state.board] };
  newState.board[from] = null;
  newState.board[to] = state.turn;
  newState.selectedPiece = null;
  
  if (isPartOfMill(newState.board, to, state.turn)) {
    newState.phase = 'REMOVE';
    return newState;
  }
  
  newState.turn = state.turn === 1 ? 2 : 1;
  return checkWinCondition(newState);
}

export function removePiece(state: GameState, index: number): GameState {
  if (state.phase !== 'REMOVE') return state;
  const opponent = state.turn === 1 ? 2 : 1;
  
  if (!canRemovePiece(state.board, index, opponent)) return state;
  
  const newState = {
    ...state,
    board: [...state.board],
    piecesOnBoard: { ...state.piecesOnBoard, [opponent]: state.piecesOnBoard[opponent] - 1 },
  };
  newState.board[index] = null;
  
  newState.turn = opponent;
  newState.phase = newState.piecesInHand[1] > 0 || newState.piecesInHand[2] > 0 ? 'PLACE' : 'MOVE';
  
  return checkWinCondition(newState);
}
