import React from 'react';
export { RPGIcon };

// ── Stat-specific icons (do NOT spin — they identify the stat type) ──
const STAT_ICONS = {
  STR: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="2" x2="10" y2="15" />
      <line x1="6.5" y1="8.5" x2="13.5" y2="8.5" />
      <polygon points="10,2 8.5,6 11.5,6" fill="currentColor" stroke="none" />
      <line x1="10" y1="15" x2="9" y2="18" />
      <line x1="10" y1="15" x2="11" y2="18" />
    </svg>
  ),
  AGI: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="16" x2="14" y2="6" />
      <polygon points="14,6 10,7 13,10" fill="currentColor" stroke="none" />
      <line x1="4" y1="16" x2="4" y2="12" />
      <line x1="4" y1="16" x2="8" y2="16" />
    </svg>
  ),
  INT: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17 C5 17 5 12 7 10 C7 13 9 13 9 11 C11 9 10 6 8 4 C14 5 15 11 13 13 C13 10 12 10 12 12 C14 14 15 17 10 17Z" />
    </svg>
  ),
  WIS: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10 C5 5 15 5 18 10 C15 15 5 15 2 10Z" />
      <circle cx="10" cy="10" r="2.5" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  CHA: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,15 2,8 6,12 10,5 14,12 18,8 18,15" />
      <line x1="2" y1="15" x2="18" y2="15" />
    </svg>
  ),
  CON: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17 C4 14 3 8 3 5 L10 3 L17 5 C17 8 16 14 10 17Z" />
      <line x1="10" y1="3" x2="10" y2="17" strokeWidth="1" opacity="0.4" />
      <line x1="3" y1="7" x2="17" y2="7" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  LCK: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z" />
    </svg>
  ),
};

// ── Spinning compass-rose icon used for all action choices ──
// 8-point compass with inner ring — asymmetric enough to look good spinning
const CompassRose = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {/* Outer 4 cardinal points */}
    <polygon points="10,1.5 11.5,7 10,6 8.5,7" fill="currentColor" stroke="none" />
    <polygon points="18.5,10 13,11.5 14,10 13,8.5" fill="currentColor" stroke="none" />
    <polygon points="10,18.5 8.5,13 10,14 11.5,13" fill="currentColor" stroke="none" />
    <polygon points="1.5,10 7,8.5 6,10 7,11.5" fill="currentColor" stroke="none" />
    {/* Diagonal smaller points */}
    <line x1="13.5" y1="6.5" x2="11.2" y2="8.8" strokeWidth="1.2" opacity="0.6"/>
    <line x1="13.5" y1="13.5" x2="11.2" y2="11.2" strokeWidth="1.2" opacity="0.6"/>
    <line x1="6.5" y1="13.5" x2="8.8" y2="11.2" strokeWidth="1.2" opacity="0.6"/>
    <line x1="6.5" y1="6.5" x2="8.8" y2="8.8" strokeWidth="1.2" opacity="0.6"/>
    {/* Center ring */}
    <circle cx="10" cy="10" r="2" strokeWidth="1.2" />
    <circle cx="10" cy="10" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

function RPGIcon({ type = 'DEFAULT', size = 18, color, spin = false }) {
  const isStat = type in STAT_ICONS;
  const StatComp = STAT_ICONS[type];

  const style = {
    width: size,
    height: size,
    color,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  if (isStat) {
    // Stat icons never spin — they're identification glyphs
    return (
      <span className="rpg-icon" style={style}>
        <StatComp />
      </span>
    );
  }

  // All other action icons use the spinning compass rose
  return (
    <span className="rpg-icon rpg-icon-spin" style={style}>
      <CompassRose />
    </span>
  );
}
