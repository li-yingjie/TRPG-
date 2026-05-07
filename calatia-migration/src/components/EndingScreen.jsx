import React from 'react';
import { FaceAvatar } from './FaceAvatar.jsx';
export { EndingScreen };

function EndingScreen({ ep, gs, onRestart, onTitle }) {
  return (
    <div className="ending-screen" style={{background: ep.bg ? `radial-gradient(ellipse at top, ${ep.bg}, var(--bg-dark))` : undefined}}>
      <div className="ending-icon">{ep.icon}</div>
      <div className="ending-subtitle">{ep.subtitle || 'EPILOGUE'}</div>
      <div className="ending-title">{ep.title}</div>
      <div className="ending-story">{ep.story}</div>
      <div className="ending-stats">
        <div className="ending-stat">
          <div className="ending-stat-val">{gs.gold}</div>
          <div className="ending-stat-key">金币</div>
        </div>
        <div className="ending-stat">
          <div className="ending-stat-val">{gs.fame}</div>
          <div className="ending-stat-key">声望</div>
        </div>
        <div className="ending-stat">
          <div className="ending-stat-val">{gs.kills||0}</div>
          <div className="ending-stat-key">击杀</div>
        </div>
        <div className="ending-stat">
          <div className="ending-stat-val">{gs.doneQuests?.length||0}</div>
          <div className="ending-stat-key">任务</div>
        </div>
        <div className="ending-stat">
          <div className="ending-stat-val">{gs.exp}</div>
          <div className="ending-stat-key">经验</div>
        </div>
        <div className="ending-stat">
          <div className="ending-stat-val">{gs.questItems?.length||0}</div>
          <div className="ending-stat-key">珍宝</div>
        </div>
      </div>
      <div>
        <button className="ending-btn primary" onClick={onRestart}>再次冒险</button>
        <button className="ending-btn" onClick={onTitle}>返回主页</button>
      </div>
    </div>
  );
}

