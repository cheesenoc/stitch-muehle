import { getValidMoves, movePiece, placePiece, removePiece, isPartOfMill } from './gameState';
import type { GameState, Player } from './gameState';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

// Evaluates the board for a given player
function evaluateBoard(state: GameState, player: Player): number {
  if (state.phase === 'GAME_OVER') {
    return state.winner === player ? 10000 : -10000;
  }
  
  const opponent = player === 1 ? 2 : 1;
  const myTotal = state.piecesInHand[player] + state.piecesOnBoard[player];
  const oppTotal = state.piecesInHand[opponent] + state.piecesOnBoard[opponent];
  
  // Count mills
  let myMills = 0;
  let oppMills = 0;
  
  for (let i = 0; i < 24; i++) {
    if (state.board[i] === player && isPartOfMill(state.board, i, player)) myMills++;
    if (state.board[i] === opponent && isPartOfMill(state.board, i, opponent)) oppMills++;
  }
  
  // Divide by 3 because each piece in a mill is counted
  myMills /= 3;
  oppMills /= 3;

  return (myTotal - oppTotal) * 100 + (myMills - oppMills) * 50;
}

// Helper to get all possible next states
function getNextStates(state: GameState): { state: GameState, action: any }[] {
  const nextStates: { state: GameState, action: any }[] = [];
  const player = state.turn;
  const opponent = player === 1 ? 2 : 1;

  if (state.phase === 'PLACE') {
    for (let i = 0; i < 24; i++) {
      if (state.board[i] === null) {
        let nState = placePiece(state, i);
        if (nState.phase === 'REMOVE') {
          for (let j = 0; j < 24; j++) {
            if (nState.board[j] === opponent) {
              const remState = removePiece(nState, j);
              if (remState !== nState) nextStates.push({ state: remState, action: { type: 'PLACE_REMOVE', place: i, remove: j } });
            }
          }
        } else {
          nextStates.push({ state: nState, action: { type: 'PLACE', place: i } });
        }
      }
    }
  } else if (state.phase === 'MOVE') {
    for (let i = 0; i < 24; i++) {
      if (state.board[i] === player) {
        const moves = getValidMoves(state, i);
        for (const move of moves) {
          let nState = movePiece({...state, selectedPiece: i}, i, move);
          if (nState.phase === 'REMOVE') {
             for (let j = 0; j < 24; j++) {
                if (nState.board[j] === opponent) {
                   const remState = removePiece(nState, j);
                   if (remState !== nState) nextStates.push({ state: remState, action: { type: 'MOVE_REMOVE', from: i, to: move, remove: j } });
                }
             }
          } else {
            nextStates.push({ state: nState, action: { type: 'MOVE', from: i, to: move } });
          }
        }
      }
    }
  }
  
  return nextStates;
}

// Minimax with alpha-beta pruning
function minimax(state: GameState, depth: number, alpha: number, beta: number, maximizingPlayer: boolean, evalPlayer: Player): number {
  if (depth === 0 || state.phase === 'GAME_OVER') {
    return evaluateBoard(state, evalPlayer);
  }

  const nextStates = getNextStates(state);
  
  // If no moves available, we lost
  if (nextStates.length === 0) {
    return maximizingPlayer ? -10000 : 10000;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const { state: childState } of nextStates) {
      const isStillMax = childState.turn === evalPlayer;
      const ev = minimax(childState, depth - 1, alpha, beta, isStillMax, evalPlayer);
      maxEval = Math.max(maxEval, ev);
      alpha = Math.max(alpha, ev);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const { state: childState } of nextStates) {
      const isStillMax = childState.turn === evalPlayer;
      const ev = minimax(childState, depth - 1, alpha, beta, isStillMax, evalPlayer);
      minEval = Math.min(minEval, ev);
      beta = Math.min(beta, ev);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function getBestMove(state: GameState, difficulty: Difficulty): any {
  const nextStates = getNextStates(state);
  if (nextStates.length === 0) return null;

  if (difficulty === 'EASY') {
    // Random move
    return nextStates[Math.floor(Math.random() * nextStates.length)].action;
  }
  
  if (difficulty === 'MEDIUM') {
    // Check if we can make a mill
    const winningMove = nextStates.find(ns => evaluateBoard(ns.state, state.turn) > evaluateBoard(state, state.turn) + 20);
    if (winningMove) return winningMove.action;
    // Otherwise random
    return nextStates[Math.floor(Math.random() * nextStates.length)].action;
  }
  
  if (difficulty === 'HARD') {
    let bestValue = -Infinity;
    let bestAction = nextStates[0].action;
    
    // Depth 3 for reasonable performance in JS
    for (const { state: childState, action } of nextStates) {
      const isStillMax = childState.turn === state.turn;
      const val = minimax(childState, 3, -Infinity, Infinity, isStillMax, state.turn);
      if (val > bestValue) {
        bestValue = val;
        bestAction = action;
      }
    }
    
    return bestAction;
  }
}
