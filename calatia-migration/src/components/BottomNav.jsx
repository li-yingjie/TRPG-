import React from 'react';
import avatarIcon from '../icon/avatar.png';
import packageIcon from '../icon/package.png';
import taskIcon from '../icon/task.png';
import journalIcon from '../icon/journal.png';
export { BottomNav };

function BottomNav({ gs, active, onTab }) {
  const activeQuestCnt = Object.keys(gs.activeQuests || {}).length;
  const itemsCnt = (gs.questItems || []).length + (gs.inventory || []).length;

  const tabs = [
    { id:'character', icon: avatarIcon,  label:'角色' },
    { id:'inventory', icon: packageIcon, label:'背包', badge: itemsCnt },
    { id:'quests',    icon: taskIcon,    label:'任务', badge: activeQuestCnt, badgeColor:'gold' },
    { id:'log',       icon: journalIcon, label:'日志' },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id}
            className={`nav-tab ${isActive?'active':''}`}
            onClick={() => onTab(isActive ? null : t.id)}>
            <img className="nav-tab-icon" src={t.icon} alt="" draggable={false} />
            <span className="nav-tab-label">{t.label}</span>
            {t.badge > 0 && <span className="nav-tab-badge"
              style={t.badgeColor==='gold'?{background:'var(--gold)',color:'#1a1610'}:{}}>{t.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
