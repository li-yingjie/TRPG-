# 场景配图 Prompt 集

本文档整理了游戏中所有需要配图的对话场景，参考已有的「内华冬城悬崖港」水彩风格，输出可直接用于 AI 出图的 Prompt。

## 风格基线（所有图片通用前缀）

> **Style baseline (prepend to every prompt):**
> Soft watercolor illustration, hand-painted on warm white textured paper, muted sepia-warm palette (umber, ochre, dusty rose, faded teal), gentle wash gradients, visible brush strokes, no harsh outlines, no rim light, painterly atmosphere, illustration plate from a tabletop RPG art book, slightly desaturated, plenty of negative white space around the subject so the edges fade naturally into paper, no UI / no text / no border / no signature, 3:2 landscape composition.

**输出参数建议**：1536×1024（或 3:2），PNG，背景**纯白**（`mix-blend-mode: multiply` 会把白色滤掉，所以**不要画方形画框**也不要深色底）。

**文件命名**：保存到 `public/scenes/{scene_id}.jpg`，对话里用 `{ type:'image', src:'/scenes/{scene_id}.jpg', alt:'…', caption:'…' }` 引用。

参考已有图：`public/scenes/neverwinter_harbor.jpg`（用于 `harbor_dock`、`tavern_enter`）。

---

## 一、法达林镇（Phandalin）

### 1. `phandalin_overview` — 法达林镇全景
**用于**：`tavern_enter` 进入小镇时的首次配图，或营地夜景前的过渡帧。
**Prompt**：
> A small frontier hamlet at the edge of a pine wood, viewed from a low hill at dusk. Wooden houses with shingled rooftops and stone chimneys, a single cobbled street curving through the centre, lantern light starting to glow in windows. Distant snowcapped mountain peaks soft on the horizon. Watercolor wash, faded sepia warmth, brush strokes visible, white paper background.

### 2. `stonehill_inn` — 石柱旅馆室内
**用于**：`tavern_enter` 替换当前误用的港口图。
**Prompt**：
> Interior of a cosy medieval roadside tavern. A large stone fireplace dominates the back wall, warm orange firelight bouncing off oak ceiling beams and pewter tankards. Long wooden tables with travellers in cloaks bent in low conversation, a round innkeeper polishing mugs behind the counter. Looking from the doorway perspective. Watercolor, warm umber and ochre palette, soft glow on faces, no hard shadows, white paper background.

### 3. `tymora_shrine` — 庇护神祠堂
**用于**：`church_enter`、`church_blessing`。
**Prompt**：
> A modest wooden chapel interior dedicated to a luck goddess. A small stone altar with three pale-blue candle flames, a silver seven-pointed-star symbol mounted on the wall behind. A young half-elf priestess in pale robes kneeling in profile. Stained glass casting soft sunlit colors on the floorboards. Watercolor, dusty rose and pale gold palette, gentle, reverent atmosphere, white paper background.

### 4. `town_hall_bulletin` — 镇民大会堂公告栏
**用于**：`bulletin_board`。
**Prompt**：
> A weathered wooden bulletin board on a town hall porch, layered with hand-written parchment notices, a few curling at the corners, sealed with red wax or pinned with iron nails. A single beam of afternoon sun cutting across it, dust motes floating. Watercolor, sepia and parchment cream palette, soft brushwork, flat composition centered on the board, white paper background.

### 5. `iron_lion_smithy` — 铁狮商行
**用于**：`smith_enter`。
**Prompt**：
> Interior of a small frontier armory shop. Wooden racks line the walls hung with mail shirts, longswords, round shields painted with a black lion. A weathered female blacksmith in a leather apron stands behind a counter, arms crossed, lit by the orange glow of a side forge. Watercolor, charcoal grey and ember orange palette, soft smoke haze, white paper background.

### 6. `barthen_provisions` — 巴泰恩商行
**用于**：`merchant_enter`。
**Prompt**：
> A cluttered general store interior. Wooden barrels of dried beans and grain near the entrance, shelves stacked with glass jars, dried herbs hanging from ceiling beams, an elderly bespectacled shopkeeper smiling kindly behind the counter. Warm afternoon light through a small window. Watercolor, ochre and moss green palette, gentle clutter, white paper background.

