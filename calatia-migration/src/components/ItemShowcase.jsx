import React from 'react';
export { ItemShowcase };

function ItemShowcase({ info, onClose }) {
  return (
    <div className="item-showcase" onClick={onClose}>
      <div className="item-shine" />
      <div className="item-showcase-label">─── 获得物品 ───</div>
      <div className="item-showcase-icon">{info.icon}</div>
      <div className="item-showcase-name">{info.name}</div>
      <div className="item-showcase-desc">{info.desc}</div>
      <div className="item-showcase-tap">轻点继续</div>
    </div>
  );
}
