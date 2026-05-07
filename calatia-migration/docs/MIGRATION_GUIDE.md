# 迁移指南

把 `calatia-prototype-v14.html` 单文件 HTML 拆解成完整的 Vite + React 项目。

## 整体策略

不要一次性全部迁移。**按 screen 逐个搬**，每搬一个就跑一下 `pnpm dev` 验证能用。失败比成功更常见，渐进式迁移可以让你随时回滚。

## 准备工作

### 1. 在 Claude Code 中初始化项目

```bash
# 在你想要的位置创建项目目录
mkdir calatia-game && cd calatia-game

# 初始化 Vite + React
pnpm create vite@latest . --template react

# 解压本迁移包，把里面的 src/、docs/、根目录配置文件覆盖到当前目录
# (覆盖 package.json、vite.config.js、index.html、src/main.jsx 等)

# 安装依赖
pnpm install

# 试跑（会显示占位页）
pnpm dev
```

### 2. 把 v14 原型文件放在容易访问的位置

我建议放在项目根目录的 `_legacy/` 文件夹，加到 `.gitignore`：

```bash
mkdir _legacy
cp /path/to/calatia-prototype-v14.html _legacy/
echo "_legacy/" >> .gitignore
```

这样迁移过程中你随时能 `grep` 老代码找东西。

## 迁移顺序（推荐）

### 阶段 1：确保数据层正常 ✅（已完成）

数据 JSON 都已抽出。`useGameState` 和 `helpers.js` 也已写好。

**测试方式：** 在 `App.jsx` 里 `import quests from './data/quests.json'`，`console.log(quests)`，看 dev server 能否正常加载。

### 阶段 2：迁移 TitleScreen（最简单的开始）

这是最简单的组件，5 分钟搞定。当作热身。

```jsx
// src/components/TitleScreen.jsx
import React from 'react';

export function TitleScreen({ onStart }) {
  return (
    <div className="title-screen">
      <div className="title-logo">命途冒险</div>
      <div className="title-sub">CALATIA · 文字 RPG</div>
      <button className="title-btn" onClick={onStart}>开始新游戏</button>
    </div>
  );
}
```

CSS 从 v14 中找 `.title-screen`、`.title-logo`、`.title-sub`、`.title-btn` 这几个类，复制到 `src/styles/global.css` 或 `src/components/TitleScreen.module.css`。

在 `App.jsx` 里把占位换成：
```jsx
{view === 'title' && <TitleScreen onStart={() => setView('create')} />}
```

`pnpm dev` → 看到标题页 → ✅。

### 阶段 3：迁移 FaceAvatar 和相关 CSS

`FaceAvatar.jsx` **已经在迁移包里了**。但 v14 中 `.create-screen`、`.face-preview-area` 等捏脸 UI 的 CSS 还在 v14 里。把它们抽出到 `src/styles/create.css`，然后在 `main.jsx` 里 import。

### 阶段 4：迁移 CreateScreen

这是最复杂的组件之一（含 step 1 / step 2 流程）。直接从 v14 复制整个 `function CreateScreen` 出来，做以下替换：

```diff
- React.useState
+ useState  (file 顶部 import)

- TRAITS  (来自 window.GAMEDATA)
+ import TRAITS from '../data/traits.json'

- GOALS
+ import GOALS from '../data/goals.json'

- AVATARS  (已废弃，迁移版用 FaceAvatar)
+ (删除相关行)

- window.GAMEDATA.FACE_PARTS
+ import FACE_PARTS from '../data/face-parts.json'

- t.apply(ng)  (trait 的函数式 apply)
+ applyTrait(ng, t)  (来自 utils/helpers.js)

- makeInitState()
+ makeInitialState()  (来自 hooks/useGameState.js)
```

最重要的修改：trait 数据现在是 declarative（`effects` 字段），不再是函数。所以要用 `applyTrait` 替代 `t.apply(ng)`。

### 阶段 5：迁移 IntroScreen

简单组件。直接从 v14 复制，import 它需要的 GOALS / TRAITS / FaceAvatar。

### 阶段 6：迁移 MapScreen

这个组件比较大但逻辑不复杂。**关键点：**

```diff
- map.nodes  (从 window.GAMEDATA.MAPS[currentMap].nodes 来的)
+ NODES[currentMap]  (从 nodes.json 来)

- map.parent
+ MAPS[currentMap].parent  (从 maps.json 来)
```

`WorldTerrain` / `TownTerrain` 这些子组件也一并搬过来。

### 阶段 7：迁移 DialogScreen + 对话推进逻辑

这是工作量最大的部分。**分两步：**

#### 7a. 迁移 DialogScreen 组件本身（纯展示）

直接复制 v14 中 `function DialogScreen`。它只负责展示 storyLog 和 choices，不含状态逻辑。

