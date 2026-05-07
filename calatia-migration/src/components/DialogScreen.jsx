import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Typewriter } from './Typewriter.jsx';
import { DIALOGS } from '../data/gamedata.js';
import { RPGIcon } from './RPGIcon.jsx';
export { DialogScreen };

// Separate component so useEffect for image load/cached runs reliably
function StoryImage({ p, idx, isActive, onDone }) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    const img = imgRef.current;
    if (!img) return;
    // Already loaded (cached) — advance after brief pause
    if (img.complete) {
      const t = setTimeout(() => onDone(idx), 700);
      return () => clearTimeout(t);
    }
    // Otherwise wait for onLoad / onError (set via ref handlers below)
  }, [isActive, idx, onDone]);

  const handleLoad = useCallback(() => {
    if (!isActive) return;
    setTimeout(() => onDone(idx), 700);
  }, [isActive, idx, onDone]);

  const handleError = useCallback(() => {
    if (!isActive) return;
    onDone(idx);
  }, [isActive, idx, onDone]);

  return (
    <div className={`story-image-wrap ${isActive ? 'anim-fadein' : ''}`}>
      <img
        ref={imgRef}
        src={p.src}
        alt={p.alt || ''}
        className="story-image"
        onLoad={handleLoad}
        onError={handleError}
      />
      {p.caption && <div className="story-image-caption">{p.caption}</div>}
    </div>
  );
}

function calcRate(stat, wis) {
  const base = 40 + (stat - 5) * 5 + (wis - 5) * 2;
  return Math.min(90, Math.max(10, base));
}

const STAT_LABEL = {
  STR: '力量', AGI: '敏捷', INT: '智力', WIS: '感知',
  CHA: '魅力', CON: '体质', LCK: '幸运',
};
// Map stat/action → RPGIcon type
const STAT_ICON_TYPE = {
  STR: 'STR', AGI: 'AGI', INT: 'INT', WIS: 'WIS',
  CHA: 'CHA', CON: 'CON', LCK: 'LCK',
};

function rateColor(r) {
  if (r >= 70) return '#2a6e45';
  if (r >= 45) return '#9a6010';
  return '#a02818';
}

function getIconType(c) {
  if (c.stat)           return STAT_ICON_TYPE[c.stat] || 'DEFAULT';
  if (c.triggerCombat)  return 'COMBAT';
  if (c.cost?.gold)     return 'GOLD';
  if (c.back || c._close) return 'BACK';
  if (c.goto || c.successGoto) return 'GOTO';
  return 'DEFAULT';
}

