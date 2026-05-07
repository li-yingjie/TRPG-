// D&D Forgotten Realms — Lost Mines of Phandelver
// 费伦大陆 · 剑湾西境

export const QUESTS = {
  q_gundren: {
    name: '岩石探索者的委托',
    steps: [
      { id:'accept',   desc:'接受西尔达的委托，协助寻找矮人冈德伦' },
      { id:'find_map', desc:'在地窟深处找到冈德伦的藏宝图' },
      { id:'rescue',   desc:'前往克拉格茅城堡营救冈德伦' },
      { id:'done',     desc:'已完成' },
    ],
  },
  q_redbrand: {
    name: '红剑匪帮',
    steps: [
      { id:'accept',       desc:'接受清除红剑匪帮的委托' },
      { id:'infiltrate',   desc:'潜入特雷森达庄园地下室' },
      { id:'kill_glasstaff', desc:'击败匪帮首领玻璃杖' },
      { id:'done',         desc:'已完成' },
    ],
  },
  q_garaele: {
    name: '阿加莎的秘密',
    steps: [
      { id:'accept',     desc:'接受嘉芮丽修女的委托' },
      { id:'find_ruins', desc:'前往东北方向的阿加莎废墟' },
      { id:'return',     desc:'将女妖的答案带回庇护神祠堂' },
      { id:'done',       desc:'已完成' },
    ],
  },
  q_edermath: {
    name: '老狮子的警告',
    steps: [
      { id:'accept',      desc:'听取退役冒险者达兰的警告' },
      { id:'investigate', desc:'前往猫头鹰井调查亡灵异动' },
      { id:'return',      desc:'向达兰汇报调查结果' },
      { id:'done',        desc:'已完成' },
    ],
  },
  q_wave_echo: {
    name: '回响洞穴',
    steps: [
      { id:'accept',  desc:'打听回响洞穴的下落' },
      { id:'explore', desc:'深入回响洞穴探索' },
      { id:'forge',   desc:'找到传说中的法术熔炉' },
      { id:'done',    desc:'已完成' },
    ],
  },
  q_harpers: {
    name: '哈珀斯的情报',
    steps: [
      { id:'accept',      desc:'接受哈珀斯联络人的情报任务' },
      { id:'investigate', desc:'在内华冬城码头调查真塔里姆动向' },
      { id:'return',      desc:'向联络人汇报调查结果' },
      { id:'done',        desc:'已完成' },
    ],
  },
  q_zhentarim: {
    name: '真塔里姆的交易',
    steps: [
      { id:'rumor',      desc:'在码头听说神秘黑市商队' },
      { id:'infiltrate', desc:'接触真塔里姆成员' },
      { id:'kill_boss',  desc:'与真塔里姆首领对峙' },
      { id:'done',       desc:'已完成' },
    ],
  },
  q_missing_dwarf: {
    name: '失踪的矮人',
    steps: [
      { id:'find',    desc:'得知有矮人在翠野小径失踪' },
      { id:'deliver', desc:'将消息带给内华冬城的调查员' },
      { id:'done',    desc:'已完成' },
    ],
  },
  q_tressendar: {
    name: '特雷森达秘密',
    steps: [
      { id:'investigate', desc:'调查特雷森达庄园地下室的传闻' },
      { id:'done',        desc:'已完成' },
    ],
  },
};