#### 7b. 迁移对话推进逻辑（onChoose、applyChoice、pickVariant 等）

这些逻辑现在散在 v14 的 App 函数里。建议抽到 `src/hooks/useDialog.js`：

```js
// src/hooks/useDialog.js
import { useState } from 'react';
import { useGameState } from './useGameState.js';
import { DIALOGS } from '../data/dialogs.js';
import { pickVariant } from '../utils/helpers.js';

export function useDialog() {
  const { gs, applyEffect } = useGameState(s => ({ gs: s.gs, applyEffect: s.applyEffect }));
  const [activeDialog, setActiveDialog] = useState(null);
  const [storyLog, setStoryLog] = useState([]);
  const [pendingChoices, setPendingChoices] = useState([]);
  // ... 把 v14 中相关逻辑搬过来
  return { activeDialog, storyLog, pendingChoices, openDialog, onChoose, closeDialog };
}
```

**对话脚本中的 `when` 和 `apply` 函数现在直接保留**（在 dialogs.js 里），不需要转换。这是为什么我们没把 dialogs 转 JSON 的原因——保持灵活性。

### 阶段 8：迁移 CombatScreen

复制整个 `function CombatScreen` 和相关的战斗逻辑（`combatRoll`、`resolveCombatTurn`、`combatSkill`、`exitCombat`）。建议抽到 `src/hooks/useCombat.js`。

ENEMIES 改用 `import ENEMIES from '../data/enemies.json'`。

### 阶段 9：迁移 BottomNav + DrawerPanel

直接复制即可。注意 `CharacterPanel`、`InventoryPanel`、`QuestsPanel`、`LogPanel` 这些子组件可以放在同一个文件 `DrawerPanel.jsx`，或按需拆分。

### 阶段 10：迁移 EndingScreen

简单组件，直接复制。`ENDINGS.check` 现在是 declarative 的，已经用 `matchCheck` 工具处理。

## 关键转换规则

### 函数式 effects → declarative effects

**v14 的 trait：**
```js
{ id: 'noble', apply: gs => { gs.gold *= 3; gs.stats.CHA += 2; } }
```

**迁移后：**
```json
{ "id": "noble", "effects": { "goldMultiply": 3, "stats": { "CHA": 2 } } }
```

通过 `applyTrait(gs, trait)` 函数应用。

### 函数式 endings.check → declarative

**v14：**
```js
{ id: 'glory', check: gs => gs.fame >= 100 }
```

**迁移后：**
```json
{ "id": "glory", "check": { "fame": { "gte": 100 } } }
```

通过 `matchCheck(check, gs)` 评估。

### dialog 的 when / apply 保留为函数

```js
// dialogs.js (保留 ES module 形式)
{
  when: gs => gs.activeQuests?.q_old_soldier === 'find_amulet',
  paragraphs: [...],
  choices: [...]
}
```

这种灵活度太高，强转 JSON 不划算，保留 JS 形式。

## 验收清单

每个阶段完成后，pnpm dev 跑起来检查：

- [ ] 阶段 2：标题页能渲染，按钮能点
- [ ] 阶段 4：创建角色，捏脸、属性、特性、目标都能选
- [ ] 阶段 5：序章页能正常显示选择的特性叙事
- [ ] 阶段 6：地图能渲染，节点可见，未解锁的灰显
- [ ] 阶段 7：能进酒馆和老板对话
- [ ] 阶段 8：能触发战斗，技能可用
- [ ] 阶段 9：底部菜单 4 个 tab 都能开
- [ ] 阶段 10：触发结局画面正常

## 调试 tips

### Q: 数据 import 失败？
A: 检查 vite 是否启用了 JSON import（默认启用）。`vite.config.js` 不需要额外配置。

### Q: dialog 跑起来报 `gs.something` undefined？
A: 检查是不是初始 state 里少了某个字段。补到 `makeInitialState()` 里。

### Q: 某个组件不显示？
A: React DevTools 看一下 view state，可能 setView 没切换。

### Q: 性能问题？
A: 5800 行单文件本来就不适合性能优化。迁移完之后用 `React.memo` 包大组件、用 Zustand 的 selector 减少 rerender。

## 接下来可以做的

迁移完成后建议：

1. **加 TypeScript** —— 把 `data/*.json` 加上 `*.d.ts` 类型定义
2. **加路由** —— 用 react-router 替代 view state（虽然单页应用不一定需要）
3. **加测试** —— Vitest 覆盖关键工具函数（`gainExp`、`matchCheck` 等）
4. **加打包** —— `pnpm cap:sync` 然后 `cap:ios` / `cap:android`
5. **内容扩展** —— 直接改 JSON 加任务、加敌人、加 NPC
