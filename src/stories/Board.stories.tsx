import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Board } from '../components/Board';
import type { GameState } from '../logic/gameState';

const emptyState: GameState = {
  board: Array(24).fill(null),
  turn: 1,
  phase: 'PLACE',
  piecesInHand: { 1: 9, 2: 9 },
  piecesOnBoard: { 1: 0, 2: 0 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: null,
};

// A state with some pieces: P1 at 0,1,2 (mill!), P2 at 8,9,10 (mill!)
const midGameBoard: (1 | 2 | null)[] = Array(24).fill(null);
midGameBoard[0] = 1; midGameBoard[1] = 1; midGameBoard[2] = 1; // P1 mill outer-top
midGameBoard[8] = 2; midGameBoard[9] = 2; midGameBoard[10] = 2; // P2 mill middle-top
midGameBoard[16] = 1; midGameBoard[17] = 1; // P1 inner ring
midGameBoard[20] = 2; midGameBoard[21] = 2; // P2 inner ring

const midGameState: GameState = {
  board: midGameBoard,
  turn: 2,
  phase: 'MOVE',
  piecesInHand: { 1: 0, 2: 0 },
  piecesOnBoard: { 1: 4, 2: 4 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: null,
};

// Moving piece selected
const movingState: GameState = {
  ...midGameState,
  turn: 1,
  selectedPiece: 16, // P1 piece at inner-ring pos 16 is selected
};

// Remove phase: P1 formed a mill, must remove P2 piece
const removeBoard: (1 | 2 | null)[] = Array(24).fill(null);
removeBoard[0] = 1; removeBoard[1] = 1; removeBoard[2] = 1; // P1 mill
removeBoard[8] = 2; removeBoard[9] = 2; removeBoard[10] = 2; // P2 pieces available
removeBoard[16] = 1;

const removeState: GameState = {
  board: removeBoard,
  turn: 1,
  phase: 'REMOVE',
  piecesInHand: { 1: 0, 2: 3 },
  piecesOnBoard: { 1: 4, 2: 3 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: null,
};

// Game over: P1 wins
const gameOverBoard: (1 | 2 | null)[] = Array(24).fill(null);
gameOverBoard[0] = 1; gameOverBoard[1] = 1; gameOverBoard[2] = 1;
gameOverBoard[3] = 2; gameOverBoard[4] = 2; // only 2 P2 pieces remain

const gameOverState: GameState = {
  board: gameOverBoard,
  turn: 1,
  phase: 'GAME_OVER',
  piecesInHand: { 1: 0, 2: 0 },
  piecesOnBoard: { 1: 3, 2: 2 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: 1,
};

// Flying mode: P2 has exactly 3 pieces
const flyingBoard: (1 | 2 | null)[] = Array(24).fill(null);
flyingBoard[0] = 1; flyingBoard[3] = 1; flyingBoard[6] = 1; flyingBoard[9] = 1;
flyingBoard[16] = 2; flyingBoard[18] = 2; flyingBoard[20] = 2; // P2 has exactly 3

const flyingState: GameState = {
  board: flyingBoard,
  turn: 2,
  phase: 'MOVE',
  piecesInHand: { 1: 0, 2: 0 },
  piecesOnBoard: { 1: 4, 2: 3 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: null,
};

const flyingSelected: GameState = {
  ...flyingState,
  selectedPiece: 16,
};

const meta: Meta<typeof Board> = {
  title: 'Game/Board',
  component: Board,
  decorators: [
    (Story) => (
      <div className="p-8 bg-surface flex items-center justify-center min-h-screen">
        <Story />
      </div>
    ),
  ],
  args: {
    onNodeClick: () => {},
    onPieceClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Board>;

export const EmptyBoard: Story = {
  args: { state: emptyState },
  name: 'Empty Board – Placement Phase',
};

export const MidGame: Story = {
  args: { state: midGameState },
  name: 'Mid-Game – Move Phase',
};

export const PieceSelected: Story = {
  args: { state: movingState },
  name: 'Move Phase – Piece Selected',
};

export const RemovePhase: Story = {
  args: { state: removeState },
  name: 'Remove Phase – Mill Formed',
};

export const FlyingMode: Story = {
  args: { state: flyingState },
  name: 'Flying Mode – P2 has 3 pieces',
};

export const FlyingModeSelected: Story = {
  args: { state: flyingSelected },
  name: 'Flying Mode – Piece Selected (any square valid)',
};

export const GameOver: Story = {
  args: { state: gameOverState },
  name: 'Game Over – P1 Wins',
};
