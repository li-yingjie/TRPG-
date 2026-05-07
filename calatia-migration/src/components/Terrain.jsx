import React from 'react';
export { WorldTerrain, TownTerrain };

function WorldTerrain() {
  return (
    <svg className="terrain-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect x="0" y="0" width="100" height="10" fill="#2a4a5a"/>
      <path d="M 60 10 L 70 25 L 75 18 L 85 30 L 90 22 L 100 35 L 100 10 Z" fill="url(#mtnG)" opacity="0.9"/>
      <ellipse cx="20" cy="35" rx="15" ry="10" fill="#2d4423" opacity="0.6"/>
      <ellipse cx="50" cy="55" rx="12" ry="8" fill="#2d4423" opacity="0.5"/>
      <ellipse cx="35" cy="75" rx="20" ry="12" fill="#2d4423" opacity="0.7"/>
      <path d="M 32 60 Q 45 50, 60 42" stroke="#8a7050" strokeWidth="0.5" strokeDasharray="2 1.5" fill="none" opacity="0.5"/>
      <path d="M 32 60 Q 28 75, 25 85" stroke="#8a7050" strokeWidth="0.5" strokeDasharray="2 1.5" fill="none" opacity="0.5"/>
      <path d="M 60 42 L 78 25" stroke="#8a7050" strokeWidth="0.5" strokeDasharray="2 1.5" fill="none" opacity="0.4"/>
      <defs>
        <linearGradient id="mtnG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a7060"/>
          <stop offset="100%" stopColor="#3a3024"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
function TownTerrain() {
  return (
    <svg className="terrain-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect x="0" y="0" width="100" height="100" fill="#5a4a35"/>
      <rect x="35" y="40" width="30" height="20" fill="#705840" rx="2"/>
      <path d="M 50 100 L 50 60 L 65 50 L 100 50" stroke="#8a7050" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M 0 50 L 35 50" stroke="#8a7050" strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M 50 0 L 50 40" stroke="#8a7050" strokeWidth="2" fill="none" opacity="0.5"/>
      <circle cx="15" cy="20" r="4" fill="#2d4423" opacity="0.5"/>
      <circle cx="85" cy="80" r="5" fill="#2d4423" opacity="0.5"/>
    </svg>
  );
}

// ════════════════════════════════
// TITLE / CREATE / ENDING SCREENS
