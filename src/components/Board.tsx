import { getValidMoves, canRemovePiece } from '../logic/gameState';
import type { GameState } from '../logic/gameState';
import { BOARD_COORDS, BOARD_LINES } from './BoardCoord';
import { Piece } from './Piece';

interface BoardProps {
  state: GameState;
  onNodeClick: (index: number) => void;
  onPieceClick: (index: number) => void;
}

export const Board = ({ state, onNodeClick, onPieceClick }: BoardProps) => {
  const { board, selectedPiece, phase, turn } = state;
  let validMoves: number[] = [];
  
  if (phase === 'MOVE' && selectedPiece !== null) {
    validMoves = getValidMoves(state, selectedPiece);
  } else if (phase === 'PLACE') {
    validMoves = board.map((p, i) => p === null ? i : -1).filter(i => i !== -1);
  }

  const handleNodeClick = (index: number) => {
    if (board[index] === null && validMoves.includes(index)) {
      onNodeClick(index);
    }
  };

  const handlePieceClick = (index: number) => {
    onPieceClick(index);
  };

  const opponent = turn === 1 ? 2 : 1;

  return (
    <div className="relative w-full max-w-[500px] aspect-square surface-container-highest rounded-xl comic-border mx-auto flex-shrink-0">
      <svg viewBox="0 0 500 500" className="absolute top-0 left-0 w-full h-full">
        <defs>
          <filter id="squiggle">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        
        {/* Draw thick, rounded lines for Action Blast feel */}
        {BOARD_LINES.map(([from, to], i) => {
          const [x1, y1] = BOARD_COORDS[from];
          const [x2, y2] = BOARD_COORDS[to];
          return (
            <line 
              key={`line-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke="#dbdde0" 
              strokeWidth="16" 
              strokeLinecap="round"
            />
          );
        })}
        {BOARD_LINES.map(([from, to], i) => {
          const [x1, y1] = BOARD_COORDS[from];
          const [x2, y2] = BOARD_COORDS[to];
          return (
            <line 
              key={`line-inner-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke="#1A1C1E" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Nodes / Intersection points */}
      {BOARD_COORDS.map(([x, y], i) => (
        <div key={`node-${i}`} 
             className="absolute w-[4.8%] h-[4.8%] -ml-[2.4%] -mt-[2.4%] bg-1A1C1E rounded-full bg-ink z-0"
             style={{ left: `${(x / 500) * 100}%`, top: `${(y / 500) * 100}%` }}
        />
      ))}

      {/* Ghost pieces for valid moves */}
      {(phase === 'PLACE' || (phase === 'MOVE' && selectedPiece !== null)) && validMoves.map(index => {
        const [x, y] = BOARD_COORDS[index];
        return (
          <Piece 
            key={`ghost-${index}`} 
            player="ghost" 
            style={{ 
              left: `${(x / 500) * 100}%`, 
              top: `${(y / 500) * 100}%`, 
              zIndex: 10,
              width: '9.6%',
              height: '9.6%',
              marginLeft: '-4.8%',
              marginTop: '-4.8%'
            }}
            onClick={() => handleNodeClick(index)}
          />
        );
      })}

      {/* Actual Pieces */}
      {board.map((player, index) => {
        if (player === null) return null;
        const [x, y] = BOARD_COORDS[index];
        
        const isSelected = selectedPiece === index;
        let isSelectable = false;
        
        if (phase === 'MOVE' && player === turn) {
          isSelectable = true;
        } else if (phase === 'REMOVE' && player === opponent) {
          isSelectable = canRemovePiece(board, index, opponent);
        }

        return (
          <Piece
            key={`piece-${index}`}
            player={player}
            isSelected={isSelected}
            isSelectable={isSelectable}
            onClick={() => handlePieceClick(index)}
            style={{ 
              left: `${(x / 500) * 100}%`, 
              top: `${(y / 500) * 100}%`, 
              zIndex: isSelected ? 30 : 20,
              width: '9.6%',
              height: '9.6%',
              marginLeft: '-4.8%',
              marginTop: '-4.8%'
            }}
          />
        );
      })}
    </div>
  );
};
