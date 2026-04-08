import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface SwatchProps {
  name: string;
  cssVar: string;
  textDark?: boolean;
}

const Swatch: React.FC<SwatchProps> = ({ name, cssVar, textDark }) => (
  <div
    className="flex flex-col rounded-xl overflow-hidden comic-border"
    style={{ background: `var(${cssVar})` }}
  >
    <div className="h-16" />
    <div
      className="px-3 py-2 text-xs font-body font-semibold"
      style={{ color: textDark ? '#1A1C1E' : '#f6f6f9' }}
    >
      <div className="font-bold">{name}</div>
      <div className="opacity-70">{cssVar}</div>
    </div>
  </div>
);

interface GroupProps {
  title: string;
  children: React.ReactNode;
}

const Group: React.FC<GroupProps> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-headline font-extrabold text-xl text-on-surface mb-4 border-b-2 border-ink pb-2">
      {title}
    </h2>
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {children}
    </div>
  </div>
);

const ColorsStory: React.FC = () => (
  <div className="p-8 bg-surface min-h-screen font-body">
    <h1 className="font-headline font-extrabold text-3xl text-primary mb-2">
      Action Blast — Color Palette
    </h1>
    <p className="text-on-surface opacity-70 mb-10 text-sm">
      Design system tokens defined in <code>src/index.css</code> via <code>@theme</code> (Tailwind v4).
    </p>

    <Group title="Primary (Blue)">
      <Swatch name="primary" cssVar="--color-primary" />
      <Swatch name="primary-container" cssVar="--color-primary-container" />
      <Swatch name="primary-dim" cssVar="--color-primary-dim" />
      <Swatch name="on-primary" cssVar="--color-on-primary" textDark />
    </Group>

    <Group title="Secondary (Yellow — Player 2)">
      <Swatch name="secondary" cssVar="--color-secondary" textDark />
      <Swatch name="secondary-container" cssVar="--color-secondary-container" textDark />
      <Swatch name="secondary-dim" cssVar="--color-secondary-dim" />
    </Group>

    <Group title="Tertiary (Orange-Red — Alerts)">
      <Swatch name="tertiary" cssVar="--color-tertiary" />
      <Swatch name="tertiary-container" cssVar="--color-tertiary-container" textDark />
      <Swatch name="tertiary-dim" cssVar="--color-tertiary-dim" />
    </Group>

    <Group title="Surface (Backgrounds)">
      <Swatch name="surface" cssVar="--color-surface" textDark />
      <Swatch name="surface-container" cssVar="--color-surface-container" textDark />
      <Swatch name="surface-highest" cssVar="--color-surface-highest" textDark />
      <Swatch name="surface-lowest" cssVar="--color-surface-lowest" textDark />
      <Swatch name="surface-variant" cssVar="--color-surface-variant" textDark />
    </Group>

    <Group title="Text / Ink">
      <Swatch name="on-surface" cssVar="--color-on-surface" />
      <Swatch name="ink" cssVar="--color-ink" />
    </Group>

    <div className="mt-10">
      <h2 className="font-headline font-extrabold text-xl text-on-surface mb-4 border-b-2 border-ink pb-2">
        Typography
      </h2>
      <div className="grid grid-cols-1 gap-6 surface-container-lowest comic-border p-6 rounded-xl">
        <div>
          <p className="text-xs text-on-surface opacity-50 mb-1 font-body">font-headline — Plus Jakarta Sans</p>
          <p className="font-headline font-extrabold text-4xl text-primary">Mühle Blast!</p>
        </div>
        <div>
          <p className="text-xs text-on-surface opacity-50 mb-1 font-body">font-body — Be Vietnam Pro</p>
          <p className="font-body text-lg text-on-surface">Player 1's Turn: Place a piece. (9 left)</p>
        </div>
        <div>
          <p className="text-xs text-on-surface opacity-50 mb-1 font-body">Utility classes</p>
          <div className="flex gap-3 flex-wrap">
            <div className="comic-border comic-shadow px-4 py-2 rounded-xl font-bold text-sm">.comic-border + .comic-shadow</div>
            <div className="surface-container-highest px-4 py-2 rounded-xl font-bold text-sm">.surface-container-highest</div>
            <div className="surface-container-lowest px-4 py-2 rounded-xl font-bold text-sm comic-border">.surface-container-lowest</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta<typeof ColorsStory> = {
  title: 'Design System/Colors',
  component: ColorsStory,
};

export default meta;
type Story = StoryObj<typeof ColorsStory>;

export const Palette: Story = {};
