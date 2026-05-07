import React from 'react';
import { FaceAvatar } from './FaceAvatar.jsx';
import { SKILLS } from '../data/gamedata.js';
import { DdsIcon } from './DdsIcon.jsx';
export { CombatScreen };

const AVATARS = undefined; // legacy fallback (was window.GAMEDATA.AVATARS, never defined in v14)

function CombatScreen({ combat, gs, onRoll, onFlee, onExit, onSkill }) {
  const { enemy, playerHp, log, turn, diceVal, rolling, done, won, playerAnim, enemyAnim, playerDmg, enemyDmg, buffs } = combat;
  const logRef = React.useRef(null);

  React.useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const playerHpPct = Math.max(0, playerHp / gs.maxHp * 100);
  const enemyHpPct  = Math.max(0, enemy.currentHp / enemy.hp * 100);
  const winRate     = calcRate(gs.stats.STR, gs.stats.LCK);

  const playerSkills = (gs.skills || []).map(sid => SKILLS[sid]).filter(Boolean);

  return (
    <div className="combat-screen">
      <div className="combat-topbar">
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
          <div className="enemy-tier">👹 等阶 {enemy.tier}</div>
          <div style={{marginLeft:'auto',fontSize:'0.68rem',color:'var(--text3)'}}>回合 {turn}</div>
        </div>
        <div className="combat-fighters">
          <div className="fighter-info">
            <div className="fighter-name">{gs.name} · Lv{gs.level||1}</div>
            <div className="fighter-atk">ATK {gs.stats.STR} · LCK {gs.stats.LCK}</div>
            <div className="fighter-hp-bar">
              <div className="fighter-hp-fill player" style={{width:playerHpPct+'%'}} />
            </div>
            <div className="fighter-hp-text">{playerHp} / {gs.maxHp}</div>
            {buffs && buffs.length > 0 && (
              <div className="fighter-buffs">
                {buffs.map((b,i) => <span key={i} className="buff-chip">{SKILLS[b]?.icon}</span>)}
              </div>
            )}
          </div>
          <div className="win-chance">
            {!done && <>
              <div className="win-chance-label">命中率</div>
              <div className={`win-chance-val ${winRate>=60?'':winRate>=35?'mid':'low'}`}>{winRate.toFixed(0)}%</div>
            </>}
            {done && <div style={{fontSize:'1.4rem'}}>{won?'🏆':'💀'}</div>}
          </div>
          <div className="fighter-info enemy">
            <div className="fighter-name">{enemy.name}</div>
            <div className="fighter-atk">ATK {enemy.atk}</div>
            <div className="fighter-hp-bar">
              <div className="fighter-hp-fill enemy" style={{width:enemyHpPct+'%'}} />
            </div>
            <div className="fighter-hp-text">{enemy.currentHp} / {enemy.hp}</div>
          </div>
        </div>
      </div>

      <div className="combat-scene">
        <div className="combat-scene-inner">
          <div className="pixel-char">
            <div className={`pixel-char-sprite ${playerAnim||''}`} style={{display:'flex',justifyContent:'center'}}>
              {gs.face ? <FaceAvatar face={gs.face} size={70} /> :
                ((AVATARS||[]).find(a => a.id === gs.avatar) || (AVATARS||[])[0] || {emoji:'🧙'}).emoji}
            </div>
            <div className="pixel-char-shadow" />
            {enemyDmg && <div className="dmg-float enemy-dmg">-{enemyDmg}</div>}
          </div>
          <div style={{position:'relative',flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
            {diceVal && !rolling && !done && (
              <div style={{
                background:'rgba(0,0,0,0.65)',
                color:'#f0d080',
                borderRadius:6,
                padding:'4px 14px',
                fontSize:'1.2rem',
                fontWeight:700,
                fontFamily:'Georgia,serif',
              }}>D20: {diceVal}</div>
            )}
          </div>
          <div className="pixel-char">
            <div className={`pixel-char-sprite ${enemyAnim||''}`}
              style={{transform:'scaleX(-1)', filter: enemy.currentHp<=0 ? 'grayscale(1) opacity(0.3)' : 'drop-shadow(2px 6px 10px rgba(0,0,0,0.6))'}}>
              {enemy.emoji}
            </div>
            <div className="pixel-char-shadow" />
            {playerDmg && <div className="dmg-float player-dmg">-{playerDmg}</div>}
          </div>
        </div>
      </div>

      <div className="combat-log" ref={logRef}>
        {log.map((line, i) => {
          let cls = 'sys';
          if (line.startsWith('✦')) cls = 'crit';
          else if (line.startsWith('✓')) cls = 'hit';
          else if (line.startsWith('✕')) cls = 'miss';
          else if (line.startsWith('💢') || line.startsWith('💀')) cls = 'hurt';
          else if (line.startsWith('🏆')) cls = 'hit';
          return <div key={i} className={`log-line ${cls}`}>{line}</div>;
        })}
      </div>

      <div className="combat-actions">
        {!done ? (
          <>
            <div className="combat-dice-row">
              <div className={`inline-dice ${rolling?'rolling':''}`}>
                <div className="inline-dice-num">{diceVal || '?'}</div>
              </div>
              <div className="combat-action-btns">
                <button className="combat-btn primary" onClick={onRoll} disabled={rolling}>
                  <span className="combat-btn-icon">⚔️</span>
                  攻击（掷骰子）
                </button>
                <button className="combat-btn danger" onClick={onFlee} disabled={rolling}>
                  <span className="combat-btn-icon">🏳️</span>
                  逃跑
                  <span className="combat-btn-sub">HP -40%</span>
                </button>
              </div>
            </div>
            {playerSkills.length > 0 && (
              <div className="combat-skills">
                {playerSkills.map(s => {
                  const cd = combat.skillCooldowns?.[s.id] || 0;
                  const disabled = cd > 0 || rolling;
                  return (
                    <button key={s.id} className={`skill-btn ${disabled?'disabled':''}`}
                      onClick={()=>!disabled && onSkill(s)}>
                      <span className="skill-btn-icon">
                        <DdsIcon id={s.id} size={30} fallback={s.icon} />
                      </span>
                      <span className="skill-btn-name">{s.name}</span>
                      {cd > 0 && <span className="skill-btn-cd">{cd}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <button className="combat-btn primary" style={{width:'100%'}} onClick={onExit}>
            {won ? '🏆 凯旋归来 →' : '💀 接受命运 →'}
          </button>
        )}
      </div>
    </div>
  );
}
