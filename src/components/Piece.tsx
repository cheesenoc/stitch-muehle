import React from 'react';
import type { Player } from '../logic/gameState';

interface PieceProps {
  player: Player | 'ghost';
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  isSelectable?: boolean;
  isSelected?: boolean;
}

export const Piece: React.FC<PieceProps> = ({ player, onClick, style, className = '', isSelectable, isSelected }) => {
  const isGhost = player === 'ghost';
  const baseClasses = `absolute w-12 h-12 -ml-6 -mt-6 rounded-full transition-all duration-200`;
  
  const popClass = (isSelectable && !isGhost) ? 'hover:scale-105 active:scale-95 cursor-pointer shadow-pop' : '';
  const selectedClass = isSelected ? 'ring-4 ring-tertiary-container scale-110 shadow-none' : 'comic-border';
  
  let colorClass = '';
  if (player === 1) {
    colorClass = 'bg-gradient-to-br from-primary to-primary-container text-on-primary';
  } else if (player === 2) {
    colorClass = 'bg-gradient-to-br from-secondary to-secondary-container text-ink';
  } else if (isGhost) {
    colorClass = 'bg-primary/20 border-2 border-dashed border-primary/50 cursor-pointer hover:bg-primary/40';
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClass} ${popClass} ${!isGhost ? selectedClass : ''} flex items-center justify-center font-bold text-xl ${className}`}
      style={style}
      disabled={!isSelectable && !isGhost}
    >
      {player === 1 && '✧'}
      {player === 2 && '✦'}
    </button>
  );
};
