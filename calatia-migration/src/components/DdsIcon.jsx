import React from 'react';
export { DdsIcon };

// ── BG3 sprite sheets ──
// Sheet layout: 2048×2048 px, 64×64 px per cell, 32 cols × 32 rows
const SHEETS = {
  skills: '/icons/Icons_Skills.webp',
  items:  '/icons/Icons_Items.webp',
};

// Coordinates are (row, col) — i.e. s_{row}_{col} from extraction
const ICON_MAP = {
  // ── Combat skills ──
  flee_master:    { sheet: 'skills', row: 0,  col: 0  },
  meditate:       { sheet: 'skills', row: 0,  col: 1  },
  parry:          { sheet: 'skills', row: 0,  col: 2  },
  battle_cry:     { sheet: 'skills', row: 0,  col: 3  },
  power_strike:   { sheet: 'skills', row: 3,  col: 2  },
  heal:           { sheet: 'skills', row: 1,  col: 7  },

  // ── Inventory items ──
  healing_potion: { sheet: 'items',  row: 0,  col: 7  },
  '基础魔法导引': { sheet: 'items',  row: 2,  col: 0  },
  '老兵的短匕':   { sheet: 'items',  row: 11, col: 1  },
  '古护身符':     { sheet: 'items',  row: 10, col: 0  },
  '锻造护甲':     { sheet: 'items',  row: 5,  col: 0  },
  silver_herb:    { sheet: 'items',  row: 7,  col: 14 },
};

/**
 * DdsIcon — renders a single cell from the BG3 sprite sheets.
 *
 * @param {string}  id        Key matching ICON_MAP (skill id or item id)
 * @param {number}  size      Rendered size in px (default 32)
 * @param {*}       fallback  React node to render if no sprite mapping exists
 */
function DdsIcon({ id, size = 32, fallback = null }) {
  const entry = ICON_MAP[id];

  if (!entry) {
    return fallback !== null ? <>{fallback}</> : null;
  }

  const { sheet, row, col } = entry;
  // Scale from 64-px cell to target size
  const bgSize = Math.round(2048 * (size / 64));
  const bgX    = -Math.round(col * size);
  const bgY    = -Math.round(row * size);

  return (
    <span
      className="dds-icon"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
        backgroundImage: `url(${SHEETS[sheet]})`,
        backgroundSize: `${bgSize}px ${bgSize}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'auto',
        borderRadius: 4,
      }}
    />
  );
}
