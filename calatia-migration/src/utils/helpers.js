// Verbatim from v14
import { SKILLS } from '../data/gamedata.js';
import { toast } from './toast.js';

export function calcRate(stat = 5, lck = 5) {
  return Math.min(95, Math.max(5, 50 + (stat - 5) * 8 + (lck - 5) * 2));
}

// Spend 1 daily action; returns false if no actions left (dialog should refuse)
export function consumeAction(setGS, gs) {
  if (gs.actionsLeft <= 0) {
    toast('🌙 今天已经精疲力尽了，需要休息');
    return false;
  }
  setGS(g => ({ ...g, actionsLeft: g.actionsLeft - 1 }));
  return true;
}

// Sleep: advance to next day, restore actions, partial HP
export function sleepNight(setGS) {
  setGS(g => ({
    ...g,
    day: g.day + 1,
    actionsLeft: g.actionsPerDay,
    healUsedToday: false,
    hp: Math.min(g.maxHp, g.hp + Math.round(g.maxHp * 0.4)),
  }));
  toast('🌙 你休息了一晚，恢复了体力');
}

// Apply EXP gain & handle level-up; returns array of unlocked skills
export function gainExp(gs, amount) {
  const ng = { ...gs };
  ng.exp = (ng.exp || 0) + amount;
  const unlocked = [];
  while (ng.exp >= ng.expMax) {
    ng.exp -= ng.expMax;
    ng.level += 1;
    ng.expMax = Math.round(ng.expMax * 1.4);
    ng.freeStatPoints = (ng.freeStatPoints || 0) + 2;
    ng.maxHp += 5;
    ng.hp += 5;
    // Auto-unlock skills available at this level
    Object.values(SKILLS).forEach(s => {
      if (s.unlockLv === ng.level && !ng.skills.includes(s.id)) {
        ng.skills = [...ng.skills, s.id];
        unlocked.push(s);
      }
    });
  }
  return { state: ng, unlocked };
}
