import React, { useEffect, useState } from 'react';
import type { Player } from '../logic/gameState';

interface VictoryOverlayProps {
  winner: Player;
  isAI: boolean;
  moveCount: number;
  onPlayAgain: () => void;
}

// Burst of confetti particles
const CONFETTI = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.8,
  duration: 1.2 + Math.random() * 1.2,
  color: ['#0091FF', '#FFC107', '#FF5722', '#54a3ff', '#ffca4d'][i % 5],
  size: 8 + Math.random() * 10,
  rotate: Math.random() * 360,
}));

export const VictoryOverlay: React.FC<VictoryOverlayProps> = ({
  winner,
  isAI,
  moveCount,
  onPlayAgain,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slight delay so the board can finish rendering before overlay pops in
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const isP1 = winner === 1;
  const winnerName = isP1 ? 'Player 1' : isAI ? 'Computer' : 'Player 2';
  const winnerEmoji = isP1 ? '✧' : '✦';
  const primaryColor = isP1 ? '#0091FF' : '#FFC107';
  const contrastColor = isP1 ? '#eef3ff' : '#1A1C1E';

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 scale-95'
      }`}
      style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(26, 28, 30, 0.75)' }}
      aria-modal="true"
      role="dialog"
      aria-label="Game Over"
    >
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CONFETTI.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-sm"
            style={{
              left: `${c.x}%`,
              top: '-20px',
              width: c.size,
              height: c.size * 0.6,
              backgroundColor: c.color,
              transform: `rotate(${c.rotate}deg)`,
              animation: `confettiFall ${c.duration}s ${c.delay}s ease-in both`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className={`relative w-full max-w-sm mx-4 rounded-2xl comic-border overflow-hidden transition-all duration-500 delay-100 ${
          visible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
        }`}
        style={{ backgroundColor: '#f6f6f9' }}
      >
        {/* Sunburst header */}
        <div
          className="relative flex flex-col items-center justify-center pt-10 pb-6 overflow-hidden"
          style={{ backgroundColor: primaryColor }}
        >
          {/* Decorative sunburst rays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute origin-center"
                style={{
                  width: 2,
                  height: '60%',
                  backgroundColor: contrastColor,
                  opacity: 0.15,
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* Winner piece icon */}
          <div
            className="relative z-10 w-20 h-20 rounded-full comic-border flex items-center justify-center text-4xl font-bold shadow-comic mb-4"
            style={{
              backgroundColor: contrastColor,
              color: primaryColor,
              animation: visible ? 'bounceIn 0.6s 0.3s ease-out both' : undefined,
            }}
          >
            {winnerEmoji}
          </div>

          {/* YOU WIN! */}
          <div
            className="relative z-10 text-center"
            style={{
              animation: visible ? 'popIn 0.5s 0.5s ease-out both' : undefined,
            }}
          >
            <p
              className="font-headline font-extrabold text-5xl drop-shadow-md tracking-wide"
              style={{ color: contrastColor, WebkitTextStroke: '1.5px rgba(0,0,0,0.15)' }}
            >
              {isP1 || !isAI ? 'YOU WIN!' : 'AI WINS!'}
            </p>
            <p
              className="font-body font-semibold text-lg mt-1 opacity-90"
              style={{ color: contrastColor }}
            >
              {winnerName} takes the trophy!
            </p>
          </div>

          {/* BAM sticker */}
          <div
            className="absolute -top-2 -right-2 font-headline font-extrabold text-2xl z-20"
            style={{
              color: '#FF5722',
              transform: 'rotate(12deg)',
              textShadow: '2px 2px 0 #1A1C1E',
              animation: visible ? 'popIn 0.4s 0.6s ease-out both' : undefined,
            }}
          >
            BAM!
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 px-6 py-5">
          <div className="flex-1 rounded-xl comic-border p-4 text-center" style={{ backgroundColor: '#e7e8eb' }}>
            <p className="font-headline font-extrabold text-3xl text-on-surface">{moveCount}</p>
            <p className="font-body text-sm text-on-surface opacity-60 mt-0.5 font-semibold">Moves</p>
          </div>
          <div className="flex-1 rounded-xl comic-border p-4 text-center" style={{ backgroundColor: '#e7e8eb' }}>
            <p className="font-headline font-extrabold text-3xl" style={{ color: primaryColor }}>
              {winnerEmoji}
            </p>
            <p className="font-body text-sm text-on-surface opacity-60 mt-0.5 font-semibold">Winner</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 px-6 pb-6">
          <button
            id="victory-play-again"
            onClick={onPlayAgain}
            className="w-full py-4 rounded-xl font-headline font-extrabold text-xl comic-border comic-shadow transition-all active:scale-95 hover:brightness-105"
            style={{
              backgroundColor: primaryColor,
              color: contrastColor,
            }}
          >
            Play Again 🎮
          </button>
        </div>
      </div>

      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.2; }
        }
        @keyframes bounceIn {
          0%   { transform: scale(0.3); opacity: 0; }
          60%  { transform: scale(1.15); }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.7) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
