import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Typewriter } from './Typewriter.jsx';
import { Icon } from '@iconify/react';
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

// Standalone narrative icon (game-icons.net via Iconify).
// Auto-advances the typewriter chain immediately when it becomes active.
function StoryIcon({ p, idx, isActive, onDone }) {
  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => onDone(idx), 200);
      return () => clearTimeout(t);
    }
  }, [isActive, idx, onDone]);

  return (
    <div className={`story-icon-row ${isActive ? 'anim-fadein' : ''}`}>
      <Icon
        icon={`game-icons:${p.name}`}
        width={p.size || 56}
        height={p.size || 56}
        color={p.color || '#d4a020'}
      />
      {p.label && <div className="story-icon-label">{p.label}</div>}
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

// Heuristic: a back-style choice whose text reads as a refusal (拒绝 / 不 ...
// / "no") gets the cancel icon instead of the generic exit-door.
function isRefuseChoice(c) {
  if (!c.back && !c._close) return false;
  const t = (c.text || '').replace(/[「」『』""'']/g, '').trim();
  return t.includes('拒绝') || /^不[要愿想敢去做]/.test(t) || /^no\b/i.test(t);
}

function getIconType(c) {
  if (c.stat)           return STAT_ICON_TYPE[c.stat] || 'DEFAULT';
  if (c.triggerCombat)  return 'COMBAT';
  if (c.cost?.gold)     return 'GOLD';
  // Effect-driven types take precedence over navigation flags so a "heal +
  // close dialog" reads as HEAL, not BACK.
  const r = c.result;
  if (r?.sleep)                            return 'REST';
  if ((r?.hp ?? 0) > 0 || r?.healUsed)     return 'HEAL';
  if (isRefuseChoice(c))                   return 'REFUSE';
  if (c.back || c._close)                  return 'BACK';
  if (c.goto || c.successGoto)             return 'GOTO';
  return 'DEFAULT';
}

// game-icons.net id per choice type. All names verified to exist in the
// game-icons collection so they render properly via Iconify.
const TYPE_TO_GAME_ICON = {
  STR:     'biceps',
  AGI:     'fast-arrow',
  INT:     'brain',
  WIS:     'all-seeing-eye',
  CHA:     'public-speaker',
  CON:     'heart-shield',
  LCK:     'rolling-dices',
  COMBAT:  'crossed-swords',
  GOLD:    'two-coins',
  HEAL:    'health-potion',
  REST:    'bed',
  REFUSE:  'cancel',
  BACK:    'exit-door',
  GOTO:    'compass',
  DEFAULT: 'compass',
};

// Distinct accent color per type — gives the player an at-a-glance read of
// what kind of action each option is.
const TYPE_TO_COLOR = {
  STR:     '#c4392b',
  AGI:     '#2f7bbf',
  INT:     '#7a4eb0',
  WIS:     '#2d8b9a',
  CHA:     '#d4a020',
  CON:     '#58a35a',
  LCK:     '#d480d4',
  COMBAT:  '#a02818',
  GOLD:    '#b8860b',
  HEAL:    '#58a35a',  // healing green
  REST:    '#7a8ec4',  // calm blue
  REFUSE:  '#a02818',  // crimson (firm refusal)
  BACK:    '#7a6a55',
  GOTO:    '#9a7a3a',
  DEFAULT: '#9a7a3a',
};

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

  // After a choice, scroll so that the FIRST newly-appended paragraph appears
  // at the top of the viewport — the player reads new content like a new page
  // unfolding downward. We track the previous storyLog length to identify
  // where "new content" begins.
  const prevLenRef = useRef(0);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const prev = prevLenRef.current;
    const grew = storyLog.length > prev;
    prevLenRef.current = storyLog.length;
    const id = requestAnimationFrame(() => {
      if (grew && prev > 0) {
        // Scroll the first new paragraph to the top of the visible area.
        const target = el.querySelectorAll('.story-para, .story-result, .story-image-wrap, .story-icon-row, .story-chapter')[prev];
        if (target) {
          el.scrollTo({ top: target.offsetTop - el.offsetTop, behavior: 'smooth' });
          return;
        }
      }
      // Fallback (initial mount, typewriter unfolding within the same scene):
      // keep things glued to the bottom so the active paragraph stays visible.
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(id);
  // Joined string key keeps the deps array length stable across HMR.
  }, [`${storyLog.length}|${visibleCount}|${(choices || []).length}`]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!d) return null;

  const onParaDone = (idx) => {
    // Only advance if this is still the current paragraph (not an old one)
    setRevealed(r => (r === idx ? r + 1 : r));
  };

  return (
    <div className="dialog-screen">
      <div className="dialog-header">
        <button className="dialog-back-btn" onClick={onBack} aria-label="返回">
          <Icon icon="game-icons:plain-arrow" width={22} height={22} color="#7a6a55"
                style={{ transform: 'rotate(90deg)' }} />
        </button>
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

          // Inline narrative icon — uses game-icons.net via Iconify.
          // Authors write: { type:'icon', name:'torch', label:'火把', size:56 }
          // `name` is a game-icons id (see https://game-icons.net for the catalog).
          if (p.type === 'icon') {
            return <StoryIcon key={i} p={p} idx={i} isActive={isActive} onDone={onParaDone} />;
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
            const gameIconName = c.icon !== undefined
              ? c.icon
              : (TYPE_TO_GAME_ICON[iconType] || null);
            // For stat checks the icon color reflects the success rate; for
            // other typed choices we use the type's accent color so combat /
            // back / cost are instantly visually distinct.
            const iconColor = disabled ? '#a89070'
              : rate !== null ? rateColor(rate)
              : (TYPE_TO_COLOR[iconType] || '#9a7a3a');
            return (
              <button
                key={i}
                className={`choice-btn ${disabled ? 'disabled' : ''} ${isPrimary ? 'primary' : ''} ${rate !== null ? 'has-rate' : ''}`}
                onClick={() => !disabled && onChoose(c)}
              >
                {gameIconName && (
                  <Icon
                    icon={`game-icons:${gameIconName}`}
                    width={20}
                    height={20}
                    color={iconColor}
                    style={{ flexShrink: 0 }}
                  />
                )}
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
