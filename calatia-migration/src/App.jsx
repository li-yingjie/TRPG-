import React, { useState, useEffect, useRef } from 'react';
import { TitleScreen } from './components/TitleScreen.jsx';
import { CreateScreen } from './components/CreateScreen.jsx';
import { IntroScreen } from './components/IntroScreen.jsx';
import { MapScreen } from './components/MapScreen.jsx';
import { DialogScreen } from './components/DialogScreen.jsx';
import { CombatScreen } from './components/CombatScreen.jsx';
import { EndingScreen } from './components/EndingScreen.jsx';
import { TopStatus } from './components/TopStatus.jsx';
import { BottomNav } from './components/BottomNav.jsx';
import { DrawerPanel } from './components/DrawerPanel.jsx';
import { DiceOverlay } from './components/DiceOverlay.jsx';
import { QuestLog } from './components/QuestLog.jsx';
import { ItemShowcase } from './components/ItemShowcase.jsx';
import { calcRate, gainExp } from './utils/helpers.js';
import { toast } from './utils/toast.js';
import {
  QUESTS, DIALOGS, MAPS, ENEMIES, TRAITS, GOALS, ENDINGS, SKILLS,
  WORLD_NODES, TOWN_NODES, HARBOR_NODES, CRYPT_NODES,
  ITEM_INFO, ALL_WORLD_NODES,
} from './data/gamedata.js';
import { makeInitState } from './utils/initState.js';
import { writeSave, loadSave, SLOT_AUTO } from './utils/save.js';
import { SettingsPanel, loadFontSettings, applyFontSettings } from './components/SettingsPanel.jsx';
import { preloadSceneImages } from './utils/preload.js';
import { ZoomMap } from './components/ZoomMap.jsx';


