// D&D Forgotten Realms — Lost Mines of Phandelver
// 费伦大陆 · 法达林矿坑之谜
// 所有对话内容基于《失落的矿坑》模组改编

export const DIALOGS = {

  // ─── 石柱旅馆 ───
  tavern_enter: {
    icon: '🍺', title: '石柱旅馆',
    variants: [
      {
        when: gs => !gs.flags.includes('met_toblen'),
        paragraphs: [
          { type:'text', text:'你推开石柱旅馆厚重的橡木门。扑面而来的是麦酒香气、烟草气息与喧嚣谈笑声。壁炉里的火焰将整间屋子映得橙红温暖，几名旅人围坐在粗糙的木桌旁低声交谈。' },
          { type:'text', text:'吧台后面，一个身材圆润、面色红润的中年男人正在擦拭酒杯，那是旅馆主人汤姆林·斯通希尔。在靠墙的僻静角落，一名风尘仆仆的战士独自坐着，身上的旅行装备尚未完全拆卸，眼神里带着一丝难以掩藏的疲惫与忧虑。' },
          { type:'image', src:'/scenes/neverwinter_harbor.png', alt:'内华冬城', caption:'内华冬城 · 悬崖港' },
        ],
        choices: [
          { text:'走向旅馆主人汤姆林', goto:'tavern_toblen', effect:{ flags:['met_toblen'] } },
          { text:'走向角落里的战士', goto:'tavern_sildar', effect:{ flags:['met_sildar'] } },
          { text:'买一杯麦酒（10金币）', cost:{ gold:10 }, result:{ hp:8 }, msg:'温热的麦酒顺着喉咙滑下，你感到肌肉逐渐放松，那些旅途的酸痛消散了不少。', stayHere:true },
          { text:'离开旅馆', back:true },
        ],
      },
      {
        when: gs => gs.flags.includes('met_sildar') && !gs.flags.includes('sildar_rescued'),
        paragraphs: [
          { type:'text', text:'石柱旅馆依旧热闹。汤姆林正忙着给客人续杯，西尔达·霍尔温特还坐在那个角落，他的目光时常飘向门口，似乎在等待什么消息。' },
        ],
        choices: [
          { text:'与汤姆林交谈', goto:'tavern_toblen' },
          { text:'与西尔达交谈', goto:'tavern_sildar' },
          { text:'买一杯麦酒（10金币）', cost:{ gold:10 }, result:{ hp:8 }, msg:'温热的麦酒让你放松下来。', stayHere:true },
          { text:'离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'石柱旅馆一如既往地温暖。壁炉劈啪作响，空气中弥漫着肉汤和麦酒的香气。' },
        ],
        choices: [
          { text:'与汤姆林交谈', goto:'tavern_toblen' },
          { text:'与西尔达交谈', goto:'tavern_sildar' },
          { text:'买一杯麦酒（10金币）', cost:{ gold:10 }, result:{ hp:8 }, msg:'温热的麦酒让疲惫一扫而空。', stayHere:true },
          { text:'离开', back:true },
        ],
      },
    ],
  },

  // ─── 旅馆主人汤姆林 ───
  tavern_toblen: {
    icon: '🧑‍🍳', title: '旅馆主人汤姆林',
    variants: [
      {
        when: gs => gs.flags.includes('redbrand_cleared'),
        paragraphs: [
          { type:'npc', text:'汤姆林见到你，脸上的愁容一扫而空，绽开一个大大的笑容。"朋友！我听说了你的壮举！那些红袍流氓终于被清除了！整个法达林镇都在谈论你，镇上的人们再也不用担惊受怕了。"' },
          { type:'npc', text:'"邓德拉一家也终于从藏身之处出来了，科扬太感谢你了。还有那些商铺老板们——他们终于不用每个月被迫交那笔保护费了。"' },
          { type:'text', text:'汤姆林热情地为你斟满一杯最好的麦酒，放到你面前。' },
          { type:'npc', text:'"今晚的酒，算我的。这是英雄应得的待遇！"' },
        ],
        choices: [
          { text:'打听红袍帮的事', goto:'tavern_toblen' },
          { text:'感谢他，离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'npc', text:'"欢迎，欢迎！"汤姆林放下手中的杯子，热情地招呼你，"外乡人？法达林镇不大，但我们这儿还是挺欢迎旅人的……只是，最近这地方不太平。"' },
          { type:'text', text:'他压低了嗓音，向四周扫了一眼，然后倾身过来。' },
          { type:'npc', text:'"红袍帮。那帮混蛋盘踞在镇子南边的特雷森达庄园里，已经好几个月了。他们向商人收保护费，在街上滋事，甚至把邓德拉家的男人给抓走了。邓德拉太太带着孩子东躲西藏，都不敢露面。"' },
          { type:'npc', text:'"镇长哈宾·韦斯特呢？那个胆小鬼！他把自己锁在镇民大会堂里，连面都不露，说什么"超出他的职责范围"。哼！"' },
          { type:'npc', text:'"要是你真的是个冒险者……"汤姆林若有所思地看了你一眼，"镇子东边有个叫达兰·埃德马斯的老冒险者，住在苹果园那儿。他见多识广，或许知道怎么对付这帮人。"' },
        ],
        choices: [
          { text:'问红袍帮的事情（任务提示）', goto:'tavern_toblen', effect:{ unlock:'orchard' } },
          { text:'询问邓德拉一家的下落', paragraphs:[
            { type:'npc', text:'"莱恩娜·邓德拉和她的两个孩子躲在镇子北边一个朋友家里。她男人图尔帕·邓德拉被红袍帮带走了，至今下落不明……"汤姆林叹了口气，"这女人每天以泪洗面。"' },
          ], stayHere:true, effect:{ unlock:'orchard' } },
          { text:'谢谢，离开', back:true, effect:{ unlock:'orchard' } },
        ],
      },
    ],
  },

  // ─── 西尔达·霍尔温特 ───
  tavern_sildar: {
    icon: '⚔️', title: '西尔达·霍尔温特',
    variants: [
      {
        when: gs => gs.flags.includes('sildar_rescued') && gs.flags.includes('gundren_map_found'),
        paragraphs: [
          { type:'npc', text:'西尔达站起身来，紧握你的手，眼中满是感激。"朋友，多亏了你，我才能从那个臭地窟里脱身。贡德伦也会感激你的。"' },
          { type:'text', text:'他从腰包里掏出一个鼓鼓囊囊的钱袋，放在桌上推向你。' },
          { type:'npc', text:'"这是我答应你的五十金币，一分不少。关于那张地图……回响洞穴确实是个传奇之地。法术熔炉若是重见天日，将会改变整个剑湾海岸的力量格局。"' },
          { type:'npc', text:'"我必须提醒你——据我所知，有个叫做「黑蜘蛛」的家伙也在寻找那个矿坑。他是个黑暗精灵法师，手段狠辣，绝不简单。小心。"' },
        ],
        choices: [
          { text:'收下奖励（50金币）', result:{ gold:50 }, msg:'西尔达将钱袋推给你，感激之情溢于言表。', goto:'tavern_sildar' },
          { text:'询问黑蜘蛛', paragraphs:[
            { type:'npc', text:'"关于黑蜘蛛，我知道的不多。他是黑暗精灵，会使用法术。他一直在雇佣哥布林和其他雇佣兵为他做事。克拉格茅的哥布林就受他指使。他的目标很明确——独占法术熔炉的力量。"' },
          ], stayHere:true },
          { text:'告辞', back:true },
        ],
      },
      {
        when: gs => gs.activeQuests?.q_gundren && gs.activeQuests?.q_gundren !== 'accept',
        paragraphs: [
          { type:'npc', text:'西尔达坐在角落里，神情焦虑，双手环抱着快要见底的酒杯。看到你走近，他抬起头来。' },
          { type:'npc', text:'"贡德伦还没有消息……我真的很担心他。克拉格茅地窟那边，你有什么发现吗？"' },
        ],
        choices: [
          { text:'汇报克拉格茅的情况', goto:'tavern_sildar' },
          { text:'离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你走向角落里的战士。近看才发现，他的旅行装备上满是尘土，盔甲肩部还有一道明显的撕裂痕迹，像是被利爪划过。他的眼神锐利，见到你走近便不动声色地打量了你一番。' },
          { type:'npc', text:'"坐吧。"他的声音低沉，带着一股军人特有的简练，"我叫西尔达·霍尔温特，领主联盟的成员。我不是在这里喝酒消遣的。"' },
          { type:'npc', text:'"十天前，我在护送一个叫贡德伦·罗克西克的矮人沿着崔鲍尔小道前往法达林镇。我们遭到哥布林伏击。那群畜生将贡德伦单独带走了，我……我被俘后设法脱身，徒步跋涉才到这里。"' },
          { type:'npc', text:'"贡德伦发现了一些极其重要的东西——关于那个古老矿坑的地图。如果那些哥布林把他交给幕后主使，后果不堪设想。我需要一个能去克拉格茅地窟救出他的人。你是冒险者吗？"' },
        ],
        choices: [
          { text:'接受任务：前往克拉格茅地窟', result:{ questUpdate:['q_gundren','accept'] }, msg:'西尔达点点头，眼中闪过一丝感激。"克拉格茅地窟在法达林镇东北方向，沿崔鲍尔小道走，再向林中深入。那里有哥布林和他们的头领。小心。"', goto:'tavern_sildar', effect:{ flags:['met_sildar'] } },
          { text:'询问贡德伦是谁', paragraphs:[
            { type:'npc', text:'"贡德伦·罗克西克，矮人，采矿专家。他和他的两个兄弟一直在研究古代地图，声称找到了回响洞穴的入口——那是几百年前就失落的法术熔炉所在地。那个地方，哪怕对整个费伦大陆来说都是巨大的财富与力量。"' },
          ], stayHere:true },
          { text:'暂时不感兴趣', back:true },
        ],
      },
    ],
  },

  // ─── 庇护神祠堂 ───
  church_enter: {
    icon: '⛪', title: '庇护神祠堂',
    variants: [
      {
        when: gs => !gs.flags.includes('met_garaele'),
        paragraphs: [
          { type:'text', text:'你推开小祠堂的木门，走进一间简朴而宁静的圣所。供奉泰摩拉女神的小祭坛前摆着几根蜡烛，淡蓝色的光焰轻轻跳动。墙上挂着银色七星标记，那是幸运女神的象征。' },
          { type:'text', text:'一名年轻的精灵女性跪在祭坛前，她的淡金色长发垂落肩头，修士袍干净整洁。听到脚步声，她转过身来，面露温和的微笑。她的耳尖而修长，眼神清澈，带着哈珀成员特有的警觉与睿智。' },
          { type:'npc', text:'"愿泰摩拉的好运与你同在，旅人。我是嘉芮丽修女，这座小祠的守护人。法达林镇不大，但这里的人们需要她的庇佑。"' },
          { type:'npc', text:'"你来得正好……其实，我有一件事情想拜托你。"她的语气变得略微谨慎，"若是你不介意，请坐下来，我们慢慢谈。"' },
        ],
        choices: [
          { text:'听她说说这件事', goto:'church_garaele_quest', effect:{ flags:['met_garaele'] } },
          { text:'请求泰摩拉的祝福', goto:'church_blessing', effect:{ flags:['met_garaele'] } },
          { text:'离开祠堂', back:true },
        ],
      },
      {
        when: gs => gs.flags.includes('agatha_spoken') && gs.activeQuests?.q_garaele === 'find_ruins',
        paragraphs: [
          { type:'text', text:'嘉芮丽修女听到你回来的脚步声，立刻从祭坛旁站起身来，眼中满是期待。' },
          { type:'npc', text:'"你去见过阿加莎了？！她愿意说话？快告诉我，她说了什么关于鲍根特法术书的消息？"' },
        ],
        choices: [
          { text:'告诉她阿加莎的消息', result:{ questUpdate:['q_garaele','return'], items:['healing_potion','healing_potion','healing_potion'] }, msg:'嘉芮丽的眼睛亮了起来，她合掌感谢女神，随后从袍子里取出三瓶散发着淡粉光芒的药水，郑重地递给你。"这是三瓶治疗药水，是我能给你的最好报答。泰摩拉保佑你。"', effect:{ flags:[] }, goto:'church_enter' },
          { text:'稍后再说', back:true },
        ],
      },
      {
        when: gs => gs.activeQuests?.q_garaele === 'done',
        paragraphs: [
          { type:'text', text:'嘉芮丽修女见到你，微笑着点头致意。祠堂里烛光摇曳，泰摩拉女神的圣像似乎也在微笑。' },
          { type:'npc', text:'"你的帮助对我们哈珀的研究至关重要。愿幸运女神的庇佑永远与你同行，勇敢的旅人。"' },
        ],
        choices: [
          { text:'请求祝福', goto:'church_blessing' },
          { text:'离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'庇护神祠堂中，烛光轻轻摇曳。嘉芮丽修女正在祭坛旁整理祭品，见你进来，她温柔地点头致意。' },
        ],
        choices: [
          { text:'与嘉芮丽交谈', goto:'church_garaele_quest' },
          { text:'请求泰摩拉的祝福', goto:'church_blessing' },
          { text:'离开', back:true },
        ],
      },
    ],
  },

  church_garaele_quest: {
    icon: '📜', title: '嘉芮丽修女的请托',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'npc', text:'"我是哈珀组织的一员。我们一直在追寻古代的知识，以防止它被邪恶所用。"嘉芮丽的语气变得认真起来，"我需要你的帮助去找一个人——不，准确地说，一个存在。"' },
          { type:'npc', text:'"在法达林镇东北方向的森林深处，有一处废墟，那里住着一个名叫阿加莎的女妖。她曾是一位美丽的精灵，为了永葆容颜与昔日的智慧，她与黑暗力量缔结了契约，死后仍游荡于世间。"' },
          { type:'npc', text:'"我需要知道：古代法师鲍根特的法术书下落如何。阿加莎生前曾拥有它。若你能去她的废墟，以礼相待，得到这个答案，我愿意以三瓶治疗药水作为报酬。"' },
          { type:'text', text:'她从抽屉里取出一把精致的银梳，上面刻着泰摩拉的星形图案。' },
          { type:'npc', text:'"带上这把银梳作为献礼。阿加莎生前爱美，也许这能软化她的态度。切记——对她要恭敬，不可无礼。"' },
        ],
        choices: [
          { text:'接受委托，带走银梳', result:{ questUpdate:['q_garaele','accept'], items:['silver_comb'] }, msg:'嘉芮丽郑重地将银梳交到你手中，"泰摩拉保佑你的脚步轻盈。"', back:true },
          { text:'我再考虑考虑', back:true },
        ],
      },
    ],
  },

  church_blessing: {
    icon: '✨', title: '泰摩拉的祝福',
    variants: [
      {
        when: gs => gs.flags.includes('campfire_rested'),
        paragraphs: [
          { type:'text', text:'你跪在泰摩拉女神的圣像前，双手合十，低声祈祷。烛焰在无风的空气中突然跳动了一下，散发出柔和的金白色光芒，那光芒轻轻拂过你，如母亲的手掌般温柔。' },
          { type:'npc', text:'嘉芮丽修女将手轻轻放在你肩膀上，低声吟唱着一段祝福词，"幸运的旅人，愿骰子永远眷顾你。"' },
          { type:'text', text:'你感到伤痕隐隐作痛的地方传来一阵温热，随后那些疼痛渐渐消散。' },
        ],
        choices: [
          { text:'谢谢修女', result:{ hp:10 }, msg:'泰摩拉的祝福恢复了你10点生命值。愿好运相随。', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你在泰摩拉圣像前双膝跪下，祈求幸运女神的庇护。嘉芮丽修女将手轻放你肩，低吟祝福词。圣坛上的烛焰短暂地散发出柔和的金色光芒。' },
        ],
        choices: [
          { text:'接受祝福', result:{ hp:10 }, msg:'泰摩拉的祝福恢复了你10点生命值。', back:true },
        ],
      },
    ],
  },

  // ─── 镇民大会堂 ───
  bulletin_enter: {
    icon: '🏛️', title: '镇民大会堂',
    variants: [
      {
        when: gs => !gs.flags.includes('redbrand_cleared'),
        paragraphs: [
          { type:'text', text:'镇民大会堂是法达林镇最像样的建筑之一，尽管它依然朴素。门口贴着几张皱皱巴巴的公告，其中一张已经被风吹得半脱落。' },
          { type:'text', text:'进入正厅，你看到一个体型发福的中年男人坐在主席台后面，正拿着鹅毛笔假装在写什么，实际上他的目光游移不定，见到你进来，他先是一愣，随后摆出一副官腔。' },
          { type:'npc', text:'"咳咳——我是法达林镇的镇长哈宾·韦斯特，欢迎来到大会堂。如果你是来告发什么的，请移步……等等，你是外来的冒险者吗？"他的眼睛亮了一下。' },
          { type:'npc', text:'"本……本镇在崔鲍尔小道一带发现了兽人活动迹象。这是官方任务，悬赏五十金币，请将此事妥善处理。"他清了清嗓子，尽量显得威严。' },
          { type:'npc', text:'"至于……那些红袍帮的事……那超出了我作为镇长的职权范围。"他避开你的目光，轻描淡写地说。' },
        ],
        choices: [
          { text:'查看公告栏', goto:'bulletin_board' },
          { text:'追问红袍帮的事', paragraphs:[
            { type:'npc', text:'韦斯特顿时结巴起来，"我……那个……红袍帮是一个……武装组织，他们……他们太危险了，不是区区镇长能处理的。我已经写信请求援助了，援助随时都会到的……"他的额头渗出细汗。' },
            { type:'text', text:'他显然在说谎，或者至少是在逃避。这个镇长毫无用处。' },
          ], stayHere:true },
          { text:'离开大会堂', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'镇民大会堂里，哈宾·韦斯特镇长如往常一样坐在他的大椅子上。红袍帮已经被清除后，他的神情轻松了许多，甚至开始话多起来，仿佛那些功劳也有他一份。' },
          { type:'npc', text:'"是你，法达林镇的大英雄！"韦斯特热情地起身，双手乱摇，"感谢你为小镇做出的贡献！我一直都相信……咳，我一直都在背后支持你的行动的！"' },
        ],
        choices: [
          { text:'查看公告栏', goto:'bulletin_board' },
          { text:'无视他，离开', back:true },
        ],
      },
    ],
  },

  bulletin_board: {
    icon: '📋', title: '公告栏细读',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'公告栏上钉着几张手写的告示，用不同的笔迹和墨水写成，显然来自不同的人：' },
          { type:'text', text:'【悬赏公告】崔鲍尔小道一带发现兽人活动，据报告，一个兽人部落在矿坑附近出没。提供有效情报者赏金五十金币。——镇长哈宾·韦斯特' },
          { type:'text', text:'【招募】本镇需要有经验的猎人协助驱逐南部森林里的狼群。联系：苹果园达兰。' },
          { type:'text', text:'【警告】有人在路上遭劫，请过往旅人结伴而行，单独行动风险自担。——不知名好心人' },
          { type:'text', text:'【寻人】我的丈夫图尔帕·邓德拉数日前离家，至今未归。知情者请告知我。——莱恩娜·邓德拉' },
          { type:'text', text:'在最角落处，有一张几乎被遮住的小纸条，用工整的字迹写着："特雷森达庄园地下室——红袍帮的真正巢穴。据说玻璃杖在那里。——一位不愿透露姓名的朋友"' },
        ],
        choices: [
          { text:'记下这些信息', msg:'你将公告栏上的信息默记于心。', back:true },
          { text:'返回大厅', goto:'bulletin_enter' },
        ],
      },
    ],
  },

  // ─── 营地 ───
  home_enter: {
    icon: '🏕️', title: '营地',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你在法达林镇边缘找到一处隐蔽的营地——几棵粗壮的橡树围成天然屏风，土地干燥，引火的枯枝随手可得。这是属于你的安全角落。' },
          { type:'text', text:'篝火的光芒温暖而稳定，远处法达林镇的灯火依稀可见，偶尔传来狗吠声。天空中繁星点缀，塞拉尼斯的月光洒在营地上，万籁俱寂。' },
        ],
        choices: [
          { text:'生火休息（恢复40%生命值）', result:{ hp:40, flags:['campfire_rested'] }, msg:'你在篝火旁蜷缩下来，盔甲与装备整齐地摆放在触手可及的地方。沉沉睡去，次日醒来，阳光透过树叶的缝隙落在你脸上，伤势好转了不少。', back:true, when: gs => !gs.flags.includes('campfire_rested') },
          { text:'继续休息（再次休整）', result:{ hp:40 }, msg:'你再次在篝火边休息，让身体恢复到最佳状态。', back:true, when: gs => gs.flags.includes('campfire_rested') },
          { text:'用草药疗伤（需要月光草）', cost:{ items:['herb'] }, result:{ hp:60 }, msg:'你将月光草捣碎，涂抹在伤口上，再缠上绷带。草药的清凉气息散开，伤口愈合加快，你感到精力充沛。', stayHere:true, when: gs => gs.inventory?.includes('herb') },
          { text:'回顾旅程，整理思路', paragraphs:[
            { type:'text', text:'你坐在篝火旁，将这段旅程的所有线索在脑海中重新梳理一遍。贡德伦的失踪，克拉格茅地窟，回响洞穴，黑蜘蛛……这些拼图正在逐渐拼合成一幅更大的画面。' },
            { type:'text', text:'法达林镇的人们需要帮助，而回响洞穴里的法术熔炉，更是费伦大陆上无数势力觊觎的目标。你知道，真正的冒险才刚刚开始。' },
          ], stayHere:true },
          { text:'离开营地', back:true },
        ],
      },
    ],
  },

  // ─── 铁狮商行 ───
  smith_enter: {
    icon: '🛡️', title: '铁狮商行',
    variants: [
      {
        when: gs => gs.flags.includes('redbrand_cleared'),
        paragraphs: [
          { type:'npc', text:'琳内·格雷温德见到你走进来，立刻绕过柜台快步迎上，神情喜悦。"是你！我听说了你做的事情！我那批被偷的货物——都找回来了吗？"' },
          { type:'text', text:'她扫视了一下你背包里的物品，眼睛里闪过惊喜。' },
          { type:'npc', text:'"太好了！这些铠甲和武器正是我们镇上缺的！你救了铁狮商行，也救了这些等着添置装备的人们。说好的报酬，我一定兑现。"她从抽屉里拿出一个钱袋和一把闪亮的匕首。' },
        ],
        choices: [
          { text:'领取报酬', result:{ gold:50, items:['steel_dagger'] }, msg:'琳内递给你五十金币和一把上好的钢匕首。"下次需要装备，来找我，有折扣。"', goto:'smith_enter' },
          { text:'浏览商品', goto:'smith_enter' },
          { text:'离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'铁狮商行的门上挂着一只铁铸的雄狮头像，叩门环铛铛作响。店内整洁，货架上摆着各类武器、盾牌和防具，剑与斧在阳光下闪着冷芒。' },
          { type:'text', text:'柜台后站着一名干练的中年女性，她肤色略深，短发，手臂上有几道旧伤痕。这就是琳内·格雷温德，铁狮商行的老板，眼神锐利，把你从头到脚扫了一遍。' },
          { type:'npc', text:'"新面孔。你是要买东西，还是卖东西？"她简短地问，语气不冷不热。' },
          { type:'npc', text:'"顺便说一句——"她的语气稍软，"有一批我们商行的货物前几周被红袍帮从运货车上洗劫了。里头有盔甲和武器，价值不菲。如果你能从特雷森达庄园里把东西找回来，我付给你一笔丰厚的报酬，外加一件好装备。"' },
        ],
        choices: [
          { text:'浏览商品（购买治疗药水 30g）', cost:{ gold:30 }, result:{ items:['healing_potion'] }, msg:'琳内从柜台下方取出一小瓶泛着红色光泽的药水，"标准配方，喝下去能恢复不少气力。"', stayHere:true },
          { text:'询问被劫货物', paragraphs:[
            { type:'npc', text:'"三周前，我们从内华冬城运来的货物在崔鲍尔小道上被劫。那群红袍帮的混蛋把所有箱子都搬进了特雷森达庄园的地下室——这我已经有了线人消息。找回来，我出一百金币加一件我亲手挑的装备。"' },
          ], stayHere:true },
          { text:'离开商行', back:true },
        ],
      },
    ],
  },

  // ─── 巴泰恩商行 ───
  merchant_enter: {
    icon: '🧺', title: '巴泰恩商行',
    variants: [
      {
        when: gs => !gs.flags.includes('met_barthen'),
        paragraphs: [
          { type:'text', text:'巴泰恩商行是法达林镇规模最大的杂货铺，门口摆着几个大木桶，里面装着晒干的豆子和谷物。铃铛叮叮当当地响过，你走进一个摆满货架的宽敞店面。' },
          { type:'text', text:'一个头发斑白的老人从货架深处钻出来，他戴着眼镜，身穿普通的布袍，但脸上挂着真诚的笑容，令人如沐春风。' },
          { type:'npc', text:'"哦，新客人！欢迎欢迎，我是艾尔玛·巴泰恩，这家店我经营了二十多年。"他热情地招呼，"需要什么尽管开口。"' },
          { type:'npc', text:'他的笑容突然带上了一丝忧色，"对了，你在路上有没有遇到一个矮人——贡德伦·罗克西克？他和同伴前几天就应该到达法达林镇了，说好会来我这里，但一直没有消息……我有些担心。"' },
        ],
        choices: [
          { text:'询问贡德伦的事', goto:'merchant_enter', effect:{ flags:['met_barthen'] } },
          { text:'浏览货品（月光草 15g）', cost:{ gold:15 }, result:{ items:['herb'] }, msg:'巴泰恩从一个绑着麻绳的木架上取下一束干燥的月光草，"自己采的，新鲜着呢，疗伤用最好。"', stayHere:true, effect:{ flags:['met_barthen'] } },
          { text:'离开', back:true },
        ],
      },
      {
        when: gs => gs.flags.includes('gundren_map_found'),
        paragraphs: [
          { type:'npc', text:'巴泰恩见到你进门，立刻放下手中的账本，"你找到贡德伦了？他还好吗？！"' },
          { type:'text', text:'你把经过告诉他，他听完长长地松了口气，双手合十，喃喃地感谢神明。' },
          { type:'npc', text:'"太好了，太好了……我就知道他不会有事的。"他用手背拭了拭眼角，随后从柜台下方取出一个布袋，"这是我的一点心意，你帮了我们大忙。以后来买东西都打折！"' },
        ],
        choices: [
          { text:'感谢他，接受心意', result:{ gold:20 }, msg:'巴泰恩塞给你二十金币，"买药草、补给，都来找我，老朋友价！"', goto:'merchant_enter' },
          { text:'浏览货品', goto:'merchant_enter' },
          { text:'离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'巴泰恩商行温暖而热闹。艾尔玛·巴泰恩正在整理货架，见你进来便招手。' },
          { type:'npc', text:'"哦，是你！有什么需要的吗？我最近进了一批新的月光草，上好的品质。"' },
        ],
        choices: [
          { text:'购买月光草（15g）', cost:{ gold:15 }, result:{ items:['herb'] }, msg:'新鲜的月光草，疗伤用最好。', stayHere:true },
          { text:'购买治疗药水（25g）', cost:{ gold:25 }, result:{ items:['healing_potion'] }, msg:'巴泰恩从架子上取下一瓶小药水，"这是托我的关系从内华冬城进来的，货真价实。"', stayHere:true },
          { text:'询问贡德伦的消息', paragraphs:[
            { type:'npc', text:'"还是没有消息……"巴泰恩摇摇头，"贡德伦是个好矮人，兢兢业业，从不爽约。如果他说会来，一定会来的。我很担心他。"' },
          ], stayHere:true },
          { text:'离开', back:true },
        ],
      },
    ],
  },

  // ─── 翠野小径 ───
  wild_herb_zone: {
    icon: '🌿', title: '翠野小径（崔鲍尔小道）',
    variants: [
      {
        when: gs => gs.flags.includes('gundren_map_found'),
        paragraphs: [
          { type:'text', text:'崔鲍尔小道在晨光中显得格外宁静，两侧的野花在微风中轻轻摇摆。你已经熟悉了这条路，知道哪里有药草，哪里有潜在的危险。' },
          { type:'text', text:'道路旁，残留着那辆被劫货车的痕迹——车辙、散落的货物碎片，以及泥地上干涸的褐色血迹。那是贡德伦遇袭的地方。' },
        ],
        choices: [
          { text:'采集月光草', result:{ items:['herb'] }, msg:'你在路旁的灌木丛中找到几株月光草，叶片银白，在阳光下闪闪发光，是上好的药材。', stayHere:true },
          { text:'仔细检查遇袭现场', paragraphs:[
            { type:'text', text:'你蹲下来仔细检查现场。泥地上有哥布林宽大靴印，向北延伸进树林。你还发现了一个被踩扁的皮革钱包，里面是空的，但上面绣着矮人风格的图案，应该是贡德伦的。' },
            { type:'text', text:'足迹清晰地指向克拉格茅地窟的方向。' },
          ], stayHere:true },
          { text:'返回', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你踏上崔鲍尔小道。这条路穿越农田和矮丘，是连接法达林镇与东部地区的主要通道。道路两侧，野草丛生，偶尔可以看到散落在路边的农家。' },
          { type:'text', text:'秋风轻拂，路旁的白桦树叶沙沙作响。你注意到路边的灌木丛中有月光草的银白叶片在风中摇曳。然而，就在你俯身采集的时候，灌木丛的另一侧传来低沉的嘀咕声……' },
        ],
        choices: [
          { text:'小心地采集草药（DEX检定）', when: gs => gs.stats.DEX >= 12, result:{ items:['herb'] }, msg:'你屏气凝神，轻手轻脚地采集了几株月光草，然后悄然退开，没有惊动灌木丛里的东西。', stayHere:true },
          { text:'直接采集草药（可能遇敌）', result:{ items:['herb'], combat:'goblin' }, msg:'你正采着草药，突然灌木丛一阵颤抖，两个哥布林跳出来嗷嗷叫着扑向你！', stayHere:true },
          { text:'检查遇袭的货车残骸', paragraphs:[
            { type:'text', text:'在小道旁，你发现了一辆被翻倒的货车。车辕折断，货物散落一地，大部分已被搬走，只剩下一些破碎的木板和空箱子。' },
            { type:'text', text:'你在车辕下方发现一枚刻着矮人符文的袖珍铜牌——是货物标签，上面的名字正是：贡德伦·罗克西克。这就是那次伏击的地点。向北方的足迹通向克拉格茅地窟。' },
          ], result:{ flags:['gundren_map_found'] }, stayHere:true, when: gs => !gs.flags.includes('gundren_map_found') },
          { text:'返回法达林镇', back:true },
        ],
      },
    ],
  },

  // ─── 永冬林 ───
  forest_explore: {
    icon: '🌲', title: '永冬林',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'永冬林的树冠茂密得几乎遮蔽了天空，古老的树根盘踞在苔藓覆盖的地面上，将道路变成了迷宫。林中静谧得出奇，只有风穿树梢发出低沉的呜鸣，像是古老的低语。' },
          { type:'text', text:'这片森林里有各种危险，也有各种秘密。你感到空气中弥漫着一股神秘的气息——不是恐惧，而是某种更古老、更深沉的东西的回响。' },
        ],
        choices: [
          { text:'深入探索（有随机遭遇风险）', result:{ combat:'giant_spider' }, msg:'你在密林中穿行，突然脚下的树枝断裂，你发现自己误入了一张巨大蜘蛛网的边缘！', stayHere:true },
          { text:'寻找内瑟里尔废墟（需要INT 13+）', when: gs => gs.stats.INT >= 13, paragraphs:[
            { type:'text', text:'你根据地面上的古老符文和方位，循迹找到了一处被藤蔓包裹的石砌遗迹。石碑上刻着内瑟里尔帝国的文字，经过辨认，你读出了回响洞穴的大致方位描述——以及法术熔炉的部分历史记载。' },
            { type:'text', text:'"法术熔炉，由三个古老世家联合建造，以精魔法的力量铸造任何金属与魔法物件……"文字因风化而残缺，但信息已经足够。' },
          ], result:{ flags:['forge_found'] }, stayHere:true },
          { text:'采集树液和草药', result:{ items:['herb'] }, msg:'你在林中找到一株罕见的银叶草，采摘下来包好。这在法达林镇能卖个好价钱，或者自用疗伤。', stayHere:true },
          { text:'离开森林', back:true },
        ],
      },
    ],
  },

  // ─── 猫头鹰井 ───
  wizard_tower_door: {
    icon: '💀', title: '猫头鹰井废塔',
    variants: [
      {
        when: gs => gs.activeQuests?.q_edermath === 'investigate',
        paragraphs: [
          { type:'text', text:'废塔周围的气氛沉重而诡异。你已经见过哈蒙·科斯特——塔尔的红色法师，如今他的帐篷依然在废塔旁边，帐前的不死仆从机械地来回踱步，空洞的眼窝中散发着幽蓝的鬼光。' },
          { type:'npc', text:'哈蒙·科斯特见到你回来，从帐篷里踱出，袍子上绣着红色和黑色的图案，他的光头上刺着塔尔的标志性纹身。"你带来克拉格茅城堡的消息了吗？告诉我那里是谁在掌控一切，我们的协议便算完成。"' },
        ],
        choices: [
          { text:'告诉他克拉格茅城堡的情况', result:{ questUpdate:['q_edermath','return'], gold:20 }, msg:'哈蒙满意地点头，"黑蜘蛛……有趣。感谢你的情报，我会暂时停止我的研究，离开这里。"他扔给你一个钱袋，"协议完成。"', back:true },
          { text:'攻击哈蒙和他的骷髅仆从', result:{ combat:'skeleton' }, msg:'哈蒙冷笑一声，挥手让骷髅们扑向你！', stayHere:true },
          { text:'暂时离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你来到一处荒废的古代瞭望塔。塔身已经半塌，砖石上布满苔藓，但令人心寒的是，塔周围最近明显有人活动过——地面上有新挖的沟渠，以及最令人不安的：新鲜的坟墓。一排整整齐齐的土坡，每个上面都立着一根细小的标记棍。' },
          { type:'text', text:'就在你观察的时候，一个声音从附近的帐篷里传来，平静而带着某种居高临下的傲慢：' },
          { type:'npc', text:'"旅人。不要紧张。我叫哈蒙·科斯特，塔尔的学者。这些……工具，"他用手示意那些坟墓，"是我研究工作的必要手段。我无意伤害法达林镇的居民，只是需要一些东西。"' },
          { type:'npc', text:'"事实上，你来得正好。我需要知道克拉格茅城堡里是谁在指挥那群哥布林。给我这个消息，我便停下挖掘行动，离开这里，不再打扰任何人。"' },
        ],
        choices: [
          { text:'接受交易，去打探克拉格茅城堡', result:{ questUpdate:['q_edermath','investigate'] }, msg:'哈蒙面无表情地点点头，"明智的选择。速去速回。"他转身走回帐篷，骷髅仆从们继续机械地巡逻。', back:true },
          { text:'拒绝并攻击骷髅仆从', result:{ combat:'skeleton' }, msg:'骷髅们立刻转身，空洞的眼窝中鬼光闪烁，向你扑来！', stayHere:true },
          { text:'谨慎离开', back:true },
        ],
      },
    ],
  },

  // ─── 回响洞穴入口 ───
  mine_entrance: {
    icon: '⛏️', title: '回响洞穴入口',
    variants: [
      {
        when: gs => gs.flags.includes('forge_found') || gs.activeQuests?.q_wave_echo === 'forge',
        paragraphs: [
          { type:'text', text:'你站在回响洞穴的深处，岩壁上的古老法术阵列已经被你一一破解。法术熔炉就在前方——那个传说中的地方，能够将凡俗金属与魔法力量合而为一的古代奇迹。' },
          { type:'text', text:'熔炉在黑暗中发出幽幽的蓝白色光芒，尽管已经沉寂数百年，但那股蕴藏其中的力量依然令人心跳加速。石台旁边，散落着古代铸造师们留下的工具和残缺的记录石板。' },
        ],
        choices: [
          { text:'激活法术熔炉', result:{ questUpdate:['q_wave_echo','done'], gold:200, fame:20, flags:['forge_found'] }, msg:'你将手放在熔炉的核心石上，古老的魔法力量涌入你的体内，随后稳定下来，化为一股持久的力量。法术熔炉再度运作——法达林矿坑的传奇，由你重新开启。', back:true },
          { text:'仔细研究熔炉的机制', paragraphs:[
            { type:'text', text:'石板上的记录显示，法术熔炉由三个世家共同运营：罗克西克家族（矮人采矿者）、阿巴维尔家族（精灵法师）和哈尔巴克家族（人类战士），他们共同守护这处秘密。直到两百年前的地底战争摧毁了一切。' },
          ], stayHere:true },
          { text:'先退出去，稍后再来', back:true },
        ],
      },
      {
        when: gs => gs.flags.includes('gundren_map_found'),
        paragraphs: [
          { type:'text', text:'手持贡德伦留下的地图，你找到了那块用来遮挡洞穴入口的巨石。果然，仔细观察之下，那巨石并非天然形成——石缝处的磨损痕迹表明它曾被多次移动。' },
          { type:'text', text:'你用力将巨石推开，一阵带着矿物气息的凉风扑面而来，洞穴深处传来遥远的、类似海浪拍打的回响声——回响洞穴，名不虚传。黑暗中有什么东西在等待着你。' },
        ],
        choices: [
          { text:'小心进入洞穴', result:{ questUpdate:['q_wave_echo','explore'] }, goto:'wave_echo_depths' },
          { text:'先做准备再进入', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'在法达林镇东北的山脚下，你找到了一处隐蔽的山壁。这里地势偏僻，树木遮蔽，普通人很难注意到。一块巨大的圆形巨石靠在山壁前，看起来极为自然。' },
          { type:'text', text:'但你没有地图，也不知道如何开启入口。强行探索只会让你在黑暗中迷失，甚至受伤。' },
        ],
        choices: [
          { text:'试图强行进入（危险）', result:{ hp:-15 }, msg:'你在黑暗中摸索，不慎滑落，撞在了锋利的岩石上。伤口渗出血来。你被迫退出来。失去了15点生命值。', back:true },
          { text:'在周围寻找线索', paragraphs:[
            { type:'text', text:'你检查了岩壁和周围的地形，隐约感到这里就是传说中回响洞穴的入口，但没有地图，你无法确定开启方式。你需要先找到贡德伦，取得那张地图。' },
          ], back:true },
          { text:'离开这里', back:true },
        ],
      },
    ],
  },

  // ─── 阿加莎的废墟 ───
  shrine_meet: {
    icon: '👻', title: '阿加莎的废墟',
    variants: [
      {
        when: gs => gs.flags.includes('agatha_spoken'),
        paragraphs: [
          { type:'text', text:'你再次来到废墟。这里一片死寂，被青苔包裹的石柱静静矗立在林中。阿加莎的幽灵已经消散，或者只是在某处沉眠。' },
          { type:'text', text:'你已经得到了需要的答案。鲍根特的法术书，早在多年前就被阿加莎交易给了雷声树镇的一位死灵法师。嘉芮丽修女在等你的消息。' },
        ],
        choices: [
          { text:'返回法达林镇', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'深林中，你找到了那处被藤蔓吞噬的古代废墟——断裂的石柱，倒塌的墙体，以及弥漫在空气中的冰冷气息，那是幽灵存在时特有的寒意。' },
          { type:'text', text:'你刚踏入废墟核心，一道幽灵般的人影便从虚空中凝聚出现——那是一个精灵女性的轮廓，曾经美丽的面容上如今带着永恒的、空洞的哀愁。她凝视着你，幽灵的眼中并没有立刻显现出敌意，而是一种古老的、疲倦的审视。' },
          { type:'npc', text:'"又一个活人……"她的声音如远处的风声，"你来这里，所求何事？"' },
        ],
        choices: [
          { text:'恭敬地献上银梳（需要银梳）', when: gs => gs.inventory?.includes('silver_comb'), cost:{ items:['silver_comb'] }, result:{ questUpdate:['q_garaele','find_ruins'], flags:['agatha_spoken'] }, msg:'你双手捧起银梳，低下头恭敬地呈上。阿加莎的幽灵沉默片刻，随后伸手触碰了梳子。她的表情微微松动，那千年的孤寂中似乎泛起了一丝怀念。她告诉你：鲍根特的法术书，她早在两百年前就卖给了雷声树镇的一个死灵法师，换取了某种长生秘术。如今那法师大概早已成骨，书的下落不明。但这已经是嘉芮丽需要的答案。', back:true },
          { text:'凭借口才与她沟通（CHA 14+）', when: gs => gs.stats.CHA >= 14, result:{ flags:['agatha_spoken'], questUpdate:['q_garaele','find_ruins'] }, msg:'你以诚恳而谦逊的语气与她交流，谈到她昔日的美貌与学识，谈到活人对古代智慧的尊重。阿加莎凝视着你，沉默良久，最终开口谈及了鲍根特的法术书——那本书早已被她交易给了雷声树镇的一位死灵法师。这就是嘉芮丽需要的线索。', back:true },
          { text:'依靠博学与她对话（INT 14+）', when: gs => gs.stats.INT >= 14, result:{ flags:['agatha_spoken'], questUpdate:['q_garaele','find_ruins'] }, msg:'你以精确的学术语言提及了鲍根特的著作和古代法术理论，阿加莎的眼中闪过一丝兴趣。她告诉你，那本法术书被她卖掉了，换给了一个来自雷声树镇的死灵法师。记下这个线索，回去告诉嘉芮丽。', back:true },
          { text:'贸然威胁她', result:{ hp:-20, combat:'wraith' }, msg:'阿加莎的面容扭曲，愤怒地嚎叫着，幽魂之力席卷而来！', stayHere:true },
          { text:'退出废墟', back:true },
        ],
      },
    ],
  },

  // ─── 荆棘堡废墟（雷声树镇）───
  dragon_lair: {
    icon: '🐉', title: '荆棘堡废墟（雷声树镇）',
    variants: [
      {
        when: gs => gs.flags.includes('dragon_slain'),
        paragraphs: [
          { type:'text', text:'雷声树镇的废墟如今在阳光下显得出奇宁静。没有了维尼斯范盘踞在中央高塔，整个废墟像是松了口气，连空气都清新了几分。' },
          { type:'text', text:'你用双手拭去额头的血迹，抬头看向那座再也不会喷出毒雾的高塔。屠龙者——这个称号，你已经用实力赢得了。' },
        ],
        choices: [
          { text:'搜索废墟的宝藏', result:{ gold:150, items:['dragon_scale'] }, msg:'在维尼斯范的巢穴中，你找到了一堆积累多年的财宝——金币、珠宝、以及数片巨大而坚硬的龙鳞。这些东西价值连城。', stayHere:true },
          { text:'离开废墟', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'雷声树镇的废墟在灰色的天空下显得阴森而破败。几十年前一次地底火山喷发摧毁了整个村庄，如今这里是灰烬僵尸和其他不死生物的地盘。' },
          { type:'text', text:'走过废弃街道，你在远处看见镇中央的高塔——一座保存尚好的石砌塔楼，门窗都已经破碎，但塔身坚固。一种令人窒息的绿色气息弥漫在塔楼周围，那是毒雾的味道。然后，你看见了那双眼睛：一双发着绿光的巨大眼睛，在塔顶的阴影中注视着你。' },
          { type:'npc', text:'"人类……"一个低沉而带着轻蔑的声音从塔顶传来，"你还真是有胆量。告诉我，来这里干什么？"' },
          { type:'text', text:'是维尼斯范——一头年轻的绿龙，身躯布满苔绿色的鳞片，翅膀展开时遮蔽了半个塔楼。年轻，但已经相当危险。' },
        ],
        choices: [
          { text:'奉承它，试图谈判（CHA 15+）', when: gs => gs.stats.CHA >= 15, paragraphs:[
            { type:'npc', text:'"伟大的维尼斯范，"你仰头说，"您的名声已经传遍了整个剑湾海岸。我来此，只是为了表达对您智慧与力量的敬意，并非为了冒犯。"' },
            { type:'text', text:'绿龙停顿了一下，似乎对这样的恭维感到一丝满意，"哦？说下去。"' },
          ], stayHere:true },
          { text:'询问它关于死灵法师和鲍根特法术书的事（INT 13+）', when: gs => gs.stats.INT >= 13, paragraphs:[
            { type:'npc', text:'维尼斯范居高临下地笑了，"那个死灵法师，我亲眼看着他来了又走。他带着一本书，后来被我的毒雾解决了，他的骨灰就在那条街上的某处……至于那本书嘛，在一堆废墟里，你自己去找吧。"' },
          ], stayHere:true },
          { text:'发动攻击！', result:{ combat:'dragon' }, msg:'维尼斯范张开血盆大口，深绿色的毒雾席卷而下！BOSS战开始！', stayHere:true },
          { text:'谨慎撤退', back:true },
        ],
      },
    ],
  },

  // ─── 剑湾海岸悬崖 ───
  cliffs_meet: {
    icon: '🌊', title: '剑湾海岸',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你来到剑湾海岸。高耸的白色悬崖绵延望不到头，脚下是深邃的墨绿色海水，海浪拍打岩石的声音如雷鸣般震撼。' },
          { type:'text', text:'海风强劲而咸湿，夹带着远方内华冬城的气息。在悬崖边上，你看见几具船骸的残片，被潮水冲到岸边。在更远处，一列身穿红袍的人正在悬崖小道上行进——是红袍帮的巡逻队。' },
        ],
        choices: [
          { text:'搜索船骸残片', result:{ gold:30, items:['rope'] }, msg:'你在船骸中翻找，发现了三十金币的硬币（被防水皮袋保护），以及一卷结实的麻绳。', stayHere:true },
          { text:'偷袭红袍帮巡逻队', result:{ combat:'redbrand' }, msg:'你趁着海风压住了脚步声，向那几个红袍人靠近……', stayHere:true },
          { text:'观察海面，寻找过路船只', paragraphs:[
            { type:'text', text:'你站在悬崖边远眺。海面上有几艘商船的帆影，朝着内华冬城的方向前进。偶尔能看到一艘涂着黑旗的船只在远处游荡——私掠船，还是海盗？' },
          ], stayHere:true },
          { text:'离开海岸', back:true },
        ],
      },
    ],
  },

  // ─── 废弃瞭望塔 ───
  lighthouse_meet: {
    icon: '🗼', title: '废弃瞭望塔',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'海岸边的废弃瞭望塔已经年久失修，外墙的砖石大片脱落，铁质楼梯锈迹斑斑。但从外面就能看见塔内层层叠叠的营地杂物——有人在这里住着。' },
          { type:'text', text:'塔门没有锁，半开着。从缝隙里透出的摇曳火光和低声交谈声告诉你：里面有人，而且不止一个。你认出了那件红色斗篷——红袍帮。' },
        ],
        choices: [
          { text:'强行破门而入', result:{ combat:'redbrand' }, msg:'你一脚踹开破旧的铁门，塔内的三名红袍帮成员立刻跳起来！', stayHere:true },
          { text:'从窗缝侦查（DEX 12+）', when: gs => gs.stats.DEX >= 12, paragraphs:[
            { type:'text', text:'你猫着腰绕到侧面，从一个低矮的窗缝向里望去。三名红袍帮的人围着桌子喝酒，桌上有一个上了锁的木箱。其中一个人正在翻看一张纸——像是命令文件。' },
            { type:'text', text:'如果能安静地处理掉他们，那个箱子里也许有有价值的情报……' },
          ], stayHere:true },
          { text:'搜索塔外的地基区域', result:{ items:['herb'], gold:15 }, msg:'在塔基的废墟碎石间，你找到了一些被遗忘的物资——一束药草和一个落满灰尘但仍有硬币的布袋。', stayHere:true },
          { text:'离开这里', back:true },
        ],
      },
    ],
  },

  // ─── 克拉格茅地窟入口 ───
  crypt_entrance: {
    icon: '🕳️', title: '克拉格茅地窟入口',
    variants: [
      {
        when: gs => gs.flags.includes('sildar_rescued'),
        paragraphs: [
          { type:'text', text:'地窟的入口依然阴暗，但那股霉烂与兽皮混杂的恶臭已经淡了不少——里面的哥布林已经被你清过一遍了。' },
          { type:'text', text:'西尔达已经安全获救，贡德伦的地图也在你手中。克拉格茅地窟对你来说已经没有悬念。' },
        ],
        choices: [
          { text:'进入搜索更多战利品', result:{ gold:40 }, msg:'你在地窟深处翻找，找到了哥布林们积存的一些铜币和银币，共计四十金币的价值。', stayHere:true },
          { text:'离开这里', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你找到了克拉格茅地窟的入口——山丘边一处被藤蔓遮掩的洞口，腐臭的气味从洞穴深处飘出，是兽皮、烂肉、和哥布林独特的身体气味的混合物。入口两侧，可以看到随意堆放的骨头和简陋的陷阱。' },
          { type:'text', text:'洞口深处传来哥布林的咕哝声和狼的低吼。他们显然设了岗。' },
        ],
        choices: [
          { text:'潜行绕过（DEX 13+）', when: gs => gs.stats.DEX >= 13, result:{ questUpdate:['q_gundren','find_map'] }, msg:'你屏住呼吸，在阴影中移动，一步一步地绕过入口处的哥布林岗哨和狼圈，成功潜入洞穴深处，没有惊动任何人。', goto:'crypt_inner' },
          { text:'正面突击', result:{ combat:'goblin', questUpdate:['q_gundren','find_map'] }, msg:'你握紧武器，大步踏入洞口。哥布林们立刻发出刺耳的警报嚎叫！', goto:'crypt_inner' },
          { text:'向洞口投掷石块制造声响', paragraphs:[
            { type:'text', text:'你捡起一块石头，用力抛向洞口一侧的灌木丛。一阵动静引发了哥布林们的注意，他们嚷嚷着朝那个方向涌去，洞口暂时空出了一段时间。' },
          ], result:{ questUpdate:['q_gundren','find_map'] }, goto:'crypt_inner' },
          { text:'先回去准备，稍后再来', back:true },
        ],
      },
    ],
  },

  // ─── 克拉格茅地窟深处 ───
  crypt_inner: {
    icon: '⚔️', title: '克拉格茅地窟深处',
    variants: [
      {
        when: gs => gs.flags.includes('sildar_rescued'),
        paragraphs: [
          { type:'text', text:'地窟深处的主厅如今一片狼藉。大地精卡拉格的大锤还倒在地上，他巨大的身躯已经不在了。牢房里的木栅栏被拆开了，那是西尔达曾经被关押的地方。' },
          { type:'text', text:'你已经完成了这里的使命。地窟里可能还有一些遗留的战利品。' },
        ],
        choices: [
          { text:'彻底搜索地窟', result:{ gold:60, items:['healing_potion'] }, msg:'你在角落里翻找，发现了哥布林们积攒的财物——金银各有，还有一瓶哥布林们显然不知道如何使用的治疗药水。', back:true },
          { text:'离开地窟', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你深入地窟，沿着潮湿的石壁一路向前，终于来到主厅。这里是地窟最大的空间，中央有一处粗糙的营地，破旧的毛皮和骨头散落一地。' },
          { type:'text', text:'在厅的一侧，一扇木栅栏关着一个牢房——里面，你看见一个人影正坐在黑暗中，是西尔达·霍尔温特，他的旅行装备蒙着灰，但神情仍然坚定。' },
          { type:'text', text:'然后，主厅角落的黑暗中传来一声低沉的咆哮。一个庞大的身影站起来——是大地精卡拉格，他手持巨型战锤，皮毛坎肩下肌肉贲张，黄色的眼睛凶狠地盯着你。' },
          { type:'npc', text:'"你，找死！"卡拉格嚎叫着冲了过来。' },
        ],
        choices: [
          { text:'与卡拉格战斗！', result:{ combat:'bugbear', questUpdate:['q_gundren','rescue'], flags:['sildar_rescued'] }, msg:'卡拉格举起战锤猛砸而来！你举起武器应对——这是一场生死之战！', goto:'crypt_inner_victory' },
          { text:'用巧计分散卡拉格的注意力（INT 13+）', when: gs => gs.stats.INT >= 13, result:{ questUpdate:['q_gundren','rescue'], flags:['sildar_rescued'] }, msg:'你大声叫道："卡拉格！你的哥布林兄弟在外面被包围了，全都要死了！"卡拉格愣了一下，转头向入口方向张望，你趁机冲进牢房救出西尔达，两人一起将毫无防备的卡拉格击倒。', goto:'crypt_inner_victory' },
        ],
      },
    ],
  },

  crypt_inner_victory: {
    icon: '🗝️', title: '救出西尔达',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'卡拉格倒地，地窟里重归寂静。你撬开木栅栏，西尔达踉跄着走出牢房，虽然虚弱，但眼中充满感激。' },
          { type:'npc', text:'"是你……"西尔达的声音沙哑，"我没想到真的有人来救我。谢谢你。"' },
          { type:'npc', text:'"贡德伦……他们把贡德伦带走了，送去了克拉格茅城堡，交给了那个叫「黑蜘蛛」的家伙。"他拉住你的手臂，"我们必须去城堡找他。还有这个——"' },
          { type:'text', text:'他从卡拉格的铺位下方取出一个被皮革包裹的卷轴：贡德伦的地图，上面标注着回响洞穴的准确位置。' },
        ],
        choices: [
          { text:'接过地图，了解更多情报', result:{ items:['gundren_map'], flags:['gundren_map_found'], questUpdate:['q_gundren','rescue'] }, paragraphs:[
            { type:'npc', text:'"回响洞穴……那是古代法达林矿坑的秘密所在，传说里有一个叫法术熔炉的地方，能够铸造任何法术物品。贡德伦为此研究了十年。黑蜘蛛也想得到它——不能让他得逞。"' },
            { type:'npc', text:'"贡德伦此刻多半被押在西北方的克拉格茅城堡——那是黑蜘蛛驻扎之处。我会先回旅馆养伤，你必须独自前往。"西尔达郑重地点头，"地图上的另一处标记，就是城堡的位置。"' },
          ], effect:{ unlock:'cragmaw_castle' }, goto:'tavern_sildar' },
          { text:'与西尔达一起撤退', result:{ flags:['sildar_rescued'], questUpdate:['q_gundren','rescue'] }, effect:{ unlock:'cragmaw_castle' }, back:true },
        ],
      },
    ],
  },

  // ─── 内华冬城码头 ───
  harbor_dock: {
    icon: '⚓', title: '内华冬城码头',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'内华冬城的码头是整个剑湾海岸最繁忙的港口之一。各色船只挤在泊位上，桅杆如同一片移动的丛林。海鸥在空中盘旋，脚夫们喊着号子搬运货物，商人们在货仓旁大声交涉。' },
          { type:'image', src:'/scenes/neverwinter_harbor.png', alt:'内华冬城码头', caption:'内华冬城 · 悬崖港' },
          { type:'text', text:'这座城市因为"永不失落之城"的称号而著称，如今在内弗雷姆拜尔领主的统治下，依然是北部最重要的政治与贸易中心。然而在这繁华背后，各种势力也在暗中角力。' },
          { type:'text', text:'码头边，一个老水手正在修补渔网，偶尔朝你打量几眼；港务官员拿着厚厚的账本穿梭于各船之间；远处，几个身着便服的壮汉正低声交谈，眼神警惕。' },
        ],
        choices: [
          { text:'与老水手交谈', paragraphs:[
            { type:'npc', text:'"外乡人？"老水手放下渔网，"从法达林镇来的？那边最近不太平，听说有什么「黑蜘蛛」的家伙在搅局——我有个在崔鲍尔小道跑运输的兄弟，说那一带哥布林出没的次数比往年多了三倍。这里面肯定有人在背后指使。"' },
          ], stayHere:true },
          { text:'打听黑蜘蛛在城中的活动', paragraphs:[
            { type:'text', text:'你在码头区几个不同的人打听，得到的消息零碎，但可以拼凑成一个图像：最近有一个以深色兜帽遮面的家伙频繁出入城市南区的真塔里姆据点，会说黑暗精灵语的人都认出了他的口音。' },
          ], stayHere:true },
          { text:'前往内华冬城市集', goto:'harbor_fishmonger' },
          { text:'前往旅人之所', goto:'harbor_inn' },
          { text:'离开码头', back:true },
        ],
      },
    ],
  },

  // ─── 内华冬城市集 ───
  harbor_fishmonger: {
    icon: '🏪', title: '内华冬城市集',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'内华冬城的市集远比法达林镇热闹百倍——铁匠、布商、药剂师、魔法用品店鳞次栉比，空气中混合着香料、铁锈和街边烤肉的气味。每走几步，就有小贩向你兜售各种物品。' },
          { type:'text', text:'在市集深处，你注意到一家低调的店铺，门口挂着黑色的蛇形标志。店内没有吆喝声，但进进出出的顾客面色凝重，像是在做什么秘密交易——那是真塔里姆势力在城中的明面联络站。' },
        ],
        choices: [
          { text:'购买精良装备（铁甲 80g）', cost:{ gold:80 }, result:{ items:['iron_armor'] }, msg:'你在一家规模不小的铠甲店选购了一套内华冬城制造的锁甲，做工比法达林镇的货色好得多。', stayHere:true },
          { text:'出售龙鳞（获得丰厚报酬）', when: gs => gs.inventory?.includes('dragon_scale'), cost:{ items:['dragon_scale'] }, result:{ gold:300 }, msg:'一家专门收购异兽材料的商行老板见到龙鳞，眼睛立刻亮了，他压低声音开出了三百金币的价格，说要卖给城里的一位魔法师。', stayHere:true },
          { text:'打听真塔里姆的动向', paragraphs:[
            { type:'npc', text:'一个摆摊的旧书商凑到你耳旁低声说："真塔里姆最近在城里格外活跃，据说他们在帮某个黑暗精灵打探法达林矿坑的情报。小心这群人——他们买卖情报，也买卖人命。"' },
          ], stayHere:true },
          { text:'返回码头', goto:'harbor_dock' },
          { text:'离开市集', back:true },
        ],
      },
    ],
  },

  // ─── 旅人之所（内华冬城旅馆）───
  harbor_inn: {
    icon: '🏨', title: '旅人之所',
    variants: [
      {
        when: gs => gs.activeQuests?.q_harpers === 'done',
        paragraphs: [
          { type:'text', text:'"旅人之所"的大厅宽阔而安静，墙上挂着海景油画，地毯厚软，与法达林镇的石柱旅馆相比，这里像是另一个世界。' },
          { type:'npc', text:'哈珀联络员坐在角落里，见到你进来，微微颔首，"工作完成得很好。组织会记住你的贡献。"他推过来一个信封，里面是任务报酬。' },
        ],
        choices: [
          { text:'领取哈珀报酬', result:{ gold:80, fame:10 }, msg:'信封里有八十金币和一封介绍信，凭此可以在哈珀的各个据点得到帮助。', goto:'harbor_inn' },
          { text:'在此休息（20g，完全恢复HP）', cost:{ gold:20 }, result:{ hp:999 }, msg:'软床、热水澡和一顿丰盛的晚餐让你彻底恢复了精力。这才是真正的休息。', stayHere:true },
          { text:'离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'"旅人之所"是内华冬城码头区最体面的旅馆，常有往来商旅和冒险者在此落脚。大厅里透着精心布置的体面——彩绘玻璃窗，上好的橡木桌椅，以及穿着整洁的侍应在各桌间穿行。' },
          { type:'text', text:'你注意到一个看似普通的旅人独坐在角落，但他的眼睛太锐利了，把每一个进门的人都默默打量了一遍。他的领口处，隐约可见一枚银色的竖琴形徽章——那是哈珀组织的标志。' },
          { type:'npc', text:'他见你注意到了他，轻轻招了招手，示意你坐下。"你是从法达林镇那边过来的吗？"他的声音不大，"我们哈珀的人在那一带失去了联系。如果你有时间，我有一项任务想委托你。"' },
        ],
        choices: [
          { text:'听他说说这项任务', goto:'harbor_inn_quest' },
          { text:'在此休息（20g，完全恢复HP）', cost:{ gold:20 }, result:{ hp:999 }, msg:'你在旅人之所的舒适客房里美美地睡了一觉，次日醒来，整个人神清气爽，所有伤势都已复原。', stayHere:true },
          { text:'离开旅馆', back:true },
        ],
      },
    ],
  },

  harbor_inn_quest: {
    icon: '🎵', title: '哈珀联络员',
    variants: [
      {
        when: () => true,
        paragraphs: [
          { type:'npc', text:'"我叫不重要。"哈珀联络员简短地说，"重要的是：真塔里姆黑网在内华冬城南区的码头仓库有一处秘密据点，最近一段时间他们的活动异常频繁。我怀疑他们正在为某个人——很可能是那个「黑蜘蛛」——秘密运送情报和人员。"' },
          { type:'npc', text:'"我需要你渗入他们的据点，找到具体的证据。如果你能搞清楚他们和黑蜘蛛之间的联系，哈珀组织愿意给你丰厚的报酬，并在未来提供援助。"' },
        ],
        choices: [
          { text:'接受哈珀的委托', result:{ questUpdate:['q_harpers','accept'] }, msg:'联络员点点头，低声告知了据点的大致位置——在码头南侧第三个仓库，入口在侧面的小巷里，用三短一长的敲门方式。', back:true },
          { text:'暂时不想卷入这件事', back:true },
        ],
      },
    ],
  },

  // ─── 真塔里姆据点 ───
  harbor_cult_door: {
    icon: '🕵️', title: '真塔里姆据点',
    variants: [
      {
        when: gs => gs.activeQuests?.q_harpers === 'investigate',
        paragraphs: [
          { type:'text', text:'根据哈珀联络员的指引，你找到了码头南侧那条狭窄的小巷，在第三个仓库的侧门前停下。三短一长地敲了门，门缝中出现了一双警惕的眼睛，随后门悄然开启。' },
          { type:'text', text:'仓库内部出奇地干净整洁，与外表的破旧截然不同。几个身穿便服的人在低声交谈，桌上摆着地图和文件——你一眼就认出了法达林镇周边的地形图，上面用红线标注了几处据点，其中一处正是克拉格茅城堡。' },
          { type:'text', text:'一个表情阴沉的头领盯着你，"你是谁派来的？说密语。"' },
        ],
        choices: [
          { text:'装作真塔里姆新人混入（CHA 14+）', when: gs => gs.stats.CHA >= 14, result:{ questUpdate:['q_harpers','return'] }, msg:'你用从别处打听来的片段模仿出密语，那头领半信半疑，但还是让你混了进去。你在里面发现了真塔里姆与黑蜘蛛往来的书信——正是哈珀需要的证据。你悄然离开，带走了关键文件。', back:true },
          { text:'同时也加入真塔里姆（STR 15+ 或 CHA 15+）', when: gs => gs.stats.STR >= 15 || gs.stats.CHA >= 15, result:{ questUpdate:['q_zhentarim','infiltrate'] }, msg:'你展示出足够的实力与胆识，真塔里姆头领对你刮目相看，邀请你加入他们的组织。当然，这并不妨碍你同时在哈珀那边卖个人情。在费伦大陆，双面间谍是一门古老而危险的艺术。', goto:'harbor_cult_door' },
          { text:'在混入前先探听消息再决定', paragraphs:[
            { type:'text', text:'你在据点外围绕了一圈，通过听取只言片语，拼凑出关键信息：真塔里姆正在帮助一个代号"黑蜘蛛"的黑暗精灵调集人手，目标是回响洞穴。行动定在近期。' },
          ], stayHere:true },
          { text:'放弃混入，离开小巷', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'在内华冬城南区的码头边，你找到了一条阴暗的小巷。仓库侧门看起来普通，但你注意到门框上有一道极不显眼的蛇形刻纹——真塔里姆的暗号。' },
          { type:'text', text:'进，还是不进？这条路通向城中最危险的黑色网络之一。但危险往往意味着机遇。' },
        ],
        choices: [
          { text:'用力敲门，直接表明身份', result:{ combat:'redbrand' }, msg:'门开了，但里面的人显然不欢迎不速之客。他们拔出武器！', stayHere:true },
          { text:'悄悄接近，尝试窃听', result:{ questUpdate:['q_zhentarim','rumor'] }, paragraphs:[
            { type:'text', text:'你贴着墙壁，听到了内部的对话片段："……黑蜘蛛要我们在回响洞穴入口这边守株待兔……任何知道矿坑位置的人，一律带来……不，是活的。"' },
            { type:'text', text:'你悄然退开。这个消息已经够有价值了——真塔里姆和黑蜘蛛确实有勾结。' },
          ], stayHere:true },
          { text:'离开这里', back:true },
        ],
      },
    ],
  },

  // ─── 达兰的果园（法达林镇东侧）───
  daran_orchard: {
    icon: '🍎', title: '达兰·埃德马斯的苹果园',
    variants: [
      {
        when: gs => gs.activeQuests?.q_edermath === 'return',
        paragraphs: [
          { type:'text', text:'达兰正在果园边缘擦拭一柄略显斑驳的长剑。看到你回来，他立刻收剑入鞘，眼中闪过一丝期待。' },
          { type:'npc', text:'"那座废塔的事——查清楚了？"老人的声音压得很低，"那家伙到底是什么来头？"' },
        ],
        choices: [
          { text:'告诉他塔尔红法师哈蒙·科斯特的事', result:{ questUpdate:['q_edermath','done'], gold:40, fame:5, exp:30 }, msg:'达兰听完，长长地吐了一口气，"塔尔的人……比我担心的要糟糕。但既然你已经把消息卖给他换走了他，至少法达林镇暂时安全了。"他递给你一袋金币，"做得漂亮，孩子。这是哈宾镇长一直拒绝兑现的悬赏，由我替他付清。"', back:true },
          { text:'再观察一下，暂不汇报', back:true },
        ],
      },
      {
        when: gs => !gs.flags.includes('met_daran'),
        paragraphs: [
          { type:'text', text:'你穿过一片低矮的苹果树，秋末的果实沉甸甸地挂在枝头，空气里满是甜腻而微带酒香的气息。果园中央有一栋朴素的石屋，门口的橡木摇椅上坐着一位白发苍苍的老半身人，腰间却出乎意料地挎着一柄做工精良的长剑。' },
          { type:'text', text:'他抬眼看你时，目光锋利得像猎人估量猎物，与他和善的笑容形成奇妙的反差。' },
          { type:'npc', text:'"哈，旅馆里的汤姆林说他派了个冒险者来找我？"老半身人放下手中的苹果，"我叫达兰·埃德马斯——曾经的公教骑士，现在只是个种苹果的老头子。坐吧，孩子。"' },
          { type:'npc', text:'"我不会拐弯抹角——这镇子上最近有三件怪事：红袍帮窝在特雷森达庄园下面，他们的头领是个会施法的家伙，人人叫他「玻璃杖」；克拉格茅地窟里那群哥布林的背后，似乎有更黑的影子；北边猫头鹰井那座废塔，最近夜里总有死气从里面飘出来。"' },
          { type:'npc', text:'"我老了，跑不动了。但你——你还跑得动。"' },
        ],
        choices: [
          { text:'询问玻璃杖与红袍帮', paragraphs:[
            { type:'npc', text:'"玻璃杖原名叫艾兹潘多，曾经是内华冬城法师协会的学徒。他的法杖是用玻璃和银丝做的，故得此名。他不是无名之辈——能让红袍帮听他指挥的人，至少是一位中阶法师。庄园地下室有秘门，需要从酒窖那边进。"' },
          ], stayHere:true, effect:{ flags:['met_daran'], unlock:'tresendar' } },
          { text:'询问猫头鹰井的死气', result:{ questUpdate:['q_edermath','accept'] }, paragraphs:[
            { type:'npc', text:'"我夜里巡逻时见过那地方——有人在那儿挖坟。塔尔的信徒，错不了，那帮黑袍子专门干这种勾当。我希望你能去看看，弄清楚到底是谁，他要做什么。事成之后，悬赏由我个人兑现。"' },
            { type:'text', text:'达兰从腰间取出一枚旧公教骑士徽章，递给你作为信物。' },
          ], result:{ questUpdate:['q_edermath','accept'], items:['paladin_token'] }, stayHere:true, effect:{ flags:['met_daran'] } },
          { text:'询问克拉格茅与黑蜘蛛', paragraphs:[
            { type:'npc', text:'"哥布林从来不会自己组织起来——它们怕黑暗精灵，但更服从黑暗精灵。这一带最近活跃的黑暗精灵就一个，叫做「黑蜘蛛」。他对法达林矿坑垂涎已久。等你救出贡德伦，恐怕真正的硬仗才刚开始。"' },
          ], stayHere:true, effect:{ flags:['met_daran'] } },
          { text:'告辞', back:true, effect:{ flags:['met_daran'], unlock:'tresendar' } },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'达兰坐在摇椅上，半合着眼晒太阳。果园里飘着苹果的香气。' },
          { type:'npc', text:'"回来啦，孩子。要喝杯果酒么？我亲手酿的，最适合受过伤的旅人。"' },
        ],
        choices: [
          { text:'喝一杯果酒（恢复 25 HP）', result:{ hp:25 }, msg:'果酒微甜醇厚，咽下后整个人暖洋洋的，肌肉的酸痛缓和了不少。', stayHere:true },
          { text:'询问近期消息', paragraphs:[
            { type:'npc', text:'"红袍帮还在；玻璃杖还在；黑蜘蛛还在。世界一时半会儿不会变好，但有你这样的孩子在，不会更糟。"老半身人闭着眼笑了笑。' },
          ], stayHere:true },
          { text:'告辞', back:true },
        ],
      },
    ],
  },

  // ─── 特雷森达庄园（红袍帮老巢）───
  redbrand_hideout: {
    icon: '🏚️', title: '特雷森达庄园',
    variants: [
      {
        when: gs => gs.flags.includes('redbrand_cleared'),
        paragraphs: [
          { type:'text', text:'特雷森达庄园已经空无一人。地下室里散落着红袍们仓皇逃窜时丢下的物品，玻璃杖艾兹潘多倒在他自己的法阵中央，法杖断成两截。' },
          { type:'text', text:'墙上钉着一封未来得及发出的信，落款是"S.S.（黑蜘蛛）"——证实了红袍帮与那位卓尔法师之间的勾结。' },
        ],
        choices: [
          { text:'最后再搜一遍', result:{ gold:40, items:['healing_potion'] }, msg:'你在玻璃杖的密柜里又找到一袋金币和一瓶治疗药水。', back:true },
          { text:'离开庄园', back:true },
        ],
      },
      {
        when: gs => gs.activeQuests?.q_redbrand === 'infiltrate',
        paragraphs: [
          { type:'text', text:'你顺着达兰指点的酒窖密道，潜入了特雷森达庄园的地下室。空气里有一股潮湿的霉味和刺鼻的硫黄气息。' },
          { type:'text', text:'石阶通向一处宽敞的拱顶大厅，墙上嵌着发着冷蓝光的法术石。大厅中央，一个身披银线长袍的瘦削男人正背对你，手中举着一柄通透如玻璃的法杖。在他身后，三名红袍帮护卫立刻拔出弯刀。' },
          { type:'npc', text:'"这么快就找上门了？"那男人缓缓转身，玻璃杖映出冷光，"汤姆林的告密，还是达兰那个老废物的指点？无所谓——你也只能死在这里了。"' },
        ],
        choices: [
          { text:'与玻璃杖正面交战！', result:{ combat:'redbrand', questUpdate:['q_redbrand','kill_glasstaff'] }, msg:'玻璃杖低声咏唱出一段精灵咒文，三名护卫同时扑上！', stayHere:true },
          { text:'用伪装的口才迷惑他（CHA 15+）', when: gs => gs.stats.CHA >= 15, paragraphs:[
            { type:'npc', text:'"等等——黑蜘蛛派我来传话。"你压低嗓音，眼神冷峻，"他改变了计划，要你立即撤离庄园。再耽搁，回响洞穴的事就要泡汤。"' },
            { type:'text', text:'玻璃杖瞳孔一缩，下意识地后退半步。这一瞬间，足够你看清整个房间——后方密道、护卫站位、法术石的脉络。' },
          ], result:{ flags:['glasstaff_distracted'] }, stayHere:true },
          { text:'抓住分神时机直取玻璃杖（DEX 14+）', when: gs => gs.flags.includes('glasstaff_distracted') && gs.stats.DEX >= 14, result:{ combat:'redbrand', questUpdate:['q_redbrand','kill_glasstaff'], flags:['redbrand_cleared','glasstaff_dead'] }, msg:'你猛地扑上前一刀劈下！玻璃杖来不及举杖防御，长袍上的银线在血光中四散——剩下的护卫见状慌忙转身，被你逐一击倒。', goto:'redbrand_hideout' },
          { text:'谨慎撤退，准备完毕再回来', back:true },
        ],
      },
      {
        when: gs => gs.flags.includes('met_daran') || gs.activeQuests?.q_redbrand,
        paragraphs: [
          { type:'text', text:'特雷森达庄园曾经是法达林镇最显赫的宅邸，如今铁门锈蚀、外墙爬满枯藤，门口蹲着两个无所事事的红袍帮，腰间挂着弯刀。' },
          { type:'text', text:'达兰提示过：庄园正门戒备森严，但东侧酒窖的地砖下有一条旧密道。' },
        ],
        choices: [
          { text:'从酒窖密道潜入', result:{ questUpdate:['q_redbrand','infiltrate'] }, goto:'redbrand_hideout' },
          { text:'强攻正门（恶战）', result:{ combat:'redbrand', questUpdate:['q_redbrand','infiltrate'] }, msg:'两名守门红袍立刻拔刀大吼："来人！有外来者！"', goto:'redbrand_hideout' },
          { text:'先观察一段时间', paragraphs:[
            { type:'text', text:'你躲在街角，观察庄园的换岗规律：每两小时一次，换岗时段东侧无人——那是潜入的最佳时机。' },
          ], stayHere:true },
          { text:'离开', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'特雷森达庄园紧闭的铁门和门口的红袍守卫让你望而却步。在不了解地形的情况下贸然行动并不明智——也许该先去打听打听消息。' },
        ],
        choices: [
          { text:'离开', back:true },
        ],
      },
    ],
  },

  // ─── 克拉格茅城堡（黑蜘蛛驻地）───
  cragmaw_castle: {
    icon: '🏰', title: '克拉格茅城堡',
    variants: [
      {
        when: gs => gs.flags.includes('gundren_freed'),
        paragraphs: [
          { type:'text', text:'克拉格茅城堡的废墟在风中沉默。哥布林国王葛劳尔早已倒下，黑蜘蛛也撤回了他真正的巢穴——回响洞穴深处。城堡里只剩下散落的兵器和几个躲藏在地窖的小哥布林。' },
        ],
        choices: [
          { text:'搜刮城堡残余财物', result:{ gold:80, items:['healing_potion'] }, msg:'你在国王宝座下的暗格里找到一袋金币和一瓶治疗药水。', back:true },
          { text:'离开', back:true },
        ],
      },
      {
        when: gs => gs.flags.includes('sildar_rescued') && !gs.flags.includes('gundren_freed'),
        paragraphs: [
          { type:'text', text:'按照贡德伦地图上的另一处标记，你穿过密林，终于来到克拉格茅城堡——一座坐落在山脊上的古代要塞，外墙崩塌，箭楼倾斜，却仍透着不容小觑的威严。' },
          { type:'text', text:'城堡正门被一根锈蚀的铁链锁着，但侧翼的塌陷处足够一个人爬入。城内隐隐传来哥布林的吵闹与酒醉的嬉笑——它们似乎正在举行某种庆典。' },
          { type:'npc', text:'你忽然听见远处一个陌生而冷硬的声音，用悠长的卓尔精灵腔调说道："……让那矮人再活几天，等他说出矿坑的最后一道封印再杀。"' },
        ],
        choices: [
          { text:'从崩塌处潜入（DEX 13+）', when: gs => gs.stats.DEX >= 13, paragraphs:[
            { type:'text', text:'你贴着崩塌的石壁滑入主厅。哥布林国王葛劳尔正瘫在他破烂的木宝座上，被红酒灌得醉醺醺；他身侧站着一位真正的卓尔精灵——披黑斗篷，蛛形纹章在胸前若隐若现。那就是黑蜘蛛。' },
            { type:'text', text:'黑蜘蛛察觉到一丝异响，皱眉抬头——但没有看见你。他对葛劳尔丢下一句"我先回洞穴布阵"，便从墙后的暗门消失了。' },
            { type:'text', text:'宝座旁的木栅栏后，一个矮人正紧握栅栏望向你——是贡德伦·罗克西克。' },
          ], result:{ flags:['saw_blackspider'] }, goto:'cragmaw_castle' },
          { text:'正门强攻', result:{ combat:'bugbear' }, msg:'你抽刀踢开侧门，整个主厅的哥布林同时回头嚎叫！葛劳尔国王怒吼着挥起石锤砸向你！', goto:'cragmaw_castle' },
          { text:'放火制造混乱（INT 13+）', when: gs => gs.stats.INT >= 13, paragraphs:[
            { type:'text', text:'你点燃城堡仓库中的干草和油桶，浓烟瞬间灌满走廊。哥布林们咳嗽着乱跑，黑蜘蛛在混乱中冷哼一声，从暗门撤退。葛劳尔被烟呛得跌出宝座——你抓住时机一击放倒了他。' },
          ], result:{ flags:['saw_blackspider'], combat:'bugbear' }, goto:'cragmaw_castle' },
          { text:'先撤退，准备得更充分', back:true },
        ],
      },
      {
        when: gs => gs.flags.includes('saw_blackspider') && !gs.flags.includes('gundren_freed'),
        paragraphs: [
          { type:'text', text:'葛劳尔倒在自己的酒池中。你撬开木栅栏，贡德伦颤抖着抓住你的手——他的手腕上还有镣铐磨破的伤痕，胡子也乱成一团，但眼神依然炯炯有神。' },
          { type:'npc', text:'"是西尔达派来的？老天在上！"贡德伦咧嘴笑了，露出两颗缺了的牙，"那狗娘养的黑蜘蛛已经从我嘴里套走了大部分封印的口令——他正在赶往回响洞穴。我们必须立刻动身！"' },
          { type:'npc', text:'"我的两个兄弟，撒尔登和努恩德罗——撒尔登已经死了，被黑蜘蛛亲手杀的。努恩德罗还活着，被关在洞穴深处当人质。我们要去救他。"' },
        ],
        choices: [
          { text:'扶起贡德伦，立刻动身', result:{ flags:['gundren_freed'], questUpdate:['q_gundren','done'], items:['gundren_map'], gold:30, exp:50 }, msg:'你扶着贡德伦走出城堡。临行前，他将一枚刻着家族纹章的钥匙塞到你手中，"这是回响洞穴最深处那扇门的钥匙——只有罗克西克家的人才能开。带着它，去解决黑蜘蛛。"', back:true },
          { text:'先在城堡里搜寻情报', paragraphs:[
            { type:'text', text:'你在葛劳尔的桌上翻到一封黑蜘蛛留下的羊皮卷——上面是回响洞穴内部的草图，标注着几处法阵节点和努恩德罗被囚的位置。' },
          ], stayHere:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你听说过克拉格茅城堡的位置，但在没有西尔达确认贡德伦下落之前，贸然前往是愚蠢的。' },
        ],
        choices: [
          { text:'离开', back:true },
        ],
      },
    ],
  },

  // ─── 回响洞穴中段（增补）───
  wave_echo_depths: {
    icon: '🕯️', title: '回响洞穴 · 深处回廊',
    variants: [
      {
        when: gs => gs.flags.includes('nundro_freed'),
        paragraphs: [
          { type:'text', text:'回廊里的回声已经平息。被解救的矮人努恩德罗已经逃回贡德伦身边。你前方就是法术熔炉的所在——以及黑蜘蛛最后的伏击。' },
        ],
        choices: [
          { text:'继续向法术熔炉前进', goto:'black_spider_lair' },
          { text:'退出洞穴，先做准备', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你举着贡德伦给你的家族钥匙，沿着洞壁的古老符文一路深入。隧道开始呈现出明显的工程痕迹——磨光的台阶、塌陷的支柱、半浮在墙面的法术节点石。' },
          { type:'text', text:'忽然，前方传来微弱的呼救声："这里——这里！求求你，救救我！"' },
          { type:'text', text:'回廊深处，一个被铁笼囚禁的矮人正紧贴栏杆——和贡德伦极为相似的眉眼，那是努恩德罗·罗克西克。然而铁笼旁站着两只巨型蜘蛛，吐着丝在地上织成网格陷阱。' },
        ],
        choices: [
          { text:'冲上去强行救人', result:{ combat:'giant_spider', flags:['nundro_freed'] }, msg:'你抽刀直冲——蜘蛛立刻嘶叫着扑下！', goto:'wave_echo_depths' },
          { text:'用火油烧网（需要月光草+治疗药水）', when: gs => gs.inventory?.includes('herb') && gs.inventory?.includes('healing_potion'), cost:{ items:['herb','healing_potion'] }, result:{ flags:['nundro_freed'], exp:30 }, msg:'你将月光草和药水混合点燃，火苗顺着蜘蛛丝蔓延，几乎瞬间烧光整张陷阱网。两只蜘蛛被烫得四散，被你逐一击杀。努恩德罗连声道谢，撑着伤腿沿原路逃出。', goto:'wave_echo_depths' },
          { text:'用钥匙开锁后再撤（DEX 14+）', when: gs => gs.stats.DEX >= 14, result:{ flags:['nundro_freed'], exp:20 }, msg:'你绕过蜘蛛视线，悄无声息地用罗克西克家族钥匙开锁，将努恩德罗带出陷阱区。两只蜘蛛似乎根本没察觉。', goto:'wave_echo_depths' },
          { text:'放弃他，继续深入（道德选择）', result:{ flags:['nundro_abandoned'] }, msg:'你绕过蜘蛛与铁笼，向更深处走去。努恩德罗惨白的呼喊在你身后渐渐微弱。这一刻你将背负多年——但至少黑蜘蛛不会再听到他的尖叫。', goto:'black_spider_lair' },
        ],
      },
    ],
  },

  // ─── 黑蜘蛛巢穴（最终决战）───
  black_spider_lair: {
    icon: '🕷️', title: '法术熔炉 · 黑蜘蛛',
    variants: [
      {
        when: gs => gs.flags.includes('blackspider_dead'),
        paragraphs: [
          { type:'text', text:'黑蜘蛛瑞索玛的尸身倒在熔炉冷却的核心石旁。他的蛛形护符碎裂在地，幽蓝法力如潮水般退散。整个洞穴第一次安静下来——连远处的"回响"也仿佛在为这一刻屏息。' },
          { type:'text', text:'你赢了。法术熔炉，连同它身上几百年的诅咒，回到了正当的传承者手中。' },
        ],
        choices: [
          { text:'激活法术熔炉（结束主线）', result:{ questUpdate:['q_wave_echo','done'], gold:300, fame:30, exp:80, flags:['forge_found','main_quest_done'] }, msg:'你将贡德伦的钥匙嵌入核心石——熔炉的内部传出沉雄低鸣，蓝白色光柱直贯洞顶。古老的契约重新建立：罗克西克之矮人、阿巴维尔之精灵、哈尔巴克之人类，三族之力再次回到熔炉之中。法达林镇的传奇，由你重新开启。', back:true },
          { text:'离开熔炉', back:true },
        ],
      },
      {
        when: () => true,
        paragraphs: [
          { type:'text', text:'你穿过最后一道符文之门，眼前豁然开朗——一座圆形大厅，中央矗立着传说中的法术熔炉，它的核心石悬浮在半空，被无数细密的蛛丝缠裹着。' },
          { type:'text', text:'蛛丝的尽头，一个披黑斗篷的卓尔精灵正缓缓转过身来。他的手中托着一颗发着幽紫光的法石，胸前的银色蛛形纹章映着熔炉的蓝光。' },
          { type:'npc', text:'"瑞索玛——你可以叫我黑蜘蛛。"他声音冷而平稳，像深井中的水，"你已经走得比我预料中更远。可惜，你无法再向前一步。"' },
          { type:'npc', text:'"罗克西克的钥匙……交给我，我可以让你走。这熔炉，不属于地表上任何愚蠢的小镇——它属于幽暗地域。"' },
        ],
        choices: [
          { text:'拒绝，与黑蜘蛛决战！', result:{ combat:'drow_mage', flags:['blackspider_dead'] }, msg:'瑞索玛冷笑一声，举起法石——黑色的蛛丝从地缝中迸射而出，最终的BOSS战开始！', goto:'black_spider_lair' },
          { text:'借熔炉之力反制（INT 15+）', when: gs => gs.stats.INT >= 15, result:{ combat:'drow_mage', flags:['blackspider_dead','forge_resonance'] }, msg:'你迅速将贡德伦的钥匙嵌入核心石的辅助槽——熔炉的法力开始与你共鸣，蓝白光环包裹住你的武器。瑞索玛瞳孔骤缩，"不可能！"——但已经太迟了。', goto:'black_spider_lair' },
          { text:'尝试以幽暗地域古语谈判（CHA 16+ 且 INT 14+）', when: gs => gs.stats.CHA >= 16 && gs.stats.INT >= 14, paragraphs:[
            { type:'npc', text:'你以一段古老的卓尔礼语开口，提及罗丝的契约与商队规则。瑞索玛眯起眼，露出一丝罕见的迟疑。' },
            { type:'npc', text:'"……地表人居然懂得这些。有趣。"他放下手中的法石，"那么，按古老规则，我让出这一座熔炉——但记住，地表之上的法师们如果觊觎幽暗，我会再来。"' },
            { type:'text', text:'黑蜘蛛披风一卷，化为黑雾消散在密道中。你毫发未伤地站在了法术熔炉前。' },
          ], result:{ flags:['blackspider_dead','blackspider_negotiated'], gold:80, fame:20 }, goto:'black_spider_lair' },
          { text:'假意交出钥匙，伺机偷袭（DEX 16+）', when: gs => gs.stats.DEX >= 16, result:{ combat:'drow_mage', flags:['blackspider_dead','blackspider_betrayed'] }, msg:'你伸手递出钥匙——就在瑞索玛伸手接过的一瞬间，你的另一只手已经将匕首抵到了他的咽喉。但卓尔精灵的反应远比你预想的快，他向后翻身咏唱起咒语！', goto:'black_spider_lair' },
        ],
      },
    ],
  },

};
