import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Piece } from '../components/Piece';

const meta: Meta<typeof Piece> = {
  title: 'Components/Piece',
  component: Piece,
  decorators: [
    (Story) => (
      <div className="p-10 bg-surface flex items-center justify-center relative w-[200px] h-[200px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Piece>;

export const Player1: Story = {
  args: {
    player: 1,
    isSelectable: false,
    isSelected: false,
    style: { left: '100px', top: '100px' }
  },
};

export const Player1Selectable: Story = {
  args: {
    player: 1,
    isSelectable: true,
    isSelected: false,
    style: { left: '100px', top: '100px' }
  },
};

export const Player2: Story = {
  args: {
    player: 2,
    isSelectable: false,
    isSelected: false,
    style: { left: '100px', top: '100px' }
  },
};

export const GhostTarget: Story = {
  args: {
    player: 'ghost',
    isSelectable: false,
    isSelected: false,
    style: { left: '100px', top: '100px' }
  },
};

export const Player2Selectable: Story = {
  args: {
    player: 2,
    isSelectable: true,
    isSelected: false,
    style: { left: '100px', top: '100px' }
  },
};

export const Player1Selected: Story = {
  args: {
    player: 1,
    isSelectable: true,
    isSelected: true,
    style: { left: '100px', top: '100px' }
  },
};