// minZoom is now a multiplier on the screen-fill zoom:
//   1.0 = always visible (even fully zoomed out)
//   1.3 = appears after zooming in ~30%
//   1.6 = appears after zooming in ~60%
export const WORLD_NODES = [
  // wx/wy are PERCENTAGES (0–100) relative to the map image, so coords stay
  // valid regardless of the image's resolution or the viewport size.

  // ── 内华冬城周边 ──
  { id:'dusk_harbor', mapId:'dusk_harbor', kind:'compound', icon:'⚓', name:'内华冬城',
    type:'town', pos:{x:55,y:88}, wx:36.6, wy:25.1, minZoom:1.0,
    unlockHint:'镇民大会堂的公告栏上有通往内华冬城的路线...' },
  { id:'cliffs', kind:'dialog', icon:'🌊', name:'剑湾海岸',
    type:'wild', pos:{x:72,y:55}, wx:35.5, wy:30.5, minZoom:1.2, dialogId:'cliffs_meet',
    unlockHint:'内华冬城的港长应该了解海岸情况...' },
  { id:'lighthouse', kind:'dialog', icon:'🗼', name:'废弃瞭望塔',
    type:'dungeon', pos:{x:42,y:78}, wx:34.0, wy:38.5, minZoom:1.3, dialogId:'lighthouse_meet',
    unlockHint:'港口的水手应该知道...' },

  // ── 法达林镇区域 ──
  { id:'dawn_town', mapId:'dawn_town', kind:'compound', icon:'🏘️', name:'法达林镇',
    type:'town', pos:{x:32,y:60}, wx:53.0, wy:26.9, minZoom:1.0, defaultUnlocked:true },
  { id:'wild_herb', kind:'dialog', icon:'🌿', name:'翠野小径',
    type:'wild', pos:{x:60,y:42}, wx:55.0, wy:23.3, minZoom:1.1, dialogId:'wild_herb_zone', defaultUnlocked:true },
  { id:'wild_explore', kind:'dialog', icon:'🌲', name:'永冬林',
    type:'wild', pos:{x:50,y:30}, wx:49.5, wy:30.5, minZoom:1.1, dialogId:'forest_explore', defaultUnlocked:true },
  { id:'crypt', mapId:'crypt', kind:'compound', icon:'🕸️', name:'克拉格茅地窟',
    type:'dungeon', pos:{x:25,y:85}, wx:56.0, wy:19.7, minZoom:1.2, defaultUnlocked:true },
  { id:'mine', kind:'dialog', icon:'⚒️', name:'回响洞穴',
    type:'wild', pos:{x:18,y:35}, wx:48.0, wy:27.8, minZoom:1.3, dialogId:'mine_entrance',
    unlockHint:'据说岩石探索者家族的矮人兄弟知道洞穴位置...' },

  // ── 法达林镇东北方 ──
  { id:'wizard_tower', kind:'dialog', icon:'💀', name:'猫头鹰井',
    type:'dungeon', pos:{x:78,y:25}, wx:58.0, wy:20.6, minZoom:1.4, dialogId:'wizard_tower_door',
    unlockHint:'旅馆里的老冒险者提到过北边遗弃的古井...' },
  { id:'shrine', kind:'dialog', icon:'👻', name:'阿加莎废墟',
    type:'wild', pos:{x:70,y:75}, wx:56.5, wy:26.0, minZoom:1.4, dialogId:'shrine_meet',
    unlockHint:'庇护神祠堂的嘉芮丽修女有一个特殊的委托...' },
  { id:'dragon_lair', kind:'dialog', icon:'🐉', name:'荆棘堡废墟',
    type:'dungeon', pos:{x:88,y:45}, wx:54.0, wy:22.4, minZoom:1.4, dialogId:'dragon_lair',
    unlockHint:'达兰果园的老冒险者提起过西北方废墟里的绿龙...' },
  { id:'cragmaw_castle', kind:'dialog', icon:'🏰', name:'克拉格茅城堡',
    type:'dungeon', pos:{x:35,y:78}, wx:52.0, wy:18.8, minZoom:1.3, dialogId:'cragmaw_castle',
    unlockHint:'救出西尔达，从冈德伦的地图上找到城堡位置...' },
];

// Major Sword Coast cities — display only, future content
export const SWORD_COAST_CITY_NODES = [
  { id:'luskan',       kind:'future', icon:'⚓', name:'卢斯坎',   type:'city', wx:30.0, wy:13.4, minZoom:1.0, defaultUnlocked:true },
  { id:'waterdeep',    kind:'future', icon:'🏰', name:'深水城',   type:'city', wx:44.0, wy:35.2, minZoom:1.0, defaultUnlocked:true },
  { id:'baldurs_gate', kind:'future', icon:'🏰', name:'博德之门', type:'city', wx:73.5, wy:71.5, minZoom:1.0, defaultUnlocked:true },
];

