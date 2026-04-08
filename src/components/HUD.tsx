import React from 'react';
import type { GameState } from '../logic/gameState';
import type { Difficulty } from '../logic/aiController';

interface HUDProps {
  state: GameState;
  gameMode: 'PvP' | 'PvAI';
  difficulty: Difficulty;
  onSetGameMode: (mode: 'PvP' | 'PvAI') => void;
  onSetDifficulty: (diff: Difficulty) => void;
  onReset: () => void;
}

export const HUD: React.FC<HUDProps> = ({ state, gameMode, difficulty, onSetGameMode, onSetDifficulty, onReset }) => {
  const isPlayingAI = gameMode === 'PvAI';

  let message = '';
  if (state.phase === 'GAME_OVER') {
    const winnerName = state.winner === 1 ? 'Player 1 (Blue)' : (isPlayingAI ? 'AI (Yellow)' : 'Player 2 (Yellow)');
    message = `Game Over! ${winnerName} Wins!`;
  } else if (state.phase === 'REMOVE') {
    const currentName = state.turn === 1 ? 'Player 1 (Blue)' : (isPlayingAI ? 'AI (Yellow)' : 'Player 2 (Yellow)');
    message = `${currentName} got a MILL! Remove an opponent's piece!`;
  } else if (state.phase === 'PLACE') {
    const currentName = state.turn === 1 ? 'Player 1 (Blue)' : (isPlayingAI ? 'AI (Yellow)' : 'Player 2 (Yellow)');
    message = `${currentName}'s Turn: Place a piece. (${state.piecesInHand[state.turn]} left)`;
  } else if (state.phase === 'MOVE') {
    const currentName = state.turn === 1 ? 'Player 1 (Blue)' : (isPlayingAI ? 'AI (Yellow)' : 'Player 2 (Yellow)');
    const canFly = state.piecesOnBoard[state.turn] === 3;
    message = `${currentName}'s Turn: Move a piece.${canFly ? ' FLYING MODE on!' : ''}`;
  }

  const p1Classes = state.turn === 1 ? 'bg-primary text-on-primary ring-4 ring-ink comic-shadow' : 'bg-surface-highest text-on-surface opacity-70';
  const p2Classes = state.turn === 2 ? 'bg-secondary text-ink ring-4 ring-ink comic-shadow' : 'bg-surface-highest text-on-surface opacity-70';

  return (
    <div className="w-full max-w-md mx-auto my-4 flex flex-col gap-4 z-50">
      
      {/* Speech Bubble */}
      <div className="relative surface-container-lowest comic-border p-4 rounded-xl text-center shadow-comic mb-4">
        {state.phase === 'REMOVE' && (
          <div className="absolute -top-4 -left-4 text-4xl transform -rotate-6 z-10 text-tertiary font-headline font-extrabold drop-shadow-md">
            BAM!
          </div>
        )}
        <h2 className="text-xl font-bold font-headline">{message}</h2>
        <div className="absolute -bottom-3 left-1/2 -ml-3 w-6 h-6 surface-container-lowest comic-border transform rotate-45 border-t-0 border-l-0"></div>
      </div>

      {/* Players Row */}
      <div className="flex justify-between items-center px-4">
        <div className={`comic-border px-4 py-2 rounded-xl transition-all duration-300 font-bold ${p1Classes}`}>
          Player 1
        </div>
        <div className={`comic-border px-4 py-2 rounded-xl transition-all duration-300 font-bold ${p2Classes}`}>
          {isPlayingAI ? `AI: ${difficulty}` : 'Player 2'}
        </div>
      </div>

      {/* Settings Panel */}
      <div className="surface-container comic-border p-4 rounded-xl shadow-comic mt-6">
        <h3 className="font-headline font-bold mb-3 text-lg">Game Settings</h3>
        
        <div className="flex gap-2 mb-3">
          <button 
            className={`flex-1 py-2 font-bold rounded-full border-2 border-ink ${gameMode === 'PvP' ? 'bg-ink text-surface' : 'bg-surface hover:bg-surface-highest'}`}
            onClick={() => onSetGameMode('PvP')}
          >
            Human vs Human
          </button>
          <button 
            className={`flex-1 py-2 font-bold rounded-full border-2 border-ink ${gameMode === 'PvAI' ? 'bg-ink text-surface' : 'bg-surface hover:bg-surface-highest'}`}
            onClick={() => onSetGameMode('PvAI')}
          >
            Human vs AI
          </button>
        </div>

        {isPlayingAI && (
          <div className="flex gap-2 mb-4">
            <button 
              className={`flex-1 py-1 text-sm font-bold rounded-full border-2 border-ink ${difficulty === 'EASY' ? 'bg-primary-container text-ink' : 'bg-surface hover:bg-surface-highest'}`}
              onClick={() => onSetDifficulty('EASY')}
            >
              Easy
            </button>
            <button 
              className={`flex-1 py-1 text-sm font-bold rounded-full border-2 border-ink ${difficulty === 'MEDIUM' ? 'bg-secondary-container text-ink' : 'bg-surface hover:bg-surface-highest'}`}
              onClick={() => onSetDifficulty('MEDIUM')}
            >
              Medium
            </button>
            <button 
              className={`flex-1 py-1 text-sm font-bold rounded-full border-2 border-ink ${difficulty === 'HARD' ? 'bg-tertiary-container text-ink' : 'bg-surface hover:bg-surface-highest'}`}
              onClick={() => onSetDifficulty('HARD')}
            >
              Hard
            </button>
          </div>
        )}

        <button 
          className="w-full bg-tertiary text-white py-3 rounded-xl font-bold font-headline text-lg hover:bg-tertiary-dim active:scale-95 transition-transform border-4 border-ink shadow-comic"
          onClick={onReset}
        >
          Restart Game
        </button>
      </div>

    </div>
  );
};
