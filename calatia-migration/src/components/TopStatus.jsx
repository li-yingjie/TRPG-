import React from 'react';
import { FaceAvatar } from './FaceAvatar.jsx';
import settingIcon from '../icon/setting.png';
export { TopStatus };

function TopStatus({ gs, onOpenQuests, onOpenSettings }) {
  const activeCnt = Object.keys(gs.activeQuests).length;
  const hpPct = Math.max(0, gs.hp / gs.maxHp * 100);
  const expPct = Math.max(0, gs.exp / gs.expMax * 100);
  return (
    <div className="top-status">
      <div className="ts-row">
        <div className="ts-avatar">
          {gs.face ? <FaceAvatar face={gs.face} size={44} /> : '🧙'}
          <div className="ts-lv-badge">Lv{gs.level||1}</div>
        </div>
        <div className="ts-info">
          <div className="ts-name-row">
            <span className="ts-name">{gs.name}</span>
            {gs.freeStatPoints > 0 && <span className="ts-free-pts">+{gs.freeStatPoints} 点可分配</span>}
          </div>
          <div className="ts-hp-bar">
            <div className="ts-hp-fill" style={{width:hpPct+'%'}} />
            <span className="ts-hp-text">{gs.hp}/{gs.maxHp}</span>
          </div>
          <div className="ts-exp-bar">
            <div className="ts-exp-fill" style={{width:expPct+'%'}} />
          </div>
          <div className="ts-day-row">
            <span className="ts-day">第 {gs.day} 天</span>
            <span className="ts-actions">
              {[...Array(gs.actionsPerDay)].map((_,i) => (
                <span key={i} className={`ts-action-pip ${i<gs.actionsLeft?'on':'off'}`}>●</span>
              ))}
            </span>
            <span className="ts-resource"><span className="ts-resource-icon">💰</span>{gs.gold}</span>
            <span className="ts-resource"><span className="ts-resource-icon">🏅</span>{gs.fame}</span>
          </div>
        </div>
        <div className="ts-buttons">
          <button className="ts-btn" onClick={onOpenQuests}>
            📜
            {activeCnt > 0 && <span className="ts-btn-badge">{activeCnt}</span>}
          </button>
          <button className="ts-btn ts-btn-settings" onClick={onOpenSettings}>
            <img src={settingIcon} alt="设置" draggable={false} />
          </button>
        </div>
      </div>
    </div>
  );
}