export const ALL_WORLD_NODES = [...WORLD_NODES, ...SWORD_COAST_CITY_NODES];

export const HARBOR_NODES = [
  { id:'harbor_dock', kind:'dialog', icon:'⛵', name:'内华冬城码头', type:'building',
    pos:{x:50,y:30}, dialogId:'harbor_dock', defaultUnlocked:true },
  { id:'harbor_fishmonger', kind:'dialog', icon:'🛒', name:'内华冬城市集', type:'building',
    pos:{x:25,y:55}, dialogId:'harbor_fishmonger', defaultUnlocked:true },
  { id:'harbor_inn', kind:'dialog', icon:'🍻', name:'旅人之所', type:'building',
    pos:{x:75,y:55}, dialogId:'harbor_inn', defaultUnlocked:true },
  { id:'harbor_cult', kind:'dialog', icon:'🕯️', name:'真塔里姆据点', type:'building',
    pos:{x:50,y:80}, dialogId:'harbor_cult_door',
    unlockHint:'旅人之所里也许有更多线索...' },
];

export const TOWN_NODES = [
  { id:'tavern', kind:'dialog', icon:'🍺', name:'石柱旅馆', type:'building',
    pos:{x:30,y:35}, dialogId:'tavern_enter', defaultUnlocked:true },
  { id:'church', kind:'dialog', icon:'🍀', name:'庇护神祠堂', type:'building',
    pos:{x:65,y:30}, dialogId:'church_enter', defaultUnlocked:true },
  { id:'bulletin', kind:'dialog', icon:'📋', name:'镇民大会堂', type:'building',
    pos:{x:50,y:55}, dialogId:'bulletin_enter', defaultUnlocked:true },
  { id:'home', kind:'dialog', icon:'🔥', name:'营地', type:'building',
    pos:{x:75,y:65}, dialogId:'home_enter', defaultUnlocked:true },
  { id:'smith', kind:'dialog', icon:'🛡️', name:'铁狮商行', type:'building',
    pos:{x:18,y:62}, dialogId:'smith_enter', defaultUnlocked:true },
  { id:'merchant', kind:'dialog', icon:'🏪', name:'巴泰恩商行', type:'building',
    pos:{x:48,y:18}, dialogId:'merchant_enter', defaultUnlocked:true },
  { id:'orchard', kind:'dialog', icon:'🍎', name:'达兰的苹果园', type:'building',
    pos:{x:85,y:35}, dialogId:'daran_orchard', defaultUnlocked:true },
  { id:'tresendar', kind:'dialog', icon:'🏚️', name:'特雷森达庄园', type:'building',
    pos:{x:50,y:85}, dialogId:'redbrand_hideout',
    unlockHint:'达兰说庄园东侧有一条酒窖密道...' },
  { id:'back_alley', kind:'dialog', icon:'🐺', name:'镇北暗巷', type:'wild',
    pos:{x:15,y:25}, dialogId:'back_alley', defaultUnlocked:true },
];

export const CRYPT_NODES = [
  { id:'crypt_entrance', kind:'dialog', icon:'🏹', name:'地窟入口', type:'wild',
    pos:{x:30,y:50}, dialogId:'crypt_entrance', defaultUnlocked:true },
  { id:'crypt_inner', kind:'dialog', icon:'🗺️', name:'地窟深处', type:'dungeon',
    pos:{x:65,y:60}, dialogId:'crypt_inner', defaultUnlocked:true },
];

export const MAPS = {
  world:       { title:'费伦大陆 · 剑湾西境', bg:'world',   nodes:WORLD_NODES,  parent:null },
  dawn_town:   { title:'法达林镇',             bg:'town',    nodes:TOWN_NODES,   parent:'world' },
  crypt:       { title:'克拉格茅地窟',         bg:'dungeon', nodes:CRYPT_NODES,  parent:'world' },
  dusk_harbor: { title:'内华冬城',             bg:'harbor',  nodes:HARBOR_NODES, parent:'world' },
};

