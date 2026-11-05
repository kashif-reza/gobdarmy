import React from 'react';
import { RankItem, BadgeItem } from '../types/tactical';

interface InsigniaViewProps {
  rank?: RankItem;
  badge?: BadgeItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const InsigniaView: React.FC<InsigniaViewProps> = ({
  rank,
  badge,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  if (badge) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-[#0a120e] border border-stone-800 p-2 shadow-inner ${sizeMap[size]} ${className}`}
      >
        {badge.iconType === 'star' && (
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37]">
            {/* Eight-pointed gallantry star */}
            <polygon
              points="50,5 61,35 95,35 68,56 79,88 50,70 21,88 32,56 5,35 39,35"
              fill="currentColor"
              stroke="#991b1b"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="16" fill="#15803d" stroke="#fef08a" strokeWidth="2" />
            <path
              d="M50 38 C 45 44, 45 54, 50 58 C 55 54, 55 44, 50 38 Z"
              fill="#ffffff"
            />
          </svg>
        )}
        {badge.iconType === 'wings' && (
          <svg viewBox="0 0 120 60" className="w-full h-full text-[#c5a059]">
            {/* Pilot Wings */}
            <path
              d="M60 25 C 40 10, 15 15, 5 35 C 20 32, 40 38, 55 35 Z"
              fill="currentColor"
            />
            <path
              d="M60 25 C 80 10, 105 15, 115 35 C 100 32, 80 38, 65 35 Z"
              fill="currentColor"
            />
            <circle cx="60" cy="30" r="12" fill="#1e3a8a" stroke="#d4af37" strokeWidth="2" />
            <circle cx="60" cy="30" r="6" fill="#dc2626" />
          </svg>
        )}
        {badge.iconType === 'parachute' && (
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#22c55e]">
            {/* Parachute Canopy */}
            <path
              d="M20 40 Q 50 10 80 40 Q 65 42 50 40 Q 35 42 20 40 Z"
              fill="#d4af37"
              stroke="#15803d"
              strokeWidth="2"
            />
            {/* Shroud Lines */}
            <line x1="22" y1="40" x2="50" y2="75" stroke="#a3e635" strokeWidth="1.5" />
            <line x1="38" y1="41" x2="50" y2="75" stroke="#a3e635" strokeWidth="1.5" />
            <line x1="62" y1="41" x2="50" y2="75" stroke="#a3e635" strokeWidth="1.5" />
            <line x1="78" y1="40" x2="50" y2="75" stroke="#a3e635" strokeWidth="1.5" />
            {/* Wings */}
            <path
              d="M50 75 Q 30 70 15 55 Q 30 60 50 75"
              fill="#d4af37"
            />
            <path
              d="M50 75 Q 70 70 85 55 Q 70 60 50 75"
              fill="#d4af37"
            />
          </svg>
        )}
        {badge.iconType === 'submarine' && (
          <svg viewBox="0 0 120 60" className="w-full h-full text-[#38bdf8]">
            {/* Submarine Hull */}
            <ellipse cx="60" cy="32" rx="36" ry="10" fill="#0f2942" stroke="#38bdf8" strokeWidth="2" />
            <rect x="54" y="16" width="12" height="12" fill="#0f2942" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M60 16 L 60 8 L 65 8" stroke="#38bdf8" strokeWidth="2" fill="none" />
            {/* Stylized Dolphins */}
            <path d="M15 32 Q 25 20 35 28 Q 28 36 15 32 Z" fill="#d4af37" />
            <path d="M105 32 Q 95 20 85 28 Q 92 36 105 32 Z" fill="#d4af37" />
          </svg>
        )}
        {(badge.iconType === 'cross' || badge.iconType === 'crest' || badge.iconType === 'shield' || badge.iconType === 'swords') && (
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#c5a059]">
            <polygon
              points="50,10 85,25 75,75 50,90 25,75 15,25"
              fill="#13271d"
              stroke="#d4af37"
              strokeWidth="2.5"
            />
            <line x1="28" y1="28" x2="72" y2="72" stroke="#c5a059" strokeWidth="3" />
            <line x1="72" y1="28" x2="28" y2="72" stroke="#c5a059" strokeWidth="3" />
            <circle cx="50" cy="50" r="10" fill="#991b1b" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    );
  }

  if (!rank) return null;

  const isArmy = rank.force === 'Bangladesh Army';
  const isNavy = rank.force === 'Bangladesh Navy';
  const isAirForce = rank.force === 'Bangladesh Air Force';

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#111c16] to-[#0a110d] border border-stone-800 p-2.5 shadow-md ${sizeMap[size]} ${className}`}
      title={`${rank.name} insignia`}
    >
      {/* Insignia Epaulette / Gorget Styling */}
      <svg viewBox="0 0 80 120" className="w-full h-full">
        {/* Background Epaulette Plate */}
        <polygon
          points="10,5 70,5 75,115 5,115"
          fill={isNavy ? '#0a192f' : isAirForce ? '#172554' : '#143322'}
          stroke="#3f4e43"
          strokeWidth="1.5"
        />

        {/* Top Gold National Emblem (Shapla) if applicable */}
        {rank.hasShapla && (
          <g transform="translate(40, 26) scale(0.65)">
            <ellipse cx="0" cy="0" rx="14" ry="14" fill="#92400e" opacity="0.3" />
            <path
              d="M0 -15 C -6 -5, -12 2, 0 12 C 12 2, 6 -5, 0 -15 Z"
              fill="#d4af37"
            />
            <path
              d="M-5 -2 C -16 -4, -18 8, -2 10 Z"
              fill="#c5a059"
            />
            <path
              d="M5 -2 C 16 -4, 18 8, 2 10 Z"
              fill="#c5a059"
            />
            {/* Base water waves */}
            <path d="M-15 14 Q 0 18 15 14" stroke="#d4af37" strokeWidth="2" fill="none" />
          </g>
        )}

        {/* Eagle Emblem (Air Force) */}
        {rank.hasEagle && (
          <g transform="translate(40, 28) scale(0.65)">
            <path
              d="M0 -10 C -12 -8, -22 4, -20 12 C -10 10, -5 2, 0 6 C 5 2, 10 10, 20 12 C 22 4, 12 -8, 0 -10 Z"
              fill="#60a5fa"
              stroke="#93c5fd"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="4" fill="#d4af37" />
          </g>
        )}

        {/* Crossed Swords (General / Flag officers) */}
        {rank.hasSwords && (
          <g transform={`translate(40, ${rank.hasShapla || rank.hasEagle ? 52 : 40}) scale(0.7)`}>
            <line x1="-20" y1="-14" x2="20" y2="14" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="-14" x2="-20" y2="14" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="0" r="3" fill="#fef08a" />
          </g>
        )}

        {/* Anchor Emblem (Navy) */}
        {rank.hasAnchor && (
          <g transform="translate(40, 48) scale(0.6)">
            <line x1="0" y1="-18" x2="0" y2="18" stroke="#d4af37" strokeWidth="3" />
            <circle cx="0" cy="-18" r="4" stroke="#d4af37" strokeWidth="2" fill="none" />
            <path d="M-14 10 Q 0 24 14 10" stroke="#d4af37" strokeWidth="3" fill="none" />
          </g>
        )}

        {/* Stars */}
        {rank.starsCount && rank.starsCount > 0 && (
          <g transform={`translate(40, ${rank.hasSwords ? 82 : rank.hasShapla ? 68 : 50})`}>
            {rank.starsCount === 1 && (
              <polygon
                points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                fill="#d4af37"
              />
            )}
            {rank.starsCount === 2 && (
              <>
                <polygon
                  transform="translate(-12, 0) scale(0.85)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
                <polygon
                  transform="translate(12, 0) scale(0.85)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
              </>
            )}
            {rank.starsCount === 3 && (
              <>
                <polygon
                  transform="translate(0, -10) scale(0.8)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
                <polygon
                  transform="translate(-14, 8) scale(0.8)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
                <polygon
                  transform="translate(14, 8) scale(0.8)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
              </>
            )}
            {rank.starsCount === 4 && (
              <>
                <polygon
                  transform="translate(-18, -6) scale(0.7)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
                <polygon
                  transform="translate(-6, 6) scale(0.7)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
                <polygon
                  transform="translate(6, -6) scale(0.7)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
                <polygon
                  transform="translate(18, 6) scale(0.7)"
                  points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2"
                  fill="#d4af37"
                />
              </>
            )}
          </g>
        )}

        {/* Naval & BAF Stripes / Rings if applicable */}
        {rank.stripesCount && rank.category !== 'Non-Commissioned Officer' && (
          <g transform="translate(15, 60)">
            {Array.from({ length: rank.stripesCount }).map((_, i) => (
              <rect
                key={i}
                x="0"
                y={i * 12}
                width="50"
                height={isNavy ? '6' : '5'}
                fill={isNavy ? '#d4af37' : '#60a5fa'}
                stroke={isNavy ? '#92400e' : '#1e3a8a'}
                strokeWidth="0.5"
                rx="1"
              />
            ))}
          </g>
        )}

        {/* NCO Chevrons */}
        {rank.category === 'Non-Commissioned Officer' && rank.stripesCount && (
          <g transform="translate(40, 50)">
            {Array.from({ length: rank.stripesCount }).map((_, i) => (
              <path
                key={i}
                d={`M -22 ${i * 14} L 0 ${i * 14 + 14} L 22 ${i * 14}`}
                stroke="#c5a059"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        )}

        {/* Other rank plain brass title bar */}
        {rank.category === 'Other Rank' && (
          <g transform="translate(40, 60)">
            <rect x="-24" y="-8" width="48" height="16" fill="#78350f" stroke="#d4af37" strokeWidth="1.5" rx="3" />
            <text x="0" y="4" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">
              BANGLADESH
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