export default function App() {
  const [gs, setGS] = useState(null);  // null until character created
  const [view, setView] = useState('title');  // 'title' | 'create' | 'map' | 'dialog' | 'ending'
  const [titlePanel, setTitlePanel] = useState(null); // 记录返回到标题页时应恢复的面板
  const [activeDialog, setActiveDialog] = useState(null);
  const [rootDialog, setRootDialog] = useState(null);
  const [storyLog, setStoryLog] = useState([]);
  const [pendingChoices, setPendingChoices] = useState([]);
  const [diceState, setDiceState] = useState(null);
  const [questLogOpen, setQuestLogOpen] = useState(false);
  const [itemShowcase, setItemShowcase] = useState(null);
  const [goldFlash, setGoldFlash] = useState(false);
  const [statUpToast, setStatUpToast] = useState(null);
  const [dialogKey, setDialogKey] = useState(0); // increments on fresh dialog open to re-mount DialogScreen
  const [combat, setCombat] = useState(null);
  const [pendingPostCombat, setPendingPostCombat] = useState(null);
  const [activeEnding, setActiveEnding] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState(null);  // 'character' | 'inventory' | 'quests' | 'log' | null
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Apply saved font settings on mount
  React.useEffect(() => { applyFontSettings(loadFontSettings()); }, []);
  // Warm the browser cache for every scene image up-front.
  React.useEffect(() => { preloadSceneImages(); }, []);

  // Check for ending whenever gs changes (in dialog/map only, not during combat)
  React.useEffect(() => {
    if (!gs || combat || activeEnding || view === 'create' || view === 'title') return;
    for (const ep of ENDINGS) {
      if (ep.check(gs)) {
        // Mark this ending as triggered (so it doesn't re-trigger)
        if (gs.flags?.includes(`ending_${ep.id}`)) continue;
        setGS(g => g ? ({...g, flags: [...g.flags, `ending_${ep.id}`]}) : g);
        setActiveEnding(ep);
        setView('ending');
        return;
      }
    }
  }, [gs?.hp, gs?.fame, gs?.gold, gs?.flags?.length, combat, activeEnding, view]);

  // ── 自动存档：gs 变化时（地图/对话中，非战斗/骰子状态）自动写槽 0 ──
  React.useEffect(() => {
    if (!gs || !['map', 'dialog'].includes(view) || combat || diceState) return;
    writeSave(SLOT_AUTO, gs);
  }, [gs]);

  // ── 读档：把存档里的 gs 恢复，view 回到 map ──
  const loadGame = (savedGs) => {
    setGS(savedGs);
    setView('map');
    setActiveDialog(null);
    setRootDialog(null);
    setStoryLog([]);
    setPendingChoices([]);
    setCombat(null);
    setActiveEnding(null);
    setActiveDrawer(null);
  };

  // Start a new game with created character → show intro first
  const startNewGame = (newGs) => {
    setGS(newGs);
    setView('intro');
    setActiveDialog(null);
    setRootDialog(null);
    setStoryLog([]);
    setPendingChoices([]);
    setActiveEnding(null);
  };

  const enterWorldFromIntro = () => {
    setView('map');
  };

  const goToTitle = (panel = null) => {
    setGS(null);
    setView('title');
    setTitlePanel(panel);
    setActiveDialog(null);
    setStoryLog([]);
    setPendingChoices([]);
    setCombat(null);
    setActiveEnding(null);
  };

  const currentMap = gs ? MAPS[gs.currentMap] : null;

  // Pick variant from a dialog
  const pickVariant = (dialogId, gsRef = gs) => {
    const d = DIALOGS[dialogId];
    if (!d) return null;
    const v = d.variants.find(v => v.when(gsRef));
    return { dialog:d, variant:v };
  };

  // Open a dialog from map (sets it as root)
  const openDialog = (dialogId) => {
    const r = pickVariant(dialogId);
    if (!r) { toast('对话未找到'); return; }
    setActiveDialog(dialogId);
    setRootDialog(dialogId);
    setStoryLog([...r.variant.paragraphs]);
    setPendingChoices(r.variant.choices);
    setDialogKey(k => k + 1); // fresh mount → revealed resets to 0
    setView('dialog');
  };

  // Map node click
  const onClickNode = (n) => {
    if (n.kind === 'future') {
      toast('🗺️ 这里的故事尚未揭晓...');
      return;
    }
    // Check unlock status
    const isUnlocked = (gs.unlockedNodes || []).includes(n.id);
    if (!isUnlocked) {
      toast(n.unlockHint || '🔒 你还不知道这是什么地方');
      return;
    }
    if (n.locked) { toast('🔒 暂时无法进入'); return; }
    if (n.kind === 'compound') {
      setGS(g => ({...g, currentMap: n.mapId, currentLocId: n.id}));
    } else if (n.kind === 'dialog') {
      // Free dialogs (own home, bulletin board) do not consume actions
      const FREE_DIALOGS = ['home_enter', 'bulletin_enter'];
      if (!FREE_DIALOGS.includes(n.dialogId)) {
        if (gs.actionsLeft <= 0) {
          toast('🌙 你今天精疲力尽，先回自宅休息吧');
          return;
        }
        setGS(g => ({...g, actionsLeft: g.actionsLeft - 1}));
      }
      openDialog(n.dialogId);
    }
  };

  const goBackMap = () => {
    if (currentMap.parent) {
      setGS(g => ({...g, currentMap: currentMap.parent}));
    }
  };

  const closeDialog = () => {
    setActiveDialog(null);
    setRootDialog(null);
    setStoryLog([]);
    setPendingChoices([]);
    setView('map');
  };

  // Apply effect to game state, returns flash/showcase triggers
  const applyEffect = (effect) => {
    if (!effect) return;

    // Trigger flashy feedbacks
    if (effect.gold && effect.gold >= 50) {
      setGoldFlash(true);
      setTimeout(()=>setGoldFlash(false), 800);
    }
    if (effect.stats) {
      const parts = Object.entries(effect.stats).map(([k,v]) => `${k} ${v>0?'+':''}${v}`);
      setStatUpToast(parts.join('  '));
      setTimeout(()=>setStatUpToast(null), 2000);
    }
    // Quest item showcase
    if (effect.questItems && effect.questItems.length) {
      const itemId = effect.questItems[0];
      const info = ITEM_INFO[itemId];
      if (info) {
        setTimeout(() => setItemShowcase(info), 400);
      }
    }
    // Regular important item showcase
    if (effect.items && effect.items.length) {
      const itemName = effect.items[0];
      const info = ITEM_INFO[itemName];
      if (info && (itemName.length > 2 || info.name.length > 3)) {
        // Show only "story" items (named, not generic loot)
        if (['老兵的短匕','基础魔法导引','古护身符'].includes(itemName)) {
          setTimeout(() => setItemShowcase(info), 400);
        }
      }
    }

    setGS(g => {
      const ng = { ...g };
      if (effect.gold) ng.gold = Math.max(0, ng.gold + effect.gold);
      if (effect.sleep) {
        ng.day += 1;
        ng.actionsLeft = ng.actionsPerDay;
        ng.healUsedToday = false;
        ng.hp = Math.min(ng.maxHp, ng.hp + Math.round(ng.maxHp * 0.5));
      }
      if (effect.healUsed) {
        ng.healUsedToday = true;
      }
      if (effect.unlock) {
        // Unlock one or more node ids (string or array)
        const ids = Array.isArray(effect.unlock) ? effect.unlock : [effect.unlock];
        const newOnes = ids.filter(id => !ng.unlockedNodes.includes(id));
        if (newOnes.length > 0) {
          ng.unlockedNodes = [...ng.unlockedNodes, ...newOnes];
          // Show toast for each new unlock
          setTimeout(() => {
            newOnes.forEach((nid, i) => {
              setTimeout(() => {
                const allNodes = [
                  ...(WORLD_NODES||[]),
                  ...(TOWN_NODES||[]),
                  ...(HARBOR_NODES||[]),
                  ...(CRYPT_NODES||[]),
                ];
                const node = allNodes.find(n => n.id === nid);
                if (node) {
                  setStatUpToast(`📍 新地点：${node.icon} ${node.name}`);
                  setTimeout(() => setStatUpToast(null), 2200);
                }
              }, i * 2400);
            });
          }, 200);
        }
      }
      if (effect.hp) {
        if (effect.hp >= 999) ng.hp = ng.maxHp;
        else ng.hp = Math.max(0, Math.min(ng.maxHp, ng.hp + effect.hp));
      }
      if (effect.exp) {
        // Apply exp + check level-up
        const result = gainExp(ng, effect.exp);
        ng.exp = result.state.exp;
        ng.level = result.state.level;
        ng.expMax = result.state.expMax;
        ng.maxHp = result.state.maxHp;
        ng.hp = result.state.hp;
        ng.freeStatPoints = result.state.freeStatPoints;
        ng.skills = result.state.skills;
        // Show toast outside setState
        if (result.unlocked.length || result.state.level > g.level) {
          setTimeout(() => {
            if (result.state.level > g.level) {
              setStatUpToast(`🎉 升级！Lv.${result.state.level}`);
              setTimeout(() => setStatUpToast(null), 2200);
            }
            result.unlocked.forEach((s, i) => {
              setTimeout(() => setItemShowcase({
                icon: s.icon, name: '解锁技能：'+s.name, desc: s.desc,
              }), 800 + i*1500);
            });
          }, 200);
        }
      }
      if (effect.fame) ng.fame += effect.fame;
      if (effect.herb) ng.herb = Math.max(0, ng.herb + effect.herb);
      if (effect.items) ng.inventory = [...ng.inventory, ...effect.items];
      if (effect.questItems) {
        effect.questItems.forEach(qi => {
          if (!ng.questItems.includes(qi)) ng.questItems = [...ng.questItems, qi];
        });
      }
      if (effect.removeItems) {
        ng.questItems = ng.questItems.filter(qi => !effect.removeItems.includes(qi));
        ng.inventory = ng.inventory.filter(it => !effect.removeItems.includes(it));
      }
      if (effect.flags) ng.flags = [...new Set([...ng.flags, ...effect.flags])];
      if (effect.stats) {
        ng.stats = { ...ng.stats };
        Object.entries(effect.stats).forEach(([k,v]) => { ng.stats[k] = (ng.stats[k]||0) + v; });
      }
      if (effect.questUpdate) {
        const [qid, step] = effect.questUpdate;
        ng.activeQuests = { ...ng.activeQuests };
        if (step === 'done') {
          delete ng.activeQuests[qid];
          if (!ng.doneQuests.includes(qid)) ng.doneQuests = [...ng.doneQuests, qid];
        } else {
          ng.activeQuests[qid] = step;
        }
      }
      return ng;
    });
  };

  // Choose an option
  const onChoose = (choice) => {
    // Check requires
    if (choice.requires) {
      for (const [k,v] of Object.entries(choice.requires)) {
        if ((gs[k]||0) < v) { toast(`需要 ${k} ≥ ${v}`); return; }
      }
    }
    if (choice.cost?.gold) {
      if (gs.gold < choice.cost.gold) { toast('金币不足'); return; }
      applyEffect({ gold: -choice.cost.gold });
    }

    // Trigger full combat (BOSS / important fight)
    if (choice.triggerCombat) {
      const enemyId = choice.triggerCombat;
      const enemy = ENEMIES[enemyId];
      if (!enemy) { toast(`敌人未定义: ${enemyId}`); return; }
      // Append a "你拔剑迎战" line to story log
      setStoryLog(prev => [...prev, { type:'system', text:`> 你选择：${choice.text}` }]);
      setPendingChoices([]);
      // Start combat
      setCombat({
        enemyId,
        enemy: { ...enemy, currentHp: enemy.hp },
        playerHp: gs.hp,
        log: [`⚔️ 与【${enemy.name}】的战斗开始了！`],
        turn: 0,
        diceVal: null,
        rolling: false,
        done: false,
        playerAnim: null,
        enemyAnim: null,
        buffs: [],            // active player buffs
        skillCooldowns: {},   // skillId -> turns remaining
        skipTurns: 0,         // for meditate
      });
      // Stash post-combat outcomes for later
      setPendingPostCombat({
        onWin:  choice.onWin,
        onLose: choice.onLose,
      });
      return;
    }

    // Handle stat-based dice roll
    if (choice.stat) {
      const stat = gs.stats[choice.stat] || 5;
      const rate = calcRate(stat, gs.stats.WIS);
      setDiceState({ choice, stat:choice.stat, rate, rolling:true, roll:null, success:null });

      let count = 0;
      const interval = setInterval(() => {
        count++;
        setDiceState(d => d ? ({...d, roll: Math.floor(Math.random()*20)+1}) : d);
        if (count >= 16) {
          clearInterval(interval);
          const finalRoll = Math.floor(Math.random()*20)+1;
          const isCrit = finalRoll === 20;
          const isFumble = finalRoll === 1;
          const success = isCrit ? true : isFumble ? false : (finalRoll/20*100) <= rate;
          setDiceState(d => d ? ({...d, rolling:false, roll:finalRoll, success, isCrit, isFumble}) : d);
        }
      }, 60);
      return;
    }

    // Non-stat: directly apply
    applyChoice(choice, true, false, false);
  };

  // ── Combat actions ──
  const combatRoll = () => {
    if (!combat || combat.done || combat.rolling) return;
    setCombat(c => ({...c, rolling:true, diceVal:null}));
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setCombat(c => c ? ({...c, diceVal: Math.floor(Math.random()*20)+1}) : c);
      if (count >= 14) {
        clearInterval(interval);
        const roll = Math.floor(Math.random()*20)+1;
        resolveCombatTurn(roll);
      }
    }, 55);
  };

  const resolveCombatTurn = (roll) => {
    setCombat(c => {
      if (!c) return c;
      const isCrit = roll === 20;
      const isFumble = roll === 1;
      const hitRate = calcRate(gs.stats.STR, gs.stats.WIS);
      const hasBattleCry = (c.buffs || []).includes('battle_cry');
      const hasParry = (c.buffs || []).includes('parry');
      const hit = hasBattleCry || (!isFumble && (isCrit || (roll/20*100) <= hitRate));
      const effectiveCrit = hasBattleCry || isCrit;
      const playerDmg = hit ? Math.max(1, Math.round(gs.stats.STR * 1.5 + roll * 0.4) * (effectiveCrit?2:1)) : 0;
      let enemyDmg = Math.max(1, Math.round(c.enemy.atk * (0.7 + Math.random()*0.6)));
      let parryReflect = 0;
      if (hasParry) {
        parryReflect = Math.round(enemyDmg / 2);
        enemyDmg = 0;
      }
      const newEnemyHp = Math.max(0, c.enemy.currentHp - playerDmg - parryReflect);
      const newPlayerHp = Math.max(0, c.playerHp - (newEnemyHp <= 0 ? 0 : enemyDmg));

      const newLog = [...c.log];
      if (effectiveCrit)   newLog.push(`✦ 暴击！你对${c.enemy.name}造成 ${playerDmg} 伤害！`);
      else if (hit) newLog.push(`✓ 命中！${c.enemy.name} -${playerDmg} HP`);
      else          newLog.push(`✕ 未命中`);
      if (parryReflect > 0) newLog.push(`🛡️ 格挡反击！${c.enemy.name} -${parryReflect} HP`);
      if (newEnemyHp > 0) {
        if (hasParry) newLog.push(`🛡️ 你挡下了攻击`);
        else newLog.push(`💢 ${c.enemy.name}还击 -${enemyDmg} HP`);
      }

      const done = newEnemyHp<=0 || newPlayerHp<=0;
      const won = newEnemyHp <= 0;
      if (done) {
        newLog.push(won
          ? `🏆 你击败了${c.enemy.name}！`
          : `💀 你被${c.enemy.name}击倒了...`);
      }

      // Decay buffs (one-shot) and reduce cooldowns
      const newBuffs = (c.buffs || []).filter(b => b !== 'battle_cry' && b !== 'parry');
      const newCD = {};
      Object.entries(c.skillCooldowns || {}).forEach(([k,v]) => {
        if (v > 1) newCD[k] = v - 1;
      });

      return {
        ...c,
        rolling: false,
        diceVal: roll,
        playerHp: newPlayerHp,
        enemy: { ...c.enemy, currentHp: newEnemyHp },
        log: newLog,
        turn: c.turn+1,
        done, won,
        playerAnim: hit ? 'attacking' : null,
        enemyAnim: (newEnemyHp > 0 && (enemyDmg > 0 || parryReflect > 0)) ? 'hurt' : null,
        playerDmg: hit ? playerDmg : null,
        enemyDmg: (newEnemyHp > 0 && enemyDmg > 0) ? enemyDmg : null,
        buffs: newBuffs,
        skillCooldowns: newCD,
      };
    });
    setTimeout(() => setCombat(c => c ? ({...c, playerAnim:null, enemyAnim:null, playerDmg:null, enemyDmg:null}) : c), 600);
  };

  const combatFlee = () => {
    if (!combat || combat.done) return;
    // Half HP, treat as lose
    setGS(g => ({...g, hp: Math.max(1, Math.round(g.hp * 0.6))}));
    setCombat(c => c ? ({...c, done:true, won:false, log:[...c.log, '🏳️ 你逃出了战场，但失去了不少 HP。']}) : c);
  };

  const combatSkill = (skill) => {
    if (!combat || combat.done || combat.rolling) return;
    if ((combat.skillCooldowns?.[skill.id] || 0) > 0) {
      toast(`${skill.name} 冷却中`);
      return;
    }
    setCombat(c => {
      const newLog = [...c.log, `✨ 你使用了【${skill.name}】！`];
      const newBuffs = [...(c.buffs || [])];
      const newCD = { ...(c.skillCooldowns || {}), [skill.id]: skill.cooldown };
      let newPlayerHp = c.playerHp;
      let newEnemyHp = c.enemy.currentHp;
      let newDone = c.done;
      let newWon = c.won;
      let newSkipTurns = c.skipTurns || 0;

      switch (skill.id) {
        case 'power_strike': {
          const dmg = Math.max(2, Math.round(gs.stats.STR * 3));
          newEnemyHp = Math.max(0, newEnemyHp - dmg);
          newLog.push(`💥 强力一击！${c.enemy.name} -${dmg} HP`);
          if (newEnemyHp <= 0) { newDone = true; newWon = true; newLog.push(`🏆 你击败了${c.enemy.name}！`); }
          break;
        }
        case 'heal': {
          const heal = Math.round(gs.maxHp * 0.3);
          newPlayerHp = Math.min(gs.maxHp, newPlayerHp + heal);
          newLog.push(`💚 你恢复了 ${heal} HP`);
          break;
        }
        case 'flee_master': {
          newDone = true;
          newWon = false;
          newLog.push('💨 你瞬身脱离战场，毫发无损！');
          break;
        }
        case 'battle_cry': {
          newBuffs.push('battle_cry');
          newLog.push('🔥 战吼！下次攻击必中且暴击。');
          break;
        }
        case 'parry': {
          newBuffs.push('parry');
          newLog.push('🛡️ 你举盾格挡，本回合免伤。');
          break;
        }
        case 'meditate': {
          newPlayerHp = gs.maxHp;
          newSkipTurns = 3;
          newLog.push('✨ 你冥想恢复全部 HP，但接下来 3 回合无法行动。');
          break;
        }
      }

      return {
        ...c,
        playerHp: newPlayerHp,
        enemy: { ...c.enemy, currentHp: newEnemyHp },
        log: newLog,
        buffs: newBuffs,
        skillCooldowns: newCD,
        skipTurns: newSkipTurns,
        done: newDone,
        won: newWon,
      };
    });
  };

  const exitCombat = () => {
    if (!combat) return;
    const won = combat.won;
    const enemy = combat.enemy;
    const finalPlayerHp = combat.playerHp;
    const post = pendingPostCombat;

    // Apply final HP and rewards
    setGS(g => {
      const ng = {...g, hp: finalPlayerHp};
      if (won) {
        ng.gold += enemy.gold;
        ng.exp += enemy.exp;
        ng.kills = (ng.kills||0) + 1;
      }
      return ng;
    });

    // Show combat result paragraph
    const resultPara = {
      type: 'result',
      success: won,
      text: won
        ? `你击败了【${enemy.name}】！`
        : `你被【${enemy.name}】击倒了...`,
      outcome: won ? { gold: enemy.gold, exp: enemy.exp } : { hp: -10 },
    };
    setStoryLog(prev => [...prev, resultPara]);
    setCombat(null);
    setPendingPostCombat(null);

    // Continue to onWin/onLose dialog
    setTimeout(() => {
      const branch = won ? post?.onWin : post?.onLose;
      if (branch?.goto) {
        const r = pickVariant(branch.goto);
        if (r) {
          setActiveDialog(branch.goto);
          setStoryLog(prev => [...prev, { type:'chapter', title:r.dialog.title, icon:r.dialog.icon }, ...r.variant.paragraphs]);
          setPendingChoices(r.variant.choices);
        } else {
          loadRootMenu();
        }
      } else {
        loadRootMenu();
      }
    }, 200);
  };

  // Confirm dice → apply outcome
  const onDiceConfirm = () => {
    if (!diceState || diceState.rolling) return;
    const { choice, success, isCrit, isFumble } = diceState;
    setDiceState(null);
    applyChoice(choice, success, isCrit, isFumble);
  };

  // Apply choice outcome to story log
  const applyChoice = (choice, success, isCrit, isFumble) => {
    let resultText = '';
    let outcome = {};
    let resultClass = success ? 'success' : 'fail';

    if (choice.stat) {
      // Stat outcome
      outcome = success ? (choice.success || {}) : (choice.fail || {});
      if (isCrit) resultText = '✦ 大成功！' + (choice.successText || '完美的判定！');
      else if (isFumble) resultText = '✕ 大失败...' + (choice.failText || '一切都偏离了预期。');
      else if (success) resultText = choice.successText || '判定成功。';
      else resultText = choice.failText || '判定失败。';

      // Apply crit/fumble bonus
      if (isCrit) {
        outcome = {...outcome};
        if (outcome.gold) outcome.gold = Math.round(outcome.gold * 1.5);
        if (outcome.exp) outcome.exp = Math.round(outcome.exp * 1.5);
      }
      if (isFumble) {
        outcome = {...outcome};
        outcome.hp = Math.min(outcome.hp || 0, (outcome.hp || 0) - 5);
      }
    } else {
      // Non-stat outcome
      outcome = choice.result || choice.effect || {};
      resultText = (success ? (choice.successMsg || choice.msg) : (choice.failMsg || choice.msg)) || '';
      if (!resultText && Object.keys(outcome).length === 0) {
        // No outcome to show
      }
    }

    applyEffect(outcome);

    // Append result + outcome rewards to story log
    const newPara = [];
    // Add player's choice as system message
    newPara.push({ type:'system', text:`> 你选择：${choice.text}` });
    if (resultText) {
      newPara.push({ type:'result', text:resultText, success:!isFumble && success, outcome });
    }

    setStoryLog(prev => [...prev, ...newPara]);
    setPendingChoices([]);

    // Decide next state
    setTimeout(() => {
      const nextDialog = success && choice.successGoto
        ? choice.successGoto
        : choice.goto;

      // 1. Travel to a different map
      if (choice.gotoMap) {
        setGS(g => ({...g, currentMap: choice.gotoMap}));
        closeDialog();
        return;
      }

      // 2. Force-return (e.g. quest reward → leave)
      if (choice.backOnContinue) {
        setPendingChoices([{ text:'继续', _close:true }]);
        return;
      }

      // 3. Explicit "leave" choice
      if (choice.back) {
        closeDialog();
        return;
      }

      // 4. Go to next dialog scene
      if (nextDialog) {
        const r = pickVariant(nextDialog);
        if (r) {
          setActiveDialog(nextDialog);
          setStoryLog(prev => [...prev, { type:'chapter', title:r.dialog.title, icon:r.dialog.icon }, ...r.variant.paragraphs]);
          setPendingChoices(r.variant.choices);
        } else {
          // Fallback to root menu
          loadRootMenu();
        }
        return;
      }

      // 5. Default: stayHere or no goto → return to root dialog menu
      // This makes the conversation continue naturally instead of dead-ending with "继续"
      loadRootMenu();
    }, 100);
  };

  // Reload the root dialog (the one originally opened from map) and show its menu
  const loadRootMenu = () => {
    const root = rootDialog || activeDialog;
    const r = pickVariant(root);
    if (r) {
      setActiveDialog(root);
      setStoryLog(prev => [...prev, { type:'chapter', title:r.dialog.title, icon:r.dialog.icon }, ...r.variant.paragraphs]);
      setPendingChoices(r.variant.choices);
    } else {
      setPendingChoices([{ text:'继续', _close:true }]);
    }
  };

  // Get currentMap if gs exists
  const currentMap2 = gs ? MAPS[gs.currentMap] : null;

  return (
    <div className="app">
      {gs && view !== 'title' && view !== 'create' && view !== 'intro' && view !== 'ending' && (
        <TopStatus gs={gs} onOpenQuests={()=>setActiveDrawer('quests')} onOpenSettings={()=>setSettingsOpen(true)} />
      )}
      <div className="app-content">
        {view === 'title' && <TitleScreen onStart={()=>setView('create')} onLoad={loadGame} initialPanel={titlePanel} />}
        {view === 'create' && <CreateScreen onStart={startNewGame} onBack={()=>goToTitle('newgame')} />}
        {view === 'intro' && gs && (
          <IntroScreen gs={gs} onContinue={enterWorldFromIntro} />
        )}
        {view === 'ending' && activeEnding && gs && (
          <EndingScreen ep={activeEnding} gs={gs} onRestart={()=>setView('create')} onTitle={goToTitle} />
        )}
        {view === 'map' && gs && (
          gs.currentMap === 'world' ? (
            <ZoomMap
              allNodes={ALL_WORLD_NODES}
              gs={gs}
              onClickNode={onClickNode}
            />
          ) : (
            <MapScreen
              map={currentMap2}
              mapId={gs.currentMap}
              gs={gs}
              onClickNode={onClickNode}
              onBack={goBackMap}
            />
          )
        )}
        {view === 'dialog' && !combat && gs && (
          <DialogScreen
            key={dialogKey}
            dialogId={activeDialog}
            storyLog={storyLog}
            choices={pendingChoices}
            gs={gs}
            onChoose={(c) => {
              if (c._close) { closeDialog(); return; }
              onChoose(c);
            }}
            onBack={closeDialog}
          />
        )}
        {combat && gs && (
          <CombatScreen
            combat={combat}
            gs={gs}
            onRoll={combatRoll}
            onFlee={combatFlee}
            onExit={exitCombat}
            onSkill={combatSkill}
          />
        )}
        {diceState && <DiceOverlay state={diceState} onConfirm={onDiceConfirm} />}
        {questLogOpen && gs && <QuestLog gs={gs} onClose={()=>setQuestLogOpen(false)} />}
        {settingsOpen && <SettingsPanel gs={gs} onClose={()=>setSettingsOpen(false)} onNewGame={goToTitle} onLoad={loadGame} />}
        {goldFlash && <div className="gold-flash" />}
        {statUpToast && <div className="stat-up-toast">⬆️ {statUpToast}</div>}
        {itemShowcase && <ItemShowcase info={itemShowcase} onClose={()=>setItemShowcase(null)} />}
        {activeDrawer && gs && (
          <DrawerPanel which={activeDrawer} gs={gs} onClose={()=>setActiveDrawer(null)} onSave={(slot)=>{ writeSave(slot, gs); toast('💾 存档成功'); }} onLoad={loadGame} />
        )}
      </div>
      {gs && (view === 'map' || view === 'dialog') && !combat && (
        <BottomNav gs={gs} active={activeDrawer} onTab={setActiveDrawer} />
      )}
    </div>
  );
}
