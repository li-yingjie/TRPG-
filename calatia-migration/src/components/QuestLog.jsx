import React from 'react';
import { QUESTS } from '../data/gamedata.js';
export { QuestLog };

function QuestLog({ gs, onClose }) {
  const active = Object.entries(gs.activeQuests);
  const done = gs.doneQuests || [];
  return (
    <div className="quest-log" onClick={onClose}>
      <div className="ql-box" onClick={e=>e.stopPropagation()}>
        <div className="ql-title">📜 任务</div>
        {active.length === 0 && done.length === 0 && (
          <div className="ql-empty">尚无任务</div>
        )}
        {active.map(([qid, step]) => {
          const q = QUESTS[qid];
          if (!q) return null;
          const stepDef = q.steps.find(s=>s.id===step);
          return (
            <div key={qid} className="ql-item">
              <div className="ql-item-name">{q.name}</div>
              <div className="ql-item-prog">📍 {stepDef?.desc || step}</div>
            </div>
          );
        })}
        {done.map(qid => {
          const q = QUESTS[qid];
          if (!q) return null;
          return (
            <div key={qid} className="ql-item done">
              <div className="ql-item-name">{q.name}</div>
              <div className="ql-item-prog">✓ 已完成</div>
            </div>
          );
        })}
        <button className="ql-close" onClick={onClose}>关闭</button>
      </div>
    </div>
  );
}
