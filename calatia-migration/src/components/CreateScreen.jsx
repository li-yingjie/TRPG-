import React, { useState } from 'react';
import { FaceAvatar } from './FaceAvatar.jsx';
import { TRAITS, GOALS, FACE_PARTS } from '../data/gamedata.js';
import { makeInitState } from '../utils/initState.js';
export { CreateScreen };

function CreateScreen({ onStart, onBack }) {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('无名英雄');
  const [face, setFace] = React.useState({
    faceShape: 'round',
    skinTone: 'fair',
    hairStyle: 'short',
    hairColor: 'brown',
    accessory: 'none',
    expression: 'calm',
  });
  const [stats, setStats] = React.useState({ STR:5, DEX:5, INT:5, CHA:5, CON:5, WIS:5 });
  const [points, setPoints] = React.useState(10);
  const [selTraits, setSelTraits] = React.useState([]);
  const [selGoal, setSelGoal] = React.useState(null);
  const [bottomTab, setBottomTab] = React.useState('appearance'); // appearance | stats | traits

  const STAT_META = [
    { key:'STR', name:'力量', icon:'⚔️' },
    { key:'DEX', name:'敏捷', icon:'💨' },
    { key:'INT', name:'智力', icon:'✨' },
    { key:'CHA', name:'魅力', icon:'💛' },
    { key:'CON', name:'体质', icon:'💚' },
    { key:'WIS', name:'感知', icon:'🔮' },
  ];

  const adj = (k, d) => {
    if (d>0 && points<=0) return;
    if (d<0 && stats[k]<=1) return;
    setStats(s => ({...s, [k]: s[k]+d}));
    setPoints(p => p-d);
  };

  const toggleTrait = (id) => {
    if (selTraits.includes(id)) {
      setSelTraits(selTraits.filter(t=>t!==id));
    } else {
      if (selTraits.length >= 2) return;
      setSelTraits([...selTraits, id]);
    }
  };

  // Cycle through option arrays
  const cyclePart = (partKey, dir) => {
    const opts = FACE_PARTS[partKey].options;
    const cur = face[partKey];
    const idx = opts.findIndex(o => o.id === cur);
    const newIdx = (idx + dir + opts.length) % opts.length;
    setFace(f => ({...f, [partKey]: opts[newIdx].id}));
  };

  // Random face
  const randomize = () => {
    const newFace = {};
    Object.keys(FACE_PARTS).forEach(k => {
      const opts = FACE_PARTS[k].options;
      newFace[k] = opts[Math.floor(Math.random()*opts.length)].id;
    });
    setFace(newFace);
  };

  const step1Valid = name.trim() && selTraits.length === 2 && points === 0;
  const step2Valid = !!selGoal;

  const begin = () => {
    if (!step1Valid || !step2Valid) return;
    const ng = makeInitState();
    ng.name = name.trim();
    ng.face = {...face};
    ng.stats = {...stats};
    ng.traits = [...selTraits];
    ng.goal = selGoal;
    selTraits.forEach(tid => {
      const t = TRAITS.find(x => x.id === tid);
      if (t) t.apply(ng);
    });
    ng.maxHp = 25 + ng.stats.CON * 3 + ng.hpBonus;
    ng.hp = ng.maxHp;
    onStart(ng);
  };

  // Get current part option name for display
  const partLabel = (partKey) => {
    const part = FACE_PARTS[partKey];
    const opt = part.options.find(o => o.id === face[partKey]);
    return opt ? opt.name : '';
  };

  return (
    <div className="create-screen">
      {step === 1 && onBack && (
        <button className="back-topleft" onClick={onBack}>← 返回</button>
      )}
      <div className="create-header">
        <div className="create-title">
          {step === 1 ? '⚔ 创建冒险者' : '✦ 你的命题'}
        </div>
        <div className="create-subtitle">
          {step === 1 ? 'WHO ARE YOU' : 'YOUR DESTINY'}
        </div>
        <div className="create-step-bar">
          <span className={`step-dot ${step>=1?'on':''} ${step===1?'current':''}`}>① 角色</span>
          <span className="step-dash"/>
          <span className={`step-dot ${step>=2?'on':''} ${step===2?'current':''}`}>② 命题</span>
        </div>
      </div>

      {step === 1 && (
        <>
          {/* Big face preview */}
          <div className="face-preview-area">
            <div className="face-preview-frame">
              <FaceAvatar face={face} size={150} />
              <button className="dice-shuffle" onClick={randomize} title="随机">🎲</button>
            </div>
            <input className="face-name-input" value={name} maxLength={10}
              onChange={e=>setName(e.target.value)} placeholder="你的名字..." />
          </div>

          {/* Bottom tabbed area */}
          <div className="create-tabs">
            <button className={`create-tab ${bottomTab==='appearance'?'active':''}`}
              onClick={()=>setBottomTab('appearance')}>外貌</button>
            <button className={`create-tab ${bottomTab==='stats'?'active':''}`}
              onClick={()=>setBottomTab('stats')}>属性 {points>0 && <span className="tab-dot">●</span>}</button>
            <button className={`create-tab ${bottomTab==='traits'?'active':''}`}
              onClick={()=>setBottomTab('traits')}>特性 {selTraits.length<2 && <span className="tab-dot">●</span>}</button>
          </div>

          <div className="create-tab-body">
            {bottomTab === 'appearance' && (
              <div className="part-cyclers">
                {Object.entries(FACE_PARTS).map(([key, part]) => {
                  const opt = part.options.find(o => o.id === face[key]);
                  return (
                    <div key={key} className="part-cycler">
                      <button className="cycler-arrow" onClick={()=>cyclePart(key, -1)}>◀</button>
                      <div className="cycler-content">
                        <div className="cycler-label">{part.label}</div>
                        <div className="cycler-value">
                          {opt?.color && <span className="color-swatch" style={{background:opt.color}}/>}
                          {opt?.name}
                        </div>
                      </div>
                      <button className="cycler-arrow" onClick={()=>cyclePart(key, 1)}>▶</button>
                    </div>
                  );
                })}
              </div>
            )}

            {bottomTab === 'stats' && (
              <div className="tab-content-stats">
                <div className="pts-bar">剩余点数 <span className="pts-num">{points}</span> / 10</div>
                <div className="stat-grid">
                  {STAT_META.map(s => (
                    <div key={s.key} className="stat-row">
                      <span className="stat-row-icon">{s.icon}</span>
                      <span className="stat-row-name">{s.name}</span>
                      <button className="stat-btn" onClick={()=>adj(s.key,-1)} disabled={stats[s.key]<=1}>−</button>
                      <span className="stat-row-val">{stats[s.key]}</span>
                      <button className="stat-btn" onClick={()=>adj(s.key,1)} disabled={points<=0}>+</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bottomTab === 'traits' && (
              <div className="tab-content-traits">
                <div className="trait-hint">选择 2 个特性 · 已选 {selTraits.length}/2</div>
                <div className="trait-grid">
                  {TRAITS.map(t => {
                    const sel = selTraits.includes(t.id);
                    const dis = !sel && selTraits.length >= 2;
                    return (
                      <div key={t.id}
                        className={`trait-card ${sel?'selected':''} ${dis?'disabled':''}`}
                        onClick={()=>toggleTrait(t.id)}>
                        <div className="trait-name">{sel?'✓ ':''}{t.name}</div>
                        <div className="trait-desc">{t.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <div className="create-body">
          <div style={{padding:'8px 4px 16px',textAlign:'center',color:'var(--text2)',fontSize:'0.85rem',lineHeight:1.7}}>
            这是你为自己设下的命题。<br/>
            它将决定这一段冒险的方向，与最终的归宿。
          </div>
          <div className="goal-list">
            {GOALS.map(g => (
              <div key={g.id}
                className={`goal-card big ${selGoal===g.id?'selected':''}`}
                onClick={()=>setSelGoal(g.id)}>
                <div className="goal-card-top">
                  <div className="goal-icon big">{g.icon}</div>
                  <div className="goal-card-title">
                    <div className="goal-name">{g.name}</div>
                    <div className="goal-desc">{g.desc}</div>
                  </div>
                </div>
                {g.id === 'glory' && (
                  <div className="goal-quote">「让吟游诗人为你写下传记。」</div>
                )}
                {g.id === 'wealth' && (
                  <div className="goal-quote">「金币不会撒谎，它只会让人微笑。」</div>
                )}
                {g.id === 'dragon' && (
                  <div className="goal-quote">「真正的勇者，从不向命运低头。」</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="create-footer">
        {step === 1 && (
          <button className="start-btn" disabled={!step1Valid} onClick={()=>setStep(2)}>
            下 一 步 →
          </button>
        )}
        {step === 2 && (
          <>
            <button className="back-step-btn" onClick={()=>setStep(1)}>← 返回</button>
            <button className="start-btn primary-btn" disabled={!step2Valid} onClick={begin}>
              踏 上 旅 途 →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
