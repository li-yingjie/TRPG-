import React from 'react';
export { BottomNav };

function BottomNav({ gs, active, onTab }) {
  const activeQuestCnt = Object.keys(gs.activeQuests || {}).length;
  const itemsCnt = (gs.questItems || []).length + (gs.inventory || []).length;

  const tabs = [
    { id:'character', icon:'⚔️', label:'角色' },
    { id:'inventory', icon:'🎒', label:'背包', badge: itemsCnt },
    { id:'quests',    icon:'📜', label:'任务', badge: activeQuestCnt, badgeColor:'gold' },
    { id:'log',       icon:'📔', label:'日志' },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id}
            className={`nav-tab ${isActive?'active':''}`}
            onClick={() => onTab(isActive ? null : t.id)}>
            <span className="nav-tab-icon">{t.icon}</span>
            <span className="nav-tab-label">{t.label}</span>
            {t.badge > 0 && <span className="nav-tab-badge"
              style={t.badgeColor==='gold'?{background:'var(--gold)',color:'#1a1610'}:{}}>{t.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
