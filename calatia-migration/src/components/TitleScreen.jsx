import React, { useState } from 'react';
import { FaceAvatar } from './FaceAvatar.jsx';
import { TRAITS } from '../data/gamedata.js';
import { makeInitState } from '../utils/initState.js';
import { PRESETS } from '../data/presets.js';
import { listSaves, deleteSave, formatSaveTime, SLOT_AUTO, SLOT_1, SLOT_2 } from '../utils/save.js';
export { TitleScreen };

function TitleScreen({ onStart, onLoad, initialPanel = null }) {
  const [panel, setPanel] = useState(initialPanel); // null | 'load' | 'newgame' | 'preset'
  const saves = listSaves();
  const autoSave = saves[SLOT_AUTO];
  const hasAnySave = saves.some(s => !s.empty);

  const slotLabel = (slot) => slot === SLOT_AUTO ? '自动存档' : `存档 ${slot}`;

  // 用预设角色直接开始游戏
  const startPreset = (preset) => {
    const ng = makeInitState();
    ng.name = preset.name;
    ng.face = { ...preset.face };
    ng.stats = { ...preset.stats };
    ng.traits = [...preset.traits];
    ng.goal = preset.goal;
    preset.traits.forEach(tid => {
      const t = TRAITS.find(x => x.id === tid);
      if (t) t.apply(ng);
    });
    ng.maxHp = 25 + ng.stats.CON * 3 + (ng.hpBonus || 0);
    ng.hp = ng.maxHp;
    onLoad(ng);
  };

  // ── 读取存档面板 ──
  if (panel === 'load') {
    return (
      <div className="title-screen">
        <button className="back-topleft" onClick={() => setPanel(null)}>← 返回</button>
        <div className="save-panel-title" style={{ marginTop: 44 }}>读取存档</div>
        <div className="save-slots">
          {saves.map(s => (
            <div key={s.slot} className={`save-slot ${s.empty ? 'save-slot-empty' : ''}`}>
              <div className="save-slot-label">{slotLabel(s.slot)}</div>
              {s.empty ? (
                <div className="save-slot-empty-text">空</div>
              ) : (
                <>
                  <div className="save-slot-info">
                    <span className="save-slot-name">{s.name}</span>
                    <span className="save-slot-meta">Lv.{s.level} · 第 {s.day} 天</span>
                  </div>
                  <div className="save-slot-time">{formatSaveTime(s.savedAt)}</div>
                  <div className="save-slot-actions">
                    <button className="save-btn save-btn-load" onClick={() => onLoad(s.gs)}>读取</button>
                    <button className="save-btn save-btn-del" onClick={() => { deleteSave(s.slot); setPanel(null); setTimeout(() => setPanel('load'), 0); }}>删除</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── 选择开始方式面板 ──
  if (panel === 'newgame') {
    return (
      <div className="title-screen">
        <button className="back-topleft" onClick={() => setPanel(null)}>← 返回</button>
        <div className="title-logo" style={{ fontSize: '1.6rem', marginBottom: 6 }}>命途冒险</div>
        <div className="title-sub" style={{ marginBottom: 40 }}>选择开始方式</div>
        <button className="preset-mode-btn" onClick={onStart}>
          <span className="preset-mode-icon">⚔️</span>
          <div className="preset-mode-text">
            <div className="preset-mode-title">自定义创建</div>
            <div className="preset-mode-desc">自由分配属性、选择特性与命题</div>
          </div>
        </button>
        <button className="preset-mode-btn" onClick={() => setPanel('preset')}>
          <span className="preset-mode-icon">👥</span>
          <div className="preset-mode-text">
            <div className="preset-mode-title">选择预设角色</div>
            <div className="preset-mode-desc">从精心设计的角色中直接出发</div>
          </div>
        </button>
      </div>
    );
  }

  // ── 预设角色选择面板 ──
  if (panel === 'preset') {
    return (
      <div className="title-screen title-screen-preset">
        <button className="back-topleft" onClick={() => setPanel('newgame')}>← 返回</button>
        <div className="save-panel-title" style={{ marginTop: 44 }}>选择角色</div>
        <div className="preset-grid">
          {PRESETS.map(p => {
            const traitLabels = p.traits.map(tid => TRAITS.find(t => t.id === tid)?.name).filter(Boolean);
            const goalIcons = { glory: '👑', wealth: '💰', dragon: '🐉' };
            return (
              <div key={p.id} className="preset-card" onClick={() => startPreset(p)}>
                <div className="preset-card-face">
                  <FaceAvatar face={p.face} size={60} />
                </div>
                <div className="preset-card-body">
                  <div className="preset-card-header">
                    <span className="preset-card-name">{p.name}</span>
                    <span className="preset-card-tagline">{p.tagline}</span>
                    <span className="preset-card-goal" title="命题">{goalIcons[p.goal]}</span>
                  </div>
                  <div className="preset-card-intro">{p.intro}</div>
                  <div className="preset-card-chips">
                    {traitLabels.map(l => (
                      <span key={l} className="preset-chip">{l}</span>
                    ))}
                    <span className="preset-chip preset-chip-stat">STR {p.stats.STR}</span>
                    <span className="preset-chip preset-chip-stat">AGI {p.stats.AGI}</span>
                    <span className="preset-chip preset-chip-stat">INT {p.stats.INT}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── 主标题页 ──
  return (
    <div className="title-screen">
      <div className="title-logo">命途冒险</div>
      <div className="title-sub">CALATIA · 文字 RPG</div>

      {!autoSave.empty && (
        <button className="title-btn title-btn-continue" onClick={() => onLoad(autoSave.gs)}>
          继续游戏
          <span className="title-btn-meta">{autoSave.name} · Lv.{autoSave.level} · 第 {autoSave.day} 天</span>
        </button>
      )}

      <button className="title-btn" onClick={() => setPanel('newgame')}>开始新游戏</button>

      {hasAnySave && (
        <button className="title-btn title-btn-sec" onClick={() => setPanel('load')}>读取存档</button>
      )}
    </div>
  );
}
