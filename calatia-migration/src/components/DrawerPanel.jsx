import React, { useState } from 'react';
import { FaceAvatar } from './FaceAvatar.jsx';
import { TRAITS, GOALS, QUESTS, ITEM_INFO, SKILLS } from '../data/gamedata.js';
import { listSaves, formatSaveTime, SLOT_1, SLOT_2 } from '../utils/save.js';
import { DdsIcon } from './DdsIcon.jsx';
export { DrawerPanel };

function DrawerPanel({ which, gs, onClose, onSave, onLoad }) {
  const titles = {
    character: '⚔ 角色',
    inventory: '🎒 背包',
    quests: '📜 任务',
    log: '📔 日志',
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={e=>e.stopPropagation()}>
        <div className="drawer-handle" />
        <div className="drawer-header">
          <span className="drawer-title">{titles[which]}</span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          {which === 'character' && <CharacterPanel gs={gs} onSave={onSave} onLoad={onLoad} />}
          {which === 'inventory' && <InventoryPanel gs={gs} />}
          {which === 'quests' && <QuestsPanel gs={gs} />}
          {which === 'log' && <LogPanel gs={gs} />}
        </div>
      </div>
    </div>
  );
}

function CharacterPanel({ gs, onSave, onLoad }) {
  const STAT_META = [
    { key:'STR', name:'力量', icon:'⚔️' },
    { key:'DEX', name:'敏捷', icon:'💨' },
    { key:'INT', name:'智力', icon:'✨' },
    { key:'CHA', name:'魅力', icon:'💛' },
    { key:'CON', name:'体质', icon:'💚' },
    { key:'WIS', name:'感知', icon:'🔮' },
  ];
  const goal = GOALS.find(g => g.id === gs.goal);
  const traits = (gs.traits || []).map(tid => TRAITS.find(t => t.id === tid)).filter(Boolean);
  const hpPct = Math.max(0, gs.hp / gs.maxHp * 100);
  const expPct = Math.max(0, gs.exp / gs.expMax * 100);
  const skills = (gs.skills || []).map(sid => SKILLS[sid]).filter(Boolean);

  return (
    <>
      <div className="char-overview">
        <div className="char-overview-face">
          {gs.face ? <FaceAvatar face={gs.face} size={64} /> : '🧙'}
        </div>
        <div className="char-overview-info">
          <div className="char-overview-name">{gs.name}</div>
          <div className="char-overview-meta">Lv.{gs.level || 1} · 第 {gs.day} 天 · {goal ? `${goal.icon} ${goal.name}` : ''}</div>
          <div className="char-overview-bars">
            <div className="char-bar"><div className="char-bar-fill hp" style={{width:hpPct+'%'}}/></div>
            <div className="char-bar-text">❤️ {gs.hp}/{gs.maxHp}</div>
            <div className="char-bar"><div className="char-bar-fill exp" style={{width:expPct+'%'}}/></div>
            <div className="char-bar-text">✨ {gs.exp}/{gs.expMax}</div>
          </div>
        </div>
      </div>

      <div className="drawer-section">
        <div className="drawer-section-title">─── 属性 ───</div>
        <div className="char-stat-grid">
          {STAT_META.map(s => (
            <div key={s.key} className="char-stat-item">
              <span className="char-stat-item-icon">{s.icon}</span>
              <span className="char-stat-item-name">{s.name}</span>
              <span className="char-stat-item-val">{gs.stats[s.key]}</span>
            </div>
          ))}
        </div>
        {gs.freeStatPoints > 0 && (
          <div style={{textAlign:'center',color:'var(--gold)',fontSize:'0.75rem',marginTop:6}}>
            ✨ 你还有 {gs.freeStatPoints} 点自由属性可分配（升级时使用）
          </div>
        )}
      </div>

      <div className="drawer-section">
        <div className="drawer-section-title">─── 特性 ───</div>
        <div className="char-traits-list">
          {traits.length === 0 && <div className="drawer-empty">无</div>}
          {traits.map(t => (
            <div key={t.id} className="char-trait-row">
              <div className="char-trait-row-name">{t.name}</div>
              <div className="char-trait-row-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {skills.length > 0 && (
        <div className="drawer-section">
          <div className="drawer-section-title">─── 技能 ───</div>
          <div className="char-traits-list">
            {skills.map(s => (
              <div key={s.id} className="char-trait-row char-skill-row">
                <DdsIcon id={s.id} size={36} fallback={<span style={{fontSize:'1.4rem'}}>{s.icon}</span>} />
                <div style={{flex:1}}>
                  <div className="char-trait-row-name">{s.name}</div>
                  <div className="char-trait-row-desc">{s.desc} · 冷却 {s.cooldown} 回合</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <SaveSection onSave={onSave} onLoad={onLoad} />
    </>
  );
}

function SaveSection({ onSave, onLoad }) {
  const [mode, setMode] = useState(null); // null | 'save' | 'load'
  const saves = listSaves();
  const manualSlots = saves.filter(s => s.slot === SLOT_1 || s.slot === SLOT_2);
  const slotLabel = (slot) => `存档 ${slot}`;

  if (!onSave && !onLoad) return null;

  return (
    <div className="drawer-section">
      <div className="drawer-section-title">─── 存档 ───</div>

      {mode === null && (
        <div className="save-action-row">
          <button className="save-btn save-btn-load" onClick={() => setMode('save')}>💾 手动存档</button>
          <button className="save-btn save-btn-load" onClick={() => setMode('load')}>📂 读取存档</button>
        </div>
      )}

      {mode === 'save' && (
        <div className="save-slots-inline">
          {manualSlots.map(s => (
            <div key={s.slot} className="save-slot-inline">
              <div className="save-slot-label">{slotLabel(s.slot)}</div>
              {!s.empty && <div className="save-slot-meta-sm">{s.name} Lv.{s.level} · {formatSaveTime(s.savedAt)}</div>}
              {s.empty && <div className="save-slot-meta-sm">空</div>}
              <button className="save-btn save-btn-load" onClick={() => { onSave(s.slot); setMode(null); }}>
                {s.empty ? '存入' : '覆盖'}
              </button>
            </div>
          ))}
          <button className="save-btn save-btn-del" onClick={() => setMode(null)}>取消</button>
        </div>
      )}

      {mode === 'load' && (
        <div className="save-slots-inline">
          {saves.filter(s => !s.empty).length === 0 && (
            <div className="drawer-empty">暂无存档</div>
          )}
          {saves.filter(s => !s.empty).map(s => (
            <div key={s.slot} className="save-slot-inline">
              <div className="save-slot-label">{s.slot === 0 ? '自动存档' : slotLabel(s.slot)}</div>
              <div className="save-slot-meta-sm">{s.name} Lv.{s.level} · {formatSaveTime(s.savedAt)}</div>
              <button className="save-btn save-btn-load" onClick={() => { onLoad(s.gs); }}>读取</button>
            </div>
          ))}
          <button className="save-btn save-btn-del" onClick={() => setMode(null)}>取消</button>
        </div>
      )}
    </div>
  );
}

function InventoryPanel({ gs }) {
  const questItems = gs.questItems || [];
  const items = gs.inventory || [];
  const SLOTS = 16;  // total cells to show

  return (
    <>
      {questItems.length > 0 && (
        <div className="drawer-section">
          <div className="drawer-section-title">─── 关键物品 ───</div>
          <div className="quest-items-strip">
            {questItems.map((id, i) => {
              const info = ITEM_INFO[id] || { icon:'📦', name:id };
              return (
                <div key={i} className="inv-cell quest" title={info.name}>
                  <DdsIcon id={id} size={36} fallback={<span style={{fontSize:'1.6rem'}}>{info.icon}</span>} />
                  <div className="inv-cell-name">{info.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="drawer-section">
        <div className="drawer-section-title">─── 物品 ({items.length}) ───</div>
        {items.length === 0 ? (
          <div className="drawer-empty">背包空空如也</div>
        ) : (
          <div className="inv-grid">
            {items.map((it, i) => {
              const info = ITEM_INFO[it] || { icon:'📦', name:it };
              const itemName = info.name;
              return (
                <div key={i} className="inv-cell has-item" title={itemName}>
                  <DdsIcon id={it} size={36} fallback={<span style={{fontSize:'1.4rem'}}>{info.icon}</span>} />
                  <div className="inv-cell-name">{itemName}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="drawer-section">
        <div className="drawer-section-title">─── 资源 ───</div>
        <div className="char-stat-grid">
          <div className="char-stat-item">
            <span className="char-stat-item-icon">💰</span>
            <span className="char-stat-item-name">金币</span>
            <span className="char-stat-item-val">{gs.gold}</span>
          </div>
          <div className="char-stat-item">
            <span className="char-stat-item-icon">🌿</span>
            <span className="char-stat-item-name">草药</span>
            <span className="char-stat-item-val">{gs.herb||0}</span>
          </div>
          <div className="char-stat-item">
            <span className="char-stat-item-icon">🏅</span>
            <span className="char-stat-item-name">声望</span>
            <span className="char-stat-item-val">{gs.fame}</span>
          </div>
          <div className="char-stat-item">
            <span className="char-stat-item-icon">💀</span>
            <span className="char-stat-item-name">击杀</span>
            <span className="char-stat-item-val">{gs.kills||0}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function QuestsPanel({ gs }) {
  const active = Object.entries(gs.activeQuests || {});
  const done = gs.doneQuests || [];

  return (
    <>
      <div className="drawer-section">
        <div className="drawer-section-title">─── 进行中 ({active.length}) ───</div>
        {active.length === 0 ? (
          <div className="drawer-empty">尚未接取任务</div>
        ) : (
          <div className="quest-list-drawer">
            {active.map(([qid, currentStep]) => {
              const q = QUESTS[qid];
              if (!q) return null;
              const curIdx = q.steps.findIndex(s => s.id === currentStep);
              return (
                <div key={qid} className="quest-row-drawer">
                  <div className="quest-row-drawer-name">📍 {q.name}</div>
                  <div className="quest-row-drawer-prog">
                    {q.steps.map((s, i) => {
                      if (s.id === 'done') return null;
                      const isDone = i < curIdx;
                      const isCurrent = i === curIdx;
                      return (
                        <div key={s.id} className={`quest-step ${isDone?'done':''} ${isCurrent?'current':''}`}>
                          <span className="quest-step-marker">{isDone ? '✓' : isCurrent ? '▶' : '○'}</span>
                          {s.desc}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {done.length > 0 && (
        <div className="drawer-section">
          <div className="drawer-section-title">─── 已完成 ({done.length}) ───</div>
          <div className="quest-list-drawer">
            {done.map(qid => {
              const q = QUESTS[qid];
              if (!q) return null;
              return (
                <div key={qid} className="quest-row-drawer done">
                  <div className="quest-row-drawer-name">✓ {q.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

function LogPanel({ gs }) {
  // Simple summary log
  const entries = [];
  entries.push(`第 ${gs.day} 天，你的旅程仍在继续。`);
  if (gs.kills > 0) entries.push(`你已击败 ${gs.kills} 个敌人。`);
  if (gs.doneQuests?.length > 0) entries.push(`你完成了 ${gs.doneQuests.length} 项任务。`);
  if (gs.fame >= 50) entries.push(`你的名声已传遍这片大陆。`);
  if (gs.gold >= 200) entries.push(`你的钱袋日益沉甸。`);
  entries.push(`（更多记忆将在未来版本中记录）`);

  return (
    <>
      <div className="drawer-section">
        <div className="drawer-section-title">─── 冒险记忆 ───</div>
        {entries.map((e, i) => (
          <div key={i} className="log-entry">
            {e}
          </div>
        ))}
      </div>
    </>
  );
}
