import React from 'react';
import { WorldTerrain, TownTerrain } from './Terrain.jsx';
export { MapScreen };

function MapScreen({ map, mapId, gs, onClickNode, onBack }) {
  return (
    <div className={`map-screen ${map.bg}`}>
      {map.bg === 'world' ? <WorldTerrain /> : <TownTerrain />}
      <div className="map-title">{map.title}</div>
      {map.parent && <button className="map-back-btn" onClick={onBack}>← 返回上层</button>}
      <svg className="compass" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="rgba(0,0,0,0.4)" stroke="#d4a020" strokeWidth="1"/>
        <path d="M24 6 L20 24 L24 22 L28 24 Z" fill="#c84030"/>
        <path d="M24 42 L20 24 L24 26 L28 24 Z" fill="#c0a878"/>
        <text x="24" y="14" textAnchor="middle" fontSize="6" fill="#d4a020" fontWeight="bold">N</text>
      </svg>

      {map.nodes.map(n => {
        // Determine unlock status
        const isUnlocked = (gs.unlockedNodes || []).includes(n.id);
        // If never unlocked AND has unlockHint, show as locked silhouette;
        // if no unlockHint and not unlocked, hide entirely (shouldn't happen now)
        const isHidden = !isUnlocked && !n.unlockHint;
        const isLocked = !isUnlocked && !!n.unlockHint;
        if (isHidden) return null;

        const isCurrent = (mapId === 'world' && n.id === gs.currentLocId);
        // Quest indicator (only if unlocked)
        let questBadge = null;
        if (isUnlocked) {
          if (n.id === 'tavern' && (gs.activeQuests.q_old_soldier === 'return' || (!gs.flags.includes('met_oldman')))) {
            questBadge = !gs.flags.includes('met_oldman') ? '!' : '✓';
          }
          if (n.id === 'wizard_tower' && gs.activeQuests.q_wizard === 'return_wizard') {
            questBadge = '✓';
          }
          if (n.id === 'wild_herb' && gs.activeQuests.q_wizard === 'collect_herb' && !gs.questItems.includes('silver_herb')) {
            questBadge = '!';
          }
          if (n.id === 'crypt' && gs.activeQuests.q_old_soldier === 'find_amulet' && !gs.questItems.includes('soldier_amulet')) {
            questBadge = '!';
          }
          if (n.id === 'mine' && gs.activeQuests.q_smith === 'find_hammer' && !gs.questItems.includes('iron_hammer')) {
            questBadge = '!';
          }
          if (n.id === 'smith' && gs.activeQuests.q_smith === 'return') {
            questBadge = '✓';
          }
          if (n.id === 'cliffs' && (gs.activeQuests.q_pirate === 'kill_pirate' || gs.activeQuests.q_fish === 'find_fish')) {
            questBadge = '!';
          }
          if (n.id === 'lighthouse' && gs.activeQuests.q_lighthouse === 'investigate') {
            questBadge = '!';
          }
          if (n.id === 'harbor_dock' && (gs.activeQuests.q_pirate === 'return' || gs.activeQuests.q_lighthouse === 'return')) {
            questBadge = '✓';
          }
          if (n.id === 'harbor_fishmonger' && gs.activeQuests.q_fish === 'return') {
            questBadge = '✓';
          }
          if (n.id === 'harbor_inn' && gs.activeQuests.q_letter === 'deliver') {
            questBadge = '✓';
          }
          if (n.id === 'harbor_cult' && gs.activeQuests.q_cult === 'infiltrate') {
            questBadge = '!';
          }
        }

        return (
          <div
            key={n.id}
            className={`marker ${n.kind} ${n.type||''} ${isLocked?'locked':''} ${isCurrent?'current':''}`}
            style={{ left:`${n.pos.x}%`, top:`${n.pos.y}%` }}
            onClick={()=>onClickNode(n)}
          >
            {isCurrent && <div className="you-arrow">▼</div>}
            <div className="marker-icon">
              {n.icon}
              {isLocked && <span className="lock-overlay">🔒</span>}
              {!isLocked && questBadge && <span className={`quest-badge ${questBadge==='✓'?'green':''}`}>{questBadge}</span>}
            </div>
            <div className="marker-label">{n.name}</div>
          </div>
        );
      })}
    </div>
  );
}