### 7. `daran_orchard` — 达兰的苹果园
**用于**：新增 `daran_orchard` 对话。
**Prompt**：
> A modest stone cottage at the edge of a small apple orchard in late autumn, ripe red apples weighing down low branches. An elderly halfling with white hair, sitting on a wooden rocking chair on the porch, polishing a long sword across his lap. Soft sunset light filtering through the trees. Watercolor, faded crimson and harvest gold palette, peaceful nostalgic mood, white paper background.

### 8. `tresendar_manor` — 特雷森达庄园外景
**用于**：新增 `redbrand_hideout` 对话第一变体。
**Prompt**：
> An abandoned grand manor at the edge of a frontier town, overgrown with dead vines, wrought-iron gates rusted shut, broken windows, two cloaked thugs in red mantles loitering at the entrance. Overcast sky, dead grass, an ominous stillness. Watercolor, muted slate and rust-red palette, slight ink wash for shadow, white paper background.

### 9. `glasstaff_chamber` — 玻璃杖的法术大厅
**用于**：`redbrand_hideout` 决战变体（infiltrate）。
**Prompt**：
> An underground vaulted stone chamber lit by glowing pale-blue arcane runes embedded in the walls. A thin man in a silver-threaded robe holding a translucent glass and silver staff, three red-cloaked thugs flanking him with curved blades drawn. Cold dramatic lighting from below, parchment and alchemy bottles on a nearby table. Watercolor with faint magic glow accents, bruised purple and pale cyan palette, white paper background.

---

## 二、周边荒野（Wilderness）

### 10. `triboar_trail` — 崔鲍尔小道
**用于**：`wild_herb_zone`。
**Prompt**：
> A quiet country trail winding through autumn meadows, white birch trees on either side, silver-leafed herbs glinting in the roadside grass, a faint imprint of an overturned merchant cart in the distance, splintered wooden wheels visible. Soft morning mist near the ground. Watercolor, faded gold and silver-green palette, painterly, white paper background.

### 11. `neverwinter_woods` — 永冬林
**用于**：`forest_explore`。
**Prompt**：
> A dense ancient pine and oak forest, gnarled roots crawling over moss-covered ground, shafts of pale green light filtering through a thick canopy, a half-buried Netherese ruin column wrapped in vines barely visible in the distance. Quiet, almost reverent atmosphere. Watercolor, deep emerald and slate palette with cream highlights, painterly, white paper background.

### 12. `agatha_ruins` — 阿加莎的废墟
**用于**：`shrine_meet`。
**Prompt**：
> A circle of broken stone columns and a collapsed altar deep in a misty forest clearing, vines crawling over the stones, a translucent ghostly elven woman in tattered robes hovering above the centre, her face beautiful but sorrowful, faintly luminous. Cold dawn light, breath of fog. Watercolor, pale teal and bone-white palette, ghostly soft edges, white paper background.

### 13. `thundertree_dragon` — 荆棘堡废墟（绿龙）
**用于**：`dragon_lair`。
**Prompt**：
> The ruins of a small village reduced to broken stone shells, swallowed by green moss and toxic mist. A stone tower in the centre still standing, a young green dragon perched on its top, scales mossy emerald, glowing yellow eyes peering from the shadow. Sickly green vapor curling around the tower base. Watercolor, poisonous green and cold grey palette, painterly menace, white paper background.

### 14. `sword_coast_cliffs` — 剑湾海岸悬崖
**用于**：`cliffs_meet`。
**Prompt**：
> Towering white chalk cliffs along a windswept coastline, dark green sea below crashing into jagged rocks, broken pieces of a shipwreck washed ashore, a line of distant figures in red cloaks walking along a thin cliffside path. Strong sea wind, salty mist. Watercolor, sea-foam green and pale chalk-white palette, painterly horizon, white paper background.

