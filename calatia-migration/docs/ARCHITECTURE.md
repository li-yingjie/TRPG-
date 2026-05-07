# 架构与设计

## 整体架构

```
┌─────────────────────────────────────────────────┐
│              App.jsx (路由 + 状态协调)           │
└─────────────┬───────────────┬───────────────────┘
              │               │
   ┌──────────▼──────┐   ┌────▼─────────┐
   │  Screens (UI)   │   │ Hooks (逻辑) │
   │                 │   │              │
   │ TitleScreen     │   │ useGameState │
   │ CreateScreen    │   │ useDialog    │
   │ MapScreen       │   │ useCombat    │
   │ DialogScreen    │   └────┬─────────┘
   │ CombatScreen    │        │
   │ EndingScreen    │        │
   └──────────┬──────┘        │
              │               │
              │  ┌────────────▼─────┐
              │  │ utils/helpers.js │
              │  │                  │
              │  │ calcRate         │
              │  │ gainExp          │
              │  │ pickVariant      │
              │  │ matchCheck       │
              │  │ applyTrait       │
              │  └────────┬─────────┘
              │           │
   ┌──────────▼───────────▼────────┐
   │        data/ (内容)           │
   │                               │
   │ quests.json   skills.json     │
   │ enemies.json  endings.json    │
   │ traits.json   nodes.json      │
   │ goals.json    maps.json       │
   │ face-parts.json item-info.json│
   │ dialogs.js (ES module)        │
   └───────────────────────────────┘
```

## 核心设计决策

### 1. 数据 vs 代码的边界

**数据（JSON）**：
- 静态、无逻辑的内容
- 不会因为运行时状态变化的东西
- 例：任务步骤、敌人数值、特性描述

**代码（JS module）**：
- 含有运行时判断或副作用的内容
- 例：`dialog.variants[i].when(gs)` 需要根据当前状态选择分支

**为什么 dialogs 是 JS 不是 JSON：**

每个 dialog 的 variant 都需要 `when: gs => boolean` 来判断是否激活。如果转 JSON 要做规则引擎（DSL），代价太高。保留 JS 形式让对话脚本能直接写：

```js
{
  when: gs => gs.activeQuests.q_smith === 'find_hammer'
            && gs.flags.includes('met_smith'),
  ...
}
```

这种灵活性 JSON 配规则引擎很难达到。

### 2. 状态管理：Zustand

**为什么不用 Redux：**
- Zustand 没有 boilerplate
- React 18+ 的 strict mode 友好
- 比 Context API 性能好（selective subscription）

**核心约定：**
- 所有游戏状态在一个 `gs` 对象里
- 所有"修改 gs"的逻辑封装在 store 的 actions 里
- 组件用 selector 读取，不直接改 gs

```js
// Bad
const { gs, setGs } = useGameState();
setGs({ ...gs, hp: gs.hp + 10 });

// Good
const applyEffect = useGameState(s => s.applyEffect);
applyEffect({ hp: 10 });
```

### 3. View 状态用 useState（不进 store）

像 `view`、`activeDialog`、`combat` 这种**只影响当前会话**的状态，放在 `App.jsx` 的本地 state 里，不进全局 store。

理由：
- 这些状态不需要序列化（重玩重置）
- 减少 store 大小，性能更好
- 减少跨组件耦合

### 4. 组件分层

```
Screen Component (页面级)
   ↓ uses
Domain Component (DialogBubble、SkillButton 等)
   ↓ uses
Primitive Component (Button、Bar、Card)
```

当前阶段 Domain 和 Primitive 还没拆出来，未来如果有 5+ screen 都用 button，建议提取到 `components/primitives/`。

### 5. CSS 策略

**当前：** 单一 `global.css` + 主题变量

**未来建议：**
- 公共 UI 类放 `styles/ui.css`
- 组件专属用 CSS Modules（`Component.module.css`）
- 不引入 Tailwind 除非真的需要（增加学习成本）

### 6. 移动端适配

游戏是为移动端设计的（参考 Life in Adventure），但现在用 web 技术：

- viewport 始终全屏（`100dvh` 适配 iOS 安全区）
- 触摸优先（按钮 min-height 38px+，符合 Apple HIG）
- 用 Capacitor 打包成 native（不是 Cordova）
- 没有 hover 状态（只用 `:active`）

## 数据流示例：玩家选了一个对话选项

```
用户点击 choice 按钮
   │
   ▼
DialogScreen.onChoose(choice)
   │
   ▼
useDialog.handleChoose(choice)
   │
   ├──> 检查 choice.requires
   ├──> 触发 stat roll（如有）
   │     │
   │     ▼
   │   计算 calcRate(stat, lck) → success/fail
   │
   ├──> 根据结果 apply choice.success / choice.fail
   │     │
   │     ▼
   │   useGameState.applyEffect({ gold: 10, hp: -5, ... })
   │     │
   │     ▼
   │   gs 更新 → React rerender
   │
   ├──> 更新 storyLog（追加段落）
   │
   └──> 更新 pendingChoices（下一组选项）
```

## 结局触发流程

```
gs 变化
   │
   ▼
App.jsx useEffect 监听
   │
   ▼
checkEndings(ENDINGS, gs)
   │
   ▼
对每个 ending：
  matchCheck(ending.check, gs)
   │
   ▼ (匹配上)
setActiveEnding + setView('ending')
   │
   ▼
EndingScreen 渲染
```

## 性能注意点

1. **dialogs.js 全量 import** —— 46 个 dialog 不大（约 30KB），整体导入没问题。10 倍量级时可以拆 chunk。

2. **FaceAvatar 重渲染** —— 用 `React.memo` 包一下，因为它是纯函数。

3. **storyLog 越来越长** —— 长对话场景下 storyLog 数组会膨胀。考虑虚拟列表或分段存储（每个 dialog 重置）。

4. **Zustand selector 精确订阅** —— `useGameState(s => s.gs.hp)` 只在 hp 变化时 rerender，避免全量 gs 订阅。

## 测试策略（未来）

| 类型 | 工具 | 覆盖 |
|------|------|------|
| 单元测试 | Vitest | utils/helpers.js 的纯函数 |
| 集成测试 | Vitest + Testing Library | 单个 Screen 组件 |
| 端到端 | Playwright | 完整一局游戏流程 |

优先级：先单元测试 helpers，再补 Screen 测试。

## 未来扩展点

### 多语言

把所有显示文本（dialog 段落、UI 标签）抽到 `i18n/zh.json`、`i18n/en.json`。当前所有数据都是中文写死。

### 存档系统

`gs` 完全可序列化（除了 startedAt 之类）。加 localStorage 保存：

```js
// 自动保存
useEffect(() => {
  if (gs) localStorage.setItem('save', JSON.stringify(gs));
}, [gs]);
```

### 内容编辑器

写一个简单的 React 工具，让非程序员能往 quests.json / dialogs.js 里加东西。目标是让剧本作家不用碰代码。

### AI 内容生成

dialogs 的"闲事件"段落可以用 LLM 实时生成，主线剧情人写。这是降低内容生产成本的关键。
