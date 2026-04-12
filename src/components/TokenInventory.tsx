import React from 'react';
import type { GameState } from '../logic/gameState';

interface TokenInventoryProps {
  state: GameState;
  type: 'REMAINING' | 'CAPTURED';
}

export const TokenInventory: React.FC<TokenInventoryProps> = ({ state, type }) => {
  const isRemaining = type === 'REMAINING';

  const renderTokens = (player: 1 | 2) => {
    const count = isRemaining 
      ? state.piecesInHand[player] 
      : 9 - (state.piecesInHand[player] + state.piecesOnBoard[player]);
    
    const colorClass = player === 1 
      ? 'bg-gradient-to-br from-primary to-primary-container' 
      : 'bg-gradient-to-br from-secondary to-secondary-container';
    
    const symbol = player === 1 ? '✧' : '✦';
    const textColor = player === 1 ? 'text-on-primary' : 'text-ink';

    return (
      <div className="flex flex-wrap gap-2 items-center min-h-[40px]">
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={`${player}-${type}-${i}`}
            className={`w-8 h-8 rounded-full comic-border flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-300 animate-in fade-in zoom-in-50 ${colorClass} ${textColor}`}
          >
            {symbol}
          </div>
        ))}
        {count === 0 && (
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-surface-highest"></div>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full max-w-[500px] flex justify-between items-center px-4 py-2 bg-surface-lowest/50 rounded-2xl comic-border-light border-2 border-surface-highest transition-all duration-300 ${isRemaining ? 'mb-2' : 'mt-2'}`}>
      <div className="flex flex-col gap-1 w-[45%]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary opacity-70">
          {isRemaining ? 'Hand P1' : 'Captured P1'}
        </span>
        {renderTokens(1)}
      </div>
      
      <div className="h-8 w-px bg-surface-highest"></div>

      <div className="flex flex-col gap-1 w-[45%] text-right">
        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary opacity-70">
          {isRemaining ? 'Hand P2' : 'Captured P2'}
        </span>
        <div className="flex justify-end">
          {renderTokens(2)}
        </div>
      </div>
    </div>
  );
};