### 15. `abandoned_lighthouse` — 废弃瞭望塔
**用于**：`lighthouse_meet`。
**Prompt**：
> A crumbling stone watchtower on a windy coastal headland at dusk, half its outer wall fallen away, faint orange firelight leaking from a half-open iron door. Salt-bleached driftwood scattered around the base. Watercolor, slate grey and ember orange palette, lonely melancholic mood, white paper background.

### 16. `owlbear_well` — 猫头鹰井废塔
**用于**：`wizard_tower_door`。
**Prompt**：
> An ancient half-collapsed stone watchtower covered in moss, surrounded by recently dug earth mounds marked with small wooden stakes. A black-and-red robed Thayan necromancer standing nearby, two skeletal figures in tattered armor patrolling slowly with blue ghost-light in their eye sockets. Overcast grey sky. Watercolor, ash grey and crimson palette, faint blue glow, white paper background.

### 17. `campfire_camp` — 营地夜景
**用于**：`home_enter`。
**Prompt**：
> A small woodland campsite at night, ringed by tall oaks. A warm orange campfire at the centre, a bedroll and pack laid neatly beside it, distant town lights visible through the trees, a crescent Selûne moon above. Watercolor, deep indigo and ember orange palette, gentle starlight, white paper background.

---

## 三、内华冬城（Neverwinter）

### 18. `neverwinter_harbor` — 内华冬城码头 ✅ **已有**
现有 `public/scenes/neverwinter_harbor.jpg`，作为风格基准。

### 19. `neverwinter_market` — 内华冬城市集
**用于**：`harbor_fishmonger`。
**Prompt**：
> A bustling medieval port-city market street, stone buildings with timber upper floors leaning over a cobbled lane, stalls selling spices, fish, leather goods, a discreet shop with a black serpent emblem at the far end of the street, hooded figures slipping inside. Late afternoon light, golden haze. Watercolor, ochre and brick-red palette, busy but soft, white paper background.

### 20. `travelers_rest_inn` — 旅人之所内厅
**用于**：`harbor_inn`。
**Prompt**：
> A refined medieval inn lobby with stained glass windows depicting sailing ships, polished oak tables, a thick patterned rug, a hooded figure in a corner with a small silver harp brooch on his collar barely visible. Warm amber lamplight. Watercolor, deep wine red and brass-gold palette, dignified, white paper background.

### 21. `zhentarim_warehouse` — 真塔里姆据点
**用于**：`harbor_cult_door`。
**Prompt**：
> A narrow stone-paved alley behind dockside warehouses, a single side door marked with a faintly engraved black serpent rune at eye height. Wet cobblestones, a single oil lamp flickering, a thin sliver of moonlight cutting between rooftops. Watercolor, midnight blue and tarnished silver palette, noir watercolor mood, white paper background.

---

## 四、主线副本（Dungeons）

### 22. `cragmaw_hideout_entrance` — 克拉格茅地窟入口
**用于**：`crypt_entrance`。
**Prompt**：
> A dark cave mouth half-hidden behind hanging ivy on a forested hillside, scattered animal bones at the entrance, a crude wooden trap visible to one side, faint goblin chatter implied by glints of yellow eyes in the shadow. Dappled forest light. Watercolor, dirty olive green and bone-cream palette, threatening but painterly, white paper background.

### 23. `cragmaw_inner_hall` — 地窟主厅
**用于**：`crypt_inner`。
**Prompt**：
> A wide cavern lit by a smoky central fire, a crude tribal camp scattered with furs and bones, a wooden cell to one side holding the silhouette of a captive man, a massive bugbear chieftain rising from the shadows wielding a huge war-hammer, yellow eyes glaring. Watercolor, smoky umber and ash grey palette with ember orange firelight accents, white paper background.

### 24. `cragmaw_castle_exterior` — 克拉格茅城堡外景
**用于**：新增 `cragmaw_castle` 第一变体。
**Prompt**：
> An ancient ruined hillside fortress under a darkening evening sky, half-collapsed outer walls and a leaning watchtower, a single torch burning at a side breach, a cold mountain wind blowing dead leaves across the courtyard, dense conifers behind. Watercolor, cold slate blue and bone-grey palette, painterly desolation, white paper background.