export const ENEMIES = {
  goblin:      { name:'哥布林',           emoji:'👺', tier:1, hp:30,  atk:6,  exp:18, gold:10 },
  redbrand:    { name:'红剑匪徒',         emoji:'🗡️', tier:2, hp:45,  atk:10, exp:22, gold:18 },
  skeleton:    { name:'骷髅',             emoji:'💀', tier:2, hp:40,  atk:9,  exp:25, gold:15 },
  bugbear:     { name:'大地精',           emoji:'👹', tier:3, hp:60,  atk:13, exp:35, gold:30 },
  nothic:      { name:'诺丝克',           emoji:'👁️', tier:3, hp:55,  atk:12, exp:30, gold:20 },
  giant_spider:{ name:'巨型蜘蛛',         emoji:'🕷️', tier:4, hp:75,  atk:16, exp:45, gold:35 },
  wraith:      { name:'幽灵骑士',         emoji:'👻', tier:4, hp:80,  atk:18, exp:50, gold:40 },
  drow_mage:   { name:'黑蜘蛛（卓尔法师）', emoji:'🕸️', tier:4, hp:70, atk:20, exp:60, gold:45 },
  dragon:      { name:'绿龙维尼斯范',     emoji:'🐉', tier:5, hp:150, atk:30, exp:100, gold:80 },
};

export const FACE_PARTS = {
  faceShape: {
    label: '脸型',
    options: [
      { id:'round',  name:'圆脸' },
      { id:'long',   name:'长脸' },
      { id:'square', name:'方脸' },
    ],
  },
  skinTone: {
    label: '肤色',
    options: [
      { id:'pale',   name:'冷白',  color:'#f5dfc3' },
      { id:'fair',   name:'白皙',  color:'#eccba0' },
      { id:'light',  name:'浅褐',  color:'#dba87b' },
      { id:'tan',    name:'小麦',  color:'#bf8854' },
      { id:'dark',   name:'深棕',  color:'#8a5a35' },
      { id:'olive',  name:'橄榄',  color:'#a89070' },
    ],
  },
  hairStyle: {
    label: '发型',
    options: [
      { id:'short',    name:'短发' },
      { id:'long',     name:'长发' },
      { id:'bald',     name:'光头' },
      { id:'curly',    name:'卷发' },
      { id:'topknot',  name:'发髻' },
      { id:'mohawk',   name:'莫西干' },
      { id:'sidecut',  name:'侧分' },
      { id:'ponytail', name:'马尾' },
    ],
  },
  hairColor: {
    label: '发色',
    options: [
      { id:'black',  name:'乌黑',   color:'#1a1410' },
      { id:'brown',  name:'棕色',   color:'#5a3a1f' },
      { id:'auburn', name:'红棕',   color:'#8a4520' },
      { id:'blonde', name:'金色',   color:'#d4a838' },
      { id:'silver', name:'银白',   color:'#c8c8c8' },
      { id:'red',    name:'火红',   color:'#a02020' },
      { id:'blue',   name:'湛蓝',   color:'#3a7090' },
      { id:'purple', name:'紫罗兰', color:'#6a3a8a' },
    ],
  },
  accessory: {
    label: '配件',
    options: [
      { id:'none',     name:'无' },
      { id:'eyepatch', name:'眼罩' },
      { id:'glasses',  name:'眼镜' },
      { id:'bandana',  name:'头巾' },
      { id:'hood',     name:'兜帽' },
      { id:'helmet',   name:'头盔' },
    ],
  },
  expression: {
    label: '神态',
    options: [
      { id:'calm',   name:'沉静' },
      { id:'smile',  name:'微笑' },
      { id:'fierce', name:'凶狠' },
      { id:'tired',  name:'疲惫' },
    ],
  },
};

