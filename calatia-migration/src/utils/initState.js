import { WORLD_NODES, TOWN_NODES, CRYPT_NODES, HARBOR_NODES, SWORD_COAST_CITY_NODES } from '../data/gamedata.js';

export const makeInitState = () => {
  // Collect all default-unlocked node ids from all maps
  const allMaps = [
    WORLD_NODES || [],
    TOWN_NODES || [],
    CRYPT_NODES || [],
    HARBOR_NODES || [],
    SWORD_COAST_CITY_NODES || [],
  ];
  const initialUnlocks = [];
  allMaps.forEach(arr => arr.forEach(n => {
    if (n.defaultUnlocked) initialUnlocks.push(n.id);
  }));

  return {
    name: '冒险者',
    avatar: 'av1',  // legacy, kept for combat sprite fallback
    face: {
      faceShape: 'round',
      skinTone: 'fair',
      hairStyle: 'short',
      hairColor: 'brown',
      accessory: 'none',
      expression: 'calm',
    },
    hp: 30, maxHp: 30,
    gold: 50,
    herb: 0,
    exp: 0, expMax: 100,
    level: 1,
    fame: 0,
    kills: 0,
    day: 1,
    actionsLeft: 5,
    actionsPerDay: 5,
    healUsedToday: false,
    skills: [],
    skillCooldowns: {},
    // Basic survival kit every adventurer starts with — preset characters get
    // class-specific gear added on top in TitleScreen.startPreset.
    inventory: ['torch', 'rations', 'healing_potion'],
    questItems: [],
    // ── Main story progression ─────────────────────────────────
    // act: 1..5 (see ACT_TITLES). chapter: free-form id within act.
    // choices: tracks the player's defining decisions across the campaign,
    //   read by variant `when` conditions to branch later acts.
    //   e.g. { ally: 'harpers'|'zhentarim'|'drow'|'solo',
    //          gundren: 'saved'|'died',
    //          spider: 'killed'|'negotiated'|'betrayed',
    //          glasstaff: 'spared'|'killed' }
    act: 1,
    chapter: 'prologue',
    choices: {},
    flags: [],
    activeQuests: {},
    doneQuests: [],
    stats: { STR:5, DEX:5, INT:5, CHA:5, CON:5, WIS:5 },
    freeStatPoints: 0,
    traits: [],
    goal: null,
    hpBonus: 0,
    intBonus: 0,
    strPenalty: 0,
    allBonus: 0,
    currentMap: 'world',
    currentLocId: 'dawn_town',  // 法达林镇
    unlockedNodes: initialUnlocks,
    startedAt: Date.now(),
  };
};