### 25. `cragmaw_throne_room` — 哥布林国王葛劳尔的厅堂
**用于**：`cragmaw_castle` 潜入变体。
**Prompt**：
> A ruined castle great hall, a goblin king sprawled drunkenly on a crude wooden throne with a ragged red banner behind him, a tall slim drow elf in a black cloak with a silver spider emblem standing beside him in profile, half-hidden by shadow. Torchlight flickering. Watercolor, deep red and shadow-violet palette, ominous diplomatic tension, white paper background.

### 26. `wave_echo_entrance` — 回响洞穴入口
**用于**：`mine_entrance`。
**Prompt**：
> A massive boulder rolled aside revealing a dark cave mouth in a hillside, faint blue arcane runes glowing on the surrounding stones, a cool draft visibly carrying mist out of the entrance. Twilight forest around. Watercolor, deep indigo and pale arcane cyan accents, painterly mystery, white paper background.

### 27. `wave_echo_depths` — 回响洞穴深处回廊
**用于**：新增 `wave_echo_depths` 对话。
**Prompt**：
> A long subterranean corridor of carved stone with worn polished steps, ancient rune-stones half-embedded in the walls glowing faintly, a thick web of giant spider silk ahead forming a tangled grid trap, a small iron cage with a captive dwarf gripping the bars, two giant spiders crouched nearby. Watercolor, pale stone grey and venom-violet palette, dim torchlight glow, white paper background.

### 28. `spellforge_chamber` — 法术熔炉大厅
**用于**：`black_spider_lair`。
**Prompt**：
> A vast circular underground chamber, in the centre a massive ancient forge with a floating glowing core stone wrapped in dark spider silk, glowing arcane veins running through the floor. A drow mage in a black cloak with a silver spider emblem stands before it holding a violet-glowing crystal. The whole chamber lit in cold blue and lilac magic. Watercolor, deep blue-violet and pale arcane white palette, climactic painterly grandeur, white paper background.

### 29. `spellforge_activated` — 熔炉激活的胜利时刻
**用于**：`black_spider_lair` 胜利变体（结局图）。
**Prompt**：
> The same circular forge chamber, now bathed in a vertical column of soft blue-white light rising from the core stone all the way to the ceiling, the spider webs burned away, ancient runes pulsing in harmony, the silhouette of a lone adventurer standing reverently before the forge. Calm, sacred atmosphere. Watercolor, soft cyan-white and warm gold palette, victorious painterly stillness, white paper background.

---

## 五、过场/章节标题图（可选）

这些可以作为章节标题（`{ type:'chapter', icon:'…', title:'…' }`）之上的横幅图，3:1 横构图。

### 30. `chapter_phandalin` — 第一章：法达林镇之忧
> A panoramic frontier hamlet at first light, lone traveler silhouette walking down a cobbled path toward the town gate, mist drifting between cottages. Watercolor, dawn pink and cream palette, 3:1 banner composition, white paper background.

### 31. `chapter_cragmaw` — 第二章：克拉格茅之围
> A panoramic ruined hillside fortress silhouetted against a stormy evening sky, lone traveler approaching a broken side wall, distant lightning. Watercolor, slate blue and ember palette, 3:1 banner composition, white paper background.

### 32. `chapter_neverwinter` — 第三章：内华冬城的暗影
> A panoramic cliffside harbor city seen at dusk from the sea, ships docked at long stone piers, lighthouse beam beginning to sweep, gulls overhead. Watercolor, dusty rose and harbor teal palette, 3:1 banner composition, white paper background. *(可与已有 `neverwinter_harbor.jpg` 协调)*

### 33. `chapter_wave_echo` — 第四章：回响洞穴
> A panoramic dark cave entrance with faint arcane blue runes glowing along the surrounding rocks, lone traveler with torch in hand standing at the threshold. Watercolor, deep indigo and arcane cyan palette, 3:1 banner composition, white paper background.