// D&D 出身背景 (Backgrounds)
export const TRAITS = [
  { id:'noble',
    name:'贵族',
    desc:'初始金币×3，CHA+2',
    intro:'你出身于费伦大陆的古老贵族家族。家道虽已中落，但贵族礼仪与风范早已刻入骨髓。你的家徽蒙尘，但荣耀，你誓要亲手夺回。',
    apply: gs => { gs.gold *= 3; gs.stats.CHA += 2; } },
  { id:'outlander',
    name:'流浪者',
    desc:'初始无金币，DEX+3，STR+2',
    intro:'你在荒野中成长，永冬林的猛兽和北地的风雪是你的老师。你懂得如何在没有准备的情况下生存，只是钱袋子总是空的。',
    apply: gs => { gs.gold = 0; gs.stats.DEX += 3; gs.stats.STR += 2; } },
  { id:'acolyte',
    name:'侍僧',
    desc:'INT判定+15%，STR-10%',
    intro:'你在坎铁尔或沙多宫的神殿侍奉多年，研读神典，为信徒祈福。神明的庇护使你的精神异常敏锐，但长年伏案，让你的体魄不如真正的战士。',
    apply: gs => { gs.intBonus = 15; gs.strPenalty = 10; } },
  { id:'criminal',
    name:'罪犯',
    desc:'WIS+3',
    intro:'你曾在法律的阴影下生存。无论是在内华冬城的贫民窟还是博德之门的街头，你总能化险为夷。也许命运之神会继续庇护你。',
    apply: gs => { gs.stats.WIS += 3; } },
  { id:'guild_merchant',
    name:'行会商人',
    desc:'初始金币+30，CHA+1',
    intro:'商人行会的经历让你深谙交易之道。你知道如何在市集中讨价还价，也懂得如何让陌生人信任你。',
    apply: gs => { gs.gold += 30; gs.stats.CHA += 1; } },
  { id:'soldier',
    name:'老兵',
    desc:'HP上限+15，CON+1',
    intro:'你曾在内华冬城城防军中服役多年。沙场磨砺让你的肉体远比常人坚韧，退伍后，你决定以冒险者的身份开始新生活。',
    apply: gs => { gs.hpBonus = 15; gs.stats.CON += 1; } },
  { id:'sage',
    name:'圣贤',
    desc:'INT+2',
    intro:'你在坎铁尔的学者图书馆度过了数年，遍阅古籍。那些只存在于书页中的奇迹，你决定亲身去验证。',
    apply: gs => { gs.stats.INT += 2; } },
  { id:'hermit',
    name:'隐士',
    desc:'CHA-2，但所有判定+5%',
    intro:'你独居于荒野多年，与世隔绝。这段经历磨砺了你超凡的感知与洞察力，只是你已不再习惯与人打交道。',
    apply: gs => { gs.stats.CHA -= 2; gs.allBonus = 5; } },
];

// D&D 命题 (Goals)
export const GOALS = [
  { id:'glory',
    icon:'👑', name:'费伦传奇',
    desc:'声望达到 100，名震剑湾海岸',
    check: gs => gs.fame >= 100 },
  { id:'wealth',
    icon:'💰', name:'财富与荣耀',
    desc:'积累 500 金币，衣锦还乡',
    check: gs => gs.gold >= 500 },
  { id:'dragon',
    icon:'🐉', name:'屠龙勇士',
    desc:'击败荆棘堡废墟的绿龙维尼斯范',
    check: gs => gs.flags?.includes('dragon_slain') },
];

