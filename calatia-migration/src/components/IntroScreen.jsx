import React from 'react';
import { FaceAvatar } from './FaceAvatar.jsx';
import { TRAITS, GOALS } from '../data/gamedata.js';
import { Typewriter } from './Typewriter.jsx';
export { IntroScreen };

function IntroScreen({ gs, onContinue }) {
  const goal = GOALS.find(g => g.id === gs.goal);
  const primaryTrait = gs.traits.length > 0
    ? TRAITS.find(t => t.id === gs.traits[0])
    : null;
  const secondaryTrait = gs.traits.length > 1
    ? TRAITS.find(t => t.id === gs.traits[1])
    : null;

  return (
    <div className="intro-screen">
      <div className="intro-header">
        <div className="intro-avatar" style={{padding:0,border:'2px solid rgba(30,20,10,0.4)'}}>
          {gs.face ? <FaceAvatar face={gs.face} size={52} /> : '🧙'}
        </div>
        <div>
          <div className="intro-name">{gs.name}</div>
          <div className="intro-trait">
            {primaryTrait?.name}{secondaryTrait?` · ${secondaryTrait.name}`:''}
          </div>
        </div>
      </div>
      <div className="intro-body">
        <div className="intro-chapter">序 章</div>
        <div className="intro-title">命途的开始</div>

        {primaryTrait?.intro && (
          <div className="intro-text">{primaryTrait.intro}</div>
        )}
        {secondaryTrait?.intro && (
          <div className="intro-text">{secondaryTrait.intro}</div>
        )}

        <div className="intro-text">
          某天清晨，你收拾好简单的行装，告别熟悉的一切，向着未知的远方迈出了第一步。前方等待你的，会是命运的眷顾，还是无情的玩笑？
        </div>

        {goal && (
          <div className="intro-goal-box">
            <div className="intro-goal-label">─── 你的命题 ───</div>
            <div className="intro-goal-name">{goal.icon} {goal.name}</div>
            <div className="intro-goal-desc">{goal.desc}</div>
          </div>
        )}
      </div>
      <div className="intro-btn-row">
        <button className="intro-btn" onClick={onContinue}>开 始 旅 程 →</button>
      </div>
    </div>
  );
}