---

---

## 六、角色创建 · 捏脸素材

### 6.1 方案选型 — **强烈建议：单张精灵图集（sprite atlas）**

| 方案 | 优点 | 缺点 |
|---|---|---|
| **A. 单张图集** ✅ | 与 BG3 图标走同一套 CSS background-position；HTTP 一次拉完；后期换素材只重画一格 | 出图时 AI 无法保证网格整齐，需要分格生成后由人工或脚本拼接 |
| B. 多张独立 PNG | 单张容易出，AI 风格自然 | 21 张文件、需要打包；CSS 写起来散乱 |
| C. 整张全套预渲染 | 加载最快 | 3×8×6×4=576 种组合，体积爆炸，不可取 |

**结论**：用 A 方案。**肤色和发色不进图集**——当前 SVG 用纯色填充，未来换图集后用 CSS `filter` 或 canvas tint 在前端着色即可，无需预生成 48 倍图。

### 6.2 图集布局

参考 `Icons_Items.webp` 的网格规格，建议如下：

```
单元格：256 × 256 px（透明背景 PNG / WebP）
图集尺寸：2048 × 1024 px（8 列 × 4 行）
```

| 行 | 类别 | 列 0 | 列 1 | 列 2 | 列 3 | 列 4 | 列 5 | 列 6 | 列 7 |
|---|---|---|---|---|---|---|---|---|---|
| 0 | 脸型 | round | long | square | — | — | — | — | — |
| 1 | 发型 | short | long | bald | curly | topknot | mohawk | sidecut | ponytail |
| 2 | 配件 | none | eyepatch | glasses | bandana | hood | helmet | — | — |
| 3 | 表情 | calm | smile | fierce | tired | — | — | — | — |

文件保存为 `public/face/face_atlas.webp`。前端用 `background-position: -(col*256)px -(row*256)px`，与 `DdsIcon.jsx` 完全一致的写法。

### 6.3 出图工作流（实操建议）

AI 出图工具（Midjourney / SD / DALL-E）**几乎无法**一次性生成对齐整齐的网格图集，**强烈推荐两步走**：

1. **先出一张「角色设定参考图」（model sheet）** — 把所有选项画在一张图里，用作艺术指导；
2. **再按类别批量出小图**（每张单元格一张），最后用 Figma / Photoshop / Python（Pillow）拼成图集。

### 6.4 风格基线（所有素材统一前缀）

> Hand-painted watercolor character portrait, soft warm sepia palette consistent with the harbor scene art, painterly brush strokes, no harsh outlines, gentle wash gradients, **transparent background**, head-and-shoulders only, facing forward 3/4 view, centered in frame, no shadow, no border, no text. Style of a tabletop RPG character sheet illustration.

> **重要**：素材图必须**透明背景**（PNG），不是白底——因为这些是要叠加合成的（脸 + 发 + 表情 + 配件），白底会互相遮挡。这点和场景图（白底 + multiply）不同。

### 6.5 总览参考图（model sheet）

#### `model_sheet_overview` — 角色设定总览
> A single composite "character design model sheet" plate, watercolor style. A grid layout showing: top row — three head shapes (round-faced, long-faced, square-jawed) in neutral expression with pale skin and short brown hair; second row — eight hairstyle variations on the same neutral face (short cropped, long flowing, bald, curly, topknot bun, mohawk, side-shaved undercut, ponytail); third row — six accessory variations (no accessory, black eyepatch, round wire glasses, red bandana, dark hood, knight helmet); bottom row — four facial expressions (calm, gentle smile, fierce scowl, tired sleepy). Hand-painted warm sepia watercolor, label each cell with a small handwritten ink caption beneath, white aged-paper background, the whole composition reads like a page from a D&D player's handbook. 3:2 landscape.

> 用途：**只用于艺术指导，不直接进游戏**。让美术或 AI 沿用这张的笔触和色调出后续的小图。

### 6.6 单元格 Prompt（按行分组）