// 战斗技能
export const SKILLS = {
  power_strike: {
    id:'power_strike', name:'强力一击', icon:'⚔️',
    desc:'对敌人造成 2x 伤害', cooldown:3,
    unlockLv: 2, type:'combat',
  },
  heal: {
    id:'heal', name:'治疗术', icon:'💚',
    desc:'恢复 30% HP', cooldown:4,
    unlockLv: 3, type:'combat',
  },
  flee_master: {
    id:'flee_master', name:'瞬身遁走', icon:'💨',
    desc:'必定逃脱，不掉 HP', cooldown:5,
    unlockLv: 2, type:'combat',
  },
  battle_cry: {
    id:'battle_cry', name:'战吼', icon:'🔥',
    desc:'下次攻击必中且暴击', cooldown:5,
    unlockLv: 4, type:'combat',
  },
  parry: {
    id:'parry', name:'格挡反击', icon:'🛡️',
    desc:'本回合免伤并反弹一半', cooldown:4,
    unlockLv: 3, type:'combat',
  },
  meditate: {
    id:'meditate', name:'冥想集神', icon:'✨',
    desc:'恢复全部 HP，但跳过 3 回合', cooldown:8,
    unlockLv: 5, type:'combat',
  },
};

// D&D 结局
export const ENDINGS = [
  { id:'death',
    icon:'💀', title:'英雄长眠', subtitle:'A SAD END', bg:'#1a0a0a',
    story:'你倒在了费伦大陆的土地上。你的名字不会出现在任何史书中，但也许某天，法达林镇的孩子们会在篝火边，讲起一个勇敢冒险者的故事。',
    check: gs => gs.hp <= 0 },
  { id:'glory',
    icon:'👑', title:'费伦传奇', subtitle:'LEGEND OF FAERÛN', bg:'#1a1500',
    story:'你的名字响彻剑湾海岸的每一个角落。哈珀斯为你举杯，吟游诗人将你的事迹谱成歌谣。你已成为这片大陆新的传说。',
    check: gs => gs.fame >= 100 },
  { id:'wealth',
    icon:'💰', title:'富甲一方', subtitle:'WEALTH & GLORY', bg:'#0a1500',
    story:'你带着满满的财富回到法达林镇，在镇上最显眼的位置买下宅邸。冒险的日子结束了，崭新的人生才刚刚开始。',
    check: gs => gs.gold >= 500 },
  { id:'dragon',
    icon:'🐲', title:'屠龙勇士', subtitle:'DRAGONSLAYER', bg:'#150815',
    story:'绿龙维尼斯范的尸骸已化为传说。你坐在荆棘堡废墟的城头，俯视脚下的大陆。剑湾海岸，再无人不知你的名字。',
    check: gs => gs.flags?.includes('dragon_slain') },
];