function DialogScreen({ dialogId, storyLog, choices, gs, onChoose, onBack }) {
  const d = DIALOGS[dialogId];
  const bodyRef = useRef(null);

  // Track how many paragraphs have finished typewriting
  const [revealed, setRevealed] = useState(0);

  // No reset effect needed — App.jsx passes a fresh `key` prop whenever
  // a new dialog is opened from the map, which causes this component to
  // re-mount and start with revealed=0 naturally.

  // When storyLog grows (new paragraphs appended after a choice), the
  // existing revealed count stays valid — new paragraphs start typewriting
  // from where we left off. We just need to make sure revealed doesn't
  // accidentally exceed the new length (it can't shrink).

  // visibleCount: show up to (revealed + 1) so the current paragraph types,
  // but never more than the actual log length.
  const visibleCount = Math.min(revealed + 1, storyLog.length);
  const allDone = storyLog.length > 0 && revealed >= storyLog.length;

  // Auto-advance past structural elements (dividers and chapter headers)
  useEffect(() => {
    const current = storyLog[revealed];
    if (current?.type === 'divider') {
      setRevealed(r => r + 1);
    } else if (current?.type === 'chapter') {
      // Brief pause so the chapter title animates in before next paragraph
      const t = setTimeout(() => setRevealed(r => r + 1), 350);
      return () => clearTimeout(t);
    }
  }, [revealed, storyLog]);

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visibleCount]);

  if (!d) return null;

  const onParaDone = (idx) => {
    // Only advance if this is still the current paragraph (not an old one)
    setRevealed(r => (r === idx ? r + 1 : r));
  };

  return (
    <div className="dialog-screen">
      <div className="dialog-header">
        <button className="dialog-back-btn" onClick={onBack}>←</button>
        <div className="dialog-icon">{d.icon}</div>
        <div className="dialog-title-block">
          <div className="dialog-title">{d.title}</div>
          {d.subtitle && <div className="dialog-sub">{d.subtitle}</div>}
        </div>
      </div>

      <div className="dialog-body" ref={bodyRef}>
        {storyLog.slice(0, visibleCount).map((p, i) => {
          const isActive = i === visibleCount - 1 && !allDone;

          if (p.type === 'divider') {
            return <div key={i} className="story-divider">· · ·</div>;
          }

          if (p.type === 'chapter') {
            return (
              <div key={i} className="story-chapter">
                <div className="story-chapter-rule" />
                <div className="story-chapter-label">
                  {p.icon && <span className="story-chapter-icon">{p.icon}</span>}
                  <span className="story-chapter-title">{p.title}</span>
                </div>
                <div className="story-chapter-rule" />
              </div>
            );
          }

          if (p.type === 'image') {
            return <StoryImage key={i} p={p} idx={i} isActive={isActive} onDone={onParaDone} />;
          }

          if (p.type === 'result') {
            return (
              <div key={i} className={`story-result ${p.success ? 'success' : 'fail'}`}>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {isActive
                    ? <Typewriter text={p.text} speed={25} onDone={() => onParaDone(i)} />
                    : p.text}
                </div>
                {p.outcome && !isActive && (
                  <div className="story-rewards">
                    {p.outcome.gold ? <span className={`reward-tag ${Math.abs(p.outcome.gold) >= 50 ? 'big' : ''}`}>💰 {p.outcome.gold > 0 ? '+' : ''}{p.outcome.gold}</span> : null}
                    {p.outcome.hp && p.outcome.hp < 999 ? <span className="reward-tag">❤️ {p.outcome.hp > 0 ? '+' : ''}{p.outcome.hp}</span> : null}
                    {p.outcome.hp >= 999 ? <span className="reward-tag">❤️ 满血</span> : null}
                    {p.outcome.exp ? <span className="reward-tag">✨ +{p.outcome.exp}</span> : null}
                    {p.outcome.fame ? <span className={`reward-tag ${Math.abs(p.outcome.fame) >= 15 ? 'big' : ''}`}>🏅 {p.outcome.fame > 0 ? '+' : ''}{p.outcome.fame}</span> : null}
                    {p.outcome.herb ? <span className="reward-tag">🌿 {p.outcome.herb > 0 ? '+' : ''}{p.outcome.herb}</span> : null}
                    {p.outcome.items?.map((it, j) => <span key={j} className="reward-tag big">📦 {it}</span>)}
                    {p.outcome.stats && Object.entries(p.outcome.stats).map(([k, v]) => <span key={k} className="reward-tag big">{k} {v > 0 ? '+' : ''}{v}</span>)}
                  </div>
                )}
              </div>
            );
          }

          // Regular story paragraph
          return (
            <div key={i} className={`story-para ${p.type || ''}`}>
              {isActive
                ? <Typewriter text={p.text} speed={28} onDone={() => onParaDone(i)} />
                : p.text}
            </div>
          );
        })}
      </div>

      {/* Only show choices once all paragraphs have finished */}
      {allDone && (
        <div className="dialog-choices">
          {choices.map((c, i) => {
            const disabled = (c.cost?.gold > gs.gold) ||
              (c.requires && Object.entries(c.requires).some(([k, v]) => (gs[k] || 0) < v));
            const rate = c.stat ? calcRate(gs.stats[c.stat], gs.stats.WIS) : null;
            const isPrimary = (choices.length === 1 && !c.stat) || c._close;
            const iconType = getIconType(c);
            const iconColor = disabled ? undefined
              : rate !== null ? rateColor(rate)
              : 'var(--paper-text2)';
            return (
              <button
                key={i}
                className={`choice-btn ${disabled ? 'disabled' : ''} ${isPrimary ? 'primary' : ''} ${rate !== null ? 'has-rate' : ''}`}
                onClick={() => !disabled && onChoose(c)}
              >
                <RPGIcon type={iconType} size={18} color={iconColor} />
                <span className="choice-btn-body">
                  <span className="choice-btn-text">{c.text}</span>
                  {rate !== null && (
                    <span className="choice-btn-rate" style={{ color: rateColor(rate) }}>
                      {STAT_LABEL[c.stat]} · {rate.toFixed(1)}%
                    </span>
                  )}
                  {!rate && c.cost?.gold && (
                    <span className="choice-btn-rate" style={{ color: '#7a6020' }}>
                      花费 {c.cost.gold} 金币
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