> 全部使用 §6.4 的风格基线作为前缀；每张图都需要**透明 PNG 背景**和**256×256**正方形构图。

#### 第 0 行 · 脸型（露肤色为浅色基底，发型与表情留空白以便后期叠加）

| 文件 | Prompt |
|---|---|
| `face_round.png` | A round-faced young adult human head and bare shoulders, gentle cheeks, pale neutral skin, eyes closed and mouth neutral (placeholder for later composition), bald head (no hair drawn), no clothing details, watercolor portrait, transparent background. |
| `face_long.png` | A long oval-faced young adult head and bare shoulders, narrow cheekbones, pale neutral skin, eyes closed mouth neutral, bald, no clothing, watercolor portrait, transparent background. |
| `face_square.png` | A strong square-jawed young adult head and bare shoulders, broad chin, pale neutral skin, eyes closed mouth neutral, bald, no clothing, watercolor portrait, transparent background. |

> **Tip**：脸型图把眼睛/嘴/眉留白，由表情层叠加；这样脸型和表情可自由组合。

#### 第 1 行 · 发型（只画头发，下方头颅轮廓淡淡示意，方便对位）

| 文件 | Prompt |
|---|---|
| `hair_short.png` | Short cropped brown hair on a faintly outlined head silhouette, watercolor brush strokes, transparent background, top-down centered, no face features, just the hair silhouette. |
| `hair_long.png` | Long flowing brown hair past the shoulders, side-parted, watercolor brush strokes, transparent background, hair only, no face. |
| `hair_bald.png` | Empty transparent 256×256 frame (bald option — render nothing, used as placeholder for engine). |
| `hair_curly.png` | A bouncy crown of tight brown curls on a faintly outlined head silhouette, watercolor, transparent background, hair only. |
| `hair_topknot.png` | Brown hair tied into a neat topknot bun on top of the head with a wrapped base, watercolor, transparent background, hair only. |
| `hair_mohawk.png` | A tall narrow brown mohawk hairstyle, sides shaved clean, watercolor, transparent background, hair only. |
| `hair_sidecut.png` | An asymmetric brown undercut: long swept hair on one side, shaved short on the other, watercolor, transparent background, hair only. |
| `hair_ponytail.png` | Brown hair pulled back into a long ponytail trailing down the right side of the head, watercolor, transparent background, hair only. |

> **着色策略**：所有发型只画**棕色基底**，运行时用 CSS `filter: hue-rotate()` 或 canvas tint 着色为 8 种发色。

#### 第 2 行 · 配件

| 文件 | Prompt |
|---|---|
| `acc_none.png` | Empty transparent 256×256 frame (no accessory). |
| `acc_eyepatch.png` | A black leather eyepatch covering the left eye, with a thin leather strap going around the head, watercolor, transparent background, accessory only. |
| `acc_glasses.png` | A pair of small round wire-rim spectacles with brass frames, watercolor, transparent background, accessory only, sized to fit a 256×256 face. |
| `acc_bandana.png` | A dark red bandana tied around the forehead with a knot at the side and trailing ends, watercolor, transparent background, accessory only. |
| `acc_hood.png` | A dark brown weathered traveler's hood drawn up over the head, casting a soft shadow on the face, watercolor, transparent background, hood only. |
| `acc_helmet.png` | An iron knight helmet with a vertical nasal guard, slightly battered, watercolor, transparent background, helmet only. |

#### 第 3 行 · 表情（只画眉/眼/嘴，置于脸部对位区）

| 文件 | Prompt |
|---|---|
| `expr_calm.png` | A neutral calm expression: gently arched eyebrows, open relaxed eyes with small dark pupils, a flat closed mouth. Watercolor ink-line strokes only on transparent background, sized to overlay a face at the eye/mouth zone. |
| `expr_smile.png` | A warm gentle smile expression: softly raised eyebrows, slightly squinted eyes, a curved upturned mouth. Watercolor ink-line strokes only on transparent background. |
| `expr_fierce.png` | A fierce scowl expression: sharply angled-down eyebrows, narrowed angry eyes (drawn as slashes), a tight downturned mouth showing slight teeth. Watercolor ink-line strokes only on transparent background. |
| `expr_tired.png` | A tired sleepy expression: drooping eyebrows, half-closed eyes drawn as gentle arcs, a small flat mouth. Watercolor ink-line strokes only on transparent background. |