// D&D 物品
export const ITEM_INFO = {
  silver_herb:    { icon:'🌿', name:'月光草',         desc:'生长于永冬林阴暗处的稀有草药，散发微弱银光，是炼金师梦寐以求的材料。' },
  soldier_amulet: { icon:'🪬', name:'老兵的护身符',   desc:'锈迹斑斑的银坠子，刻着「艾拉」二字。一段被岁月尘封的往事。' },
  iron_hammer:    { icon:'🔨', name:'祖传铸铁锤',     desc:'法达林铁匠家族世代相传的工具，百年如一，锋利依旧。' },
  rare_fish:      { icon:'🐟', name:'月光鳞鱼',       desc:'传说在内华冬城沿岸出没的稀有鱼类，鳞片在月光下泛起银光。' },
  lost_letter:    { icon:'✉️', name:'一封未寄出的信', desc:'信封上写着「战士西尔达·内华冬城驻地」，是某人寄给迷失荒野的战士的。' },
  gundren_map:    { icon:'🗺️', name:'冈德伦的藏宝图', desc:'一张皱巴巴的羊皮纸地图，标注着回响洞穴的入口位置。岩石探索者家族的秘密。' },
  healing_potion: { icon:'🧪', name:'治疗药水',       desc:'一瓶散发玫瑰香气的红色液体，饮用后可恢复 15 HP。' },
  '基础魔法导引': { icon:'📕', name:'初级法术典籍',   desc:'内华冬城魔法学院的入门教材，记载着数种基础法术。' },
  '老兵的短匕':   { icon:'🗡️', name:'红剑匪徒的短剑', desc:'从红剑匪徒手中夺取的武器。STR +2。' },
  '骷髅骨':       { icon:'🦴', name:'骷髅碎骨',       desc:'猫头鹰井的不死生物留下的骨骸，可作炼金材料。' },
  '古护身符':     { icon:'🔮', name:'符文护身符',     desc:'刻有古老精灵符文的护身符，散发微弱魔力。' },
  '锻造护甲':     { icon:'🛡️', name:'精锻链甲',       desc:'法达林铁匠精心打造的护甲。CON +2。' },
  '龙鳞':         { icon:'🐲', name:'绿龙鳞片',       desc:'维尼斯范留下的翠绿鳞片，坚硬如铁，带有微量毒素。屠龙者的证明。' },
  '幸运护符':     { icon:'🍀', name:'泰摩拉幸运符',   desc:'庇护神祠堂嘉芮丽修女亲手祝福的幸运符，据说能带来女神的庇佑。WIS +2。' },
  '精钢剑':       { icon:'⚔️', name:'精钢阔剑',       desc:'用回响洞穴星铁矿石打造的好剑。STR +1。' },
  '船长的弯刀':   { icon:'🗡️', name:'海岸卫队弯刀',   desc:'内华冬城海岸卫队的制式武器。STR +1。' },
  '深渊禁书':     { icon:'📖', name:'黑蜘蛛的密码簿', desc:'卓尔黑蜘蛛随身携带的加密笔记，记录了地下暗网的秘密。INT +1。' },
  '海盗旗':       { icon:'🏴‍☠️', name:'真塔里姆徽章', desc:'真塔里姆组织的成员标志，在某些地方可当作通行证。' },
  silver_comb:    { icon:'🪮', name:'银梳',           desc:'刻有泰摩拉星形纹的精致银梳，是赠予阿加莎女妖的礼物。' },
  paladin_token:  { icon:'🛡️', name:'公教骑士徽章',   desc:'达兰·埃德马斯赠予的旧徽章，凭此可在公教骑士网络中得到帮助。' },
  steel_dagger:   { icon:'🗡️', name:'精钢匕首',       desc:'琳内·格雷温德亲手挑选赠予的钢匕首，做工精良，DEX +1。' },
  dragon_scale:   { icon:'🐲', name:'绿龙鳞片',       desc:'维尼斯范留下的鳞片，坚硬如铁，在内华冬城可换得高价。' },
  rope:           { icon:'🪢', name:'结实的麻绳',     desc:'从船骸里翻出的一卷防水麻绳，攀爬与捆绑皆宜。' },

  // ── 起手装备 / 基础物资 ──
  torch:            { icon:'🔥', name:'火把',           desc:'松脂裹布制成的火把，能在地穴与夜路中燃烧约一小时。' },
  rations:          { icon:'🥖', name:'干粮',           desc:'硬面包、风干肉与坚果，足够支撑数日旅行。' },
  wooden_sword:     { icon:'🗡️', name:'练习长剑',       desc:'未经战阵但锋利的钢剑，城防军新兵的标配。' },
  leather_armor:    { icon:'🥋', name:'皮甲',           desc:'轻便耐磨的皮质护甲，不会拖累动作。' },
  apprentice_staff: { icon:'🪄', name:'学徒法杖',       desc:'白蜡木雕成，杖头镶嵌一块未启灵的水晶。' },
  spellbook_basic:  { icon:'📘', name:'初阶咒文册',     desc:'魔法学院发给新生的咒语手册，记载了几个最基础的法术。' },
  short_dagger:     { icon:'🔪', name:'短匕',           desc:'轻巧的双刃匕首，适合近身偷袭与日常使用。' },
  lockpicks:        { icon:'🛠️', name:'撬锁工具组',     desc:'细针、撬棒与张力扳手，能开大多数普通门锁。' },
  holy_symbol:      { icon:'✨', name:'泰摩拉圣徽',     desc:'银制双面硬币纹章，神职者用以引导神术。' },
  morning_mace:     { icon:'🔨', name:'晨光锤',         desc:'神殿铸造的轻型钉锤，朴素而坚实。' },
};

export { DIALOGS } from './dialogs.js';
