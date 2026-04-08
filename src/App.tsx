import React, { useState, useEffect, useRef } from 'react';
import { getInitialState, placePiece, movePiece, removePiece } from './logic/gameState';
import type { GameState } from './logic/gameState';
import { getBestMove } from './logic/aiController';
import type { Difficulty } from './logic/aiController';
import { Board } from './components/Board';
import { HUD } from './components/HUD';
import { VictoryOverlay } from './components/VictoryOverlay';

function App() {
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  const [gameMode, setGameMode] = useState<'PvP' | 'PvAI'>('PvP');
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [moveCount, setMoveCount] = useState(0);
  const prevPhaseRef = useRef(gameState.phase);

  // Track move count — increment whenever a piece is placed/moved/removed
  useEffect(() => {
    const activePhases = ['PLACE', 'MOVE', 'REMOVE'];
    if (activePhases.includes(gameState.phase) && prevPhaseRef.current !== gameState.phase) {
      // phase changed = a move happened
      setMoveCount(c => c + 1);
    } else if (prevPhaseRef.current === gameState.phase && gameState.phase !== 'GAME_OVER') {
      // same phase but board changed (e.g. turn switched within PLACE)
      setMoveCount(c => c + 1);
    }
    prevPhaseRef.current = gameState.phase;
  }, [gameState]);

  // AI Turn handler
  useEffect(() => {
    if (gameMode === 'PvAI' && gameState.turn === 2 && gameState.phase !== 'GAME_OVER') {
      const timer = setTimeout(() => {
        const action = getBestMove(gameState, difficulty);
        if (action) {
          if (action.type === 'PLACE') {
             setGameState(placePiece(gameState, action.place));
          } else if (action.type === 'PLACE_REMOVE') {
             let tmp = placePiece(gameState, action.place);
             setGameState(removePiece(tmp, action.remove));
          } else if (action.type === 'MOVE') {
             setGameState(movePiece({...gameState, selectedPiece: action.from}, action.from, action.to));
          } else if (action.type === 'MOVE_REMOVE') {
             let tmp = movePiece({...gameState, selectedPiece: action.from}, action.from, action.to);
             setGameState(removePiece(tmp, action.remove));
          }
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [gameState, gameMode, difficulty]);

  const handleNodeClick = (index: number) => {
    if (gameState.turn === 2 && gameMode === 'PvAI') return;

    if (gameState.phase === 'PLACE') {
      setGameState(placePiece(gameState, index));
    } else if (gameState.phase === 'MOVE' && gameState.selectedPiece !== null) {
      setGameState(movePiece(gameState, gameState.selectedPiece, index));
    }
  };

  const handlePieceClick = (index: number) => {
    if (gameState.turn === 2 && gameMode === 'PvAI') return;

    if (gameState.phase === 'MOVE' && gameState.board[index] === gameState.turn) {
      setGameState({ ...gameState, selectedPiece: index });
    } else if (gameState.phase === 'REMOVE') {
      // Must be opponent piece
      const opponent = gameState.turn === 1 ? 2 : 1;
      if (gameState.board[index] === opponent) {
        setGameState(removePiece(gameState, index));
      }
    }
  };

  const resetGame = () => {
    setGameState(getInitialState());
    setMoveCount(0);
    prevPhaseRef.current = 'PLACE';
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      {gameState.phase === 'GAME_OVER' && gameState.winner && (
        <VictoryOverlay
          winner={gameState.winner}
          isAI={gameMode === 'PvAI'}
          moveCount={moveCount}
          onPlayAgain={resetGame}
        />
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Game Board Side */}
        <div className="flex justify-center flex-col items-center">
          <div className="mb-4 text-center">
            <h1 className="text-4xl font-headline font-extrabold text-primary mb-2 drop-shadow-md">
              Mühle Blast!
            </h1>
          </div>
          <Board 
            state={gameState} 
            onNodeClick={handleNodeClick} 
            onPieceClick={handlePieceClick} 
          />
        </div>

        {/* HUD Side */}
        <HUD 
          state={gameState}
          gameMode={gameMode}
          difficulty={difficulty}
          onSetGameMode={(mode) => {
            setGameMode(mode);
            resetGame();
          }}
          onSetDifficulty={setDifficulty}
          onReset={resetGame}
        />

      </div>
    </div>
  );
}

export default App;
