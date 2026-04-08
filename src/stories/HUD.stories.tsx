import type { Meta, StoryObj } from '@storybook/react';
import { HUD } from '../components/HUD';
import type { GameState } from '../logic/gameState';

const placementState: GameState = {
  board: Array(24).fill(null),
  turn: 1,
  phase: 'PLACE',
  piecesInHand: { 1: 9, 2: 9 },
  piecesOnBoard: { 1: 0, 2: 0 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: null,
};

const p2PlacementState: GameState = {
  ...placementState,
  turn: 2,
  piecesInHand: { 1: 5, 2: 7 },
  piecesOnBoard: { 1: 4, 2: 2 },
};

const moveState: GameState = {
  board: Array(24).fill(null),
  turn: 1,
  phase: 'MOVE',
  piecesInHand: { 1: 0, 2: 0 },
  piecesOnBoard: { 1: 6, 2: 6 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: null,
};

const flyingState: GameState = {
  ...moveState,
  turn: 2,
  piecesOnBoard: { 1: 6, 2: 3 }, // P2 has exactly 3 = flying!
};

const removeState: GameState = {
  board: Array(24).fill(null),
  turn: 1,
  phase: 'REMOVE',
  piecesInHand: { 1: 0, 2: 0 },
  piecesOnBoard: { 1: 5, 2: 5 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: null,
};

const gameOverP1: GameState = {
  board: Array(24).fill(null),
  turn: 1,
  phase: 'GAME_OVER',
  piecesInHand: { 1: 0, 2: 0 },
  piecesOnBoard: { 1: 4, 2: 2 },
  selectedPiece: null,
  millFormingPiece: null,
  winner: 1,
};

const gameOverP2: GameState = {
  ...gameOverP1,
  winner: 2,
};

const meta: Meta<typeof HUD> = {
  title: 'Game/HUD',
  component: HUD,
  decorators: [
    (Story) => (
      <div className="p-8 bg-surface flex items-center justify-center min-h-screen">
        <Story />
      </div>
    ),
  ],
  args: {
    onSetGameMode: () => {},
    onSetDifficulty: () => {},
    onReset: () => {},
    gameMode: 'PvP',
    difficulty: 'EASY',
  },
};

export default meta;
type Story = StoryObj<typeof HUD>;

// ── PvP Stories ──────────────────────────────────────────────────────────────

export const PlacementP1: Story = {
  args: { state: placementState },
  name: 'PvP – Place Phase (P1 Turn)',
};

export const PlacementP2: Story = {
  args: { state: p2PlacementState },
  name: 'PvP – Place Phase (P2 Turn, uneven)',
};

export const MovePhase: Story = {
  args: { state: moveState },
  name: 'PvP – Move Phase',
};

export const RemovePhase: Story = {
  args: { state: removeState },
  name: 'PvP – Remove Phase (BAM!)',
};

export const GameOverP1Wins: Story = {
  args: { state: gameOverP1 },
  name: 'PvP – Game Over P1 Wins',
};

export const GameOverP2Wins: Story = {
  args: { state: gameOverP2 },
  name: 'PvP – Game Over P2 Wins',
};

// ── PvAI Stories ─────────────────────────────────────────────────────────────

export const PvAIEasy: Story = {
  args: { state: moveState, gameMode: 'PvAI', difficulty: 'EASY' },
  name: 'PvAI – Easy',
};

export const PvAIMedium: Story = {
  args: { state: moveState, gameMode: 'PvAI', difficulty: 'MEDIUM' },
  name: 'PvAI – Medium',
};

export const PvAIHard: Story = {
  args: { state: moveState, gameMode: 'PvAI', difficulty: 'HARD' },
  name: 'PvAI – Hard',
};

export const PvAIFlyingMode: Story = {
  args: { state: flyingState, gameMode: 'PvAI', difficulty: 'HARD' },
  name: 'PvAI – Flying Mode Active',
};

export const AIWins: Story = {
  args: { state: gameOverP2, gameMode: 'PvAI', difficulty: 'HARD' },
  name: 'PvAI – AI Wins',
};

export const PlayerWinsVsAI: Story = {
  args: { state: gameOverP1, gameMode: 'PvAI', difficulty: 'MEDIUM' },
  name: 'PvAI – Player Wins',
};