### 6.7 着色（不进图集，运行时处理）

肤色 6 色 + 发色 8 色 = **14 个色值**（已存在于 `FACE_PARTS`），都用 CSS 滤镜或 canvas 实时上色：

```js
// 伪代码示意
const skinTint = FACE_PARTS.skinTone.options.find(o=>o.id===face.skinTone).color;
const hairTint = FACE_PARTS.hairColor.options.find(o=>o.id===face.hairColor).color;

// canvas 路线
ctx.globalCompositeOperation = 'multiply';
ctx.fillStyle = skinTint;
ctx.fillRect(0,0,256,256);

// 或 CSS hue-rotate 路线
.face-hair { filter: hue-rotate(120deg) saturate(0.8); }
```

### 6.8 接入步骤

1. 出 21 张透明 PNG → 用脚本（Pillow / ImageMagick）拼成 `face_atlas.webp` 到 `public/face/`。
2. 复用 `DdsIcon.jsx` 的写法做一个 `FacePart.jsx`，按 `(row, col)` 取格子。
3. 改写 `FaceAvatar.jsx`：把 SVG 路径替换为 4 层 `FacePart` 叠加（face → hair → expression → accessory），叠加顺序与现有 SVG 一致（hood 最底，helmet 覆盖头发）。
4. 着色用 canvas tint 或 CSS filter，皮肤层和头发层各调一次。

### 6.9 拼图集脚本（参考）

```python
# scripts/build_face_atlas.py
from PIL import Image
import os

CELL = 256
COLS, ROWS = 8, 4
LAYOUT = {
  (0,0): 'face_round.png', (0,1): 'face_long.png', (0,2): 'face_square.png',
  (1,0): 'hair_short.png', (1,1): 'hair_long.png', (1,2): 'hair_bald.png',
  (1,3): 'hair_curly.png', (1,4): 'hair_topknot.png', (1,5): 'hair_mohawk.png',
  (1,6): 'hair_sidecut.png', (1,7): 'hair_ponytail.png',
  (2,0): 'acc_none.png', (2,1): 'acc_eyepatch.png', (2,2): 'acc_glasses.png',
  (2,3): 'acc_bandana.png', (2,4): 'acc_hood.png', (2,5): 'acc_helmet.png',
  (3,0): 'expr_calm.png', (3,1): 'expr_smile.png',
  (3,2): 'expr_fierce.png', (3,3): 'expr_tired.png',
}

atlas = Image.new('RGBA', (COLS*CELL, ROWS*CELL), (0,0,0,0))
src = 'face_parts'  # folder with the 21 PNGs
for (r,c), fn in LAYOUT.items():
    p = os.path.join(src, fn)
    if os.path.exists(p):
        img = Image.open(p).convert('RGBA').resize((CELL, CELL))
        atlas.paste(img, (c*CELL, r*CELL), img)
atlas.save('public/face/face_atlas.webp', 'WEBP', quality=92)
print('atlas built.')
```

---

## 七、出图后的接入步骤

1. 把图保存为 `public/scenes/{scene_id}.jpg`（建议 ≤ 300KB，1536×1024）。
2. 在对应对话的 `paragraphs` 数组里插入一条：
   ```js
   { type:'image', src:'/scenes/{scene_id}.jpg', alt:'场景名', caption:'地名 · 副标题' }
   ```
3. 章节标题图请配合 `{ type:'chapter', icon:'…', title:'…' }` 一起使用，置于章节切换处。
4. 已有的 CSS（`mix-blend-mode: multiply` + `sepia(12%) saturate(0.88)`）会自动统一所有图的色调，所以**Prompt 里的暖偏色调不必过分追求**——白底 + 柔和水彩即可。
