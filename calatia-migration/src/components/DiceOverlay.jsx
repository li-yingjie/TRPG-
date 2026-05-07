import React from 'react';
export { DiceOverlay };

function DiceOverlay({ state, onConfirm }) {
  const STAT_INFO = {
    STR: {icon:'⚔️', name:'力量'},
    AGI: {icon:'💨', name:'敏捷'},
    INT: {icon:'✨', name:'智力'},
    CHA: {icon:'💛', name:'魅力'},
    VIT: {icon:'💚', name:'体力'},
    LCK: {icon:'🔮', name:'幸运'},
  };
  const info = STAT_INFO[state.stat] || {icon:'🎲', name:state.stat};

  let verdict = '';
  let verdictClass = '';
  if (!state.rolling && state.roll != null) {
    if (state.isCrit) { verdict = '✦ 大成功！'; verdictClass = 'crit'; }
    else if (state.isFumble) { verdict = '✕ 大失败...'; verdictClass = 'fumble'; }
    else if (state.success) { verdict = '✓ 成功'; verdictClass = 'success'; }
    else { verdict = '✕ 失败'; verdictClass = 'fail'; }
  }

  return (
    <div className="dice-overlay">
      <div className="dice-attr-label">{info.icon} {info.name} 判定</div>
      <div className="dice-rate-info">成功率 {state.rate.toFixed(1)}%</div>
      <div className={`d20-dice ${state.rolling?'rolling':''}`}>
        <div className="d20-shape">
          <div className="d20-num">{state.roll || '?'}</div>
        </div>
      </div>
      <div className={`dice-verdict ${verdictClass}`}>{verdict}</div>
      <button className="dice-cont-btn" onClick={onConfirm} disabled={state.rolling}>
        {state.rolling ? '掷骰中...' : '继续'}
      </button>
    </div>
  );
}
