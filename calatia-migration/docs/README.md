# Calatia · 命途冒险

一款类似 Life in Adventure / 卡拉提亚的中文文字 RPG。玩家从一个起点出发，通过对话、判定、战斗和资源管理推进剧情，触发不同结局。

## 当前状态

这是从 v14 原型（`calatia-prototype-v14.html` 单文件 HTML）迁移到 Vite + React 项目的迁移包。

**已完成：**
- 🎲 角色创建（名字 + 27,648 种 SVG 捏脸 + 8 特性 + 6 属性 + 3 命题）
- 🗺️ 4 张地图、12+ 节点、地点解锁系统
- 💬 全屏对话流（46 个对话场景）
- ⚔️ D20 战斗系统 + 6 主动技能
- 📜 9 条任务链
- 🏆 4 种结局（死亡/荣耀/财富/屠龙）
- 📔 底部菜单（角色/背包/任务/日志）
- ⏰ 资源压力系统（每日 5 行动 / 治疗稀缺）
- 🌅 序章背景故事系统

## 技术栈

- **构建：** Vite 5
- **框架：** React 19
- **状态：** Zustand
- **样式：** 原生 CSS（按需加 Tailwind）
- **动画：** Framer Motion（按需）
- **打包：** Capacitor 6（iOS / Android）

## 目录结构

```
calatia-game/
├── src/
│   ├── App.jsx                  # 顶层路由
│   ├── main.jsx                 # 入口
│   ├── components/              # UI 组件
│   │   ├── FaceAvatar.jsx       ✅ 已迁移
│   │   ├── TopStatus.jsx        ✅ 已迁移
│   │   ├── TitleScreen.jsx      ⏳ 待迁移
│   │   ├── CreateScreen.jsx     ⏳ 待迁移
│   │   ├── IntroScreen.jsx      ⏳ 待迁移
│   │   ├── MapScreen.jsx        ⏳ 待迁移
│   │   ├── DialogScreen.jsx     ⏳ 待迁移
│   │   ├── CombatScreen.jsx     ⏳ 待迁移
│   │   ├── EndingScreen.jsx     ⏳ 待迁移
│   │   ├── BottomNav.jsx        ⏳ 待迁移
│   │   └── DrawerPanel.jsx      ⏳ 待迁移
│   ├── data/                    # 游戏数据（JSON 优先 / JS 必要时）
│   │   ├── quests.json          ✅
│   │   ├── enemies.json         ✅
│   │   ├── traits.json          ✅
│   │   ├── goals.json           ✅
│   │   ├── skills.json          ✅
│   │   ├── endings.json         ✅
│   │   ├── face-parts.json      ✅
│   │   ├── nodes.json           ✅
│   │   ├── maps.json            ✅
│   │   ├── item-info.json       ✅
│   │   └── dialogs.js           ✅ (JS 形式，因含 when/apply 函数)
│   ├── hooks/
│   │   └── useGameState.js      ✅ Zustand 状态管理
│   ├── utils/
│   │   └── helpers.js           ✅ calcRate / gainExp / pickVariant 等
│   └── styles/
│       └── global.css           ✅
├── public/
├── docs/
│   ├── README.md                ← 你正在读这个
│   ├── MIGRATION_GUIDE.md       手把手迁移指南
│   └── ARCHITECTURE.md          架构与设计
├── package.json
├── vite.config.js
├── capacitor.config.json
└── index.html
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 移动端打包（需要先 add platform）
pnpm cap:sync
pnpm cap:ios       # 打开 Xcode
pnpm cap:android   # 打开 Android Studio
```

## 数据文件说明

所有游戏内容数据集中在 `src/data/`：

| 文件 | 内容 |
|------|------|
| `quests.json` | 9 条任务链定义（步骤、描述）|
| `enemies.json` | 9 种敌人（HP、ATK、奖励）|
| `traits.json` | 8 种角色特性（含背景故事 intro）|
| `goals.json` | 3 个主线目标（含触发条件）|
| `skills.json` | 6 个主动技能（解锁等级、冷却）|
| `endings.json` | 4 种结局（含触发条件）|
| `face-parts.json` | SVG 捏脸的所有部件配置 |
| `nodes.json` | 所有地图节点（位置、解锁条件）|
| `maps.json` | 4 张地图的元数据 |
| `item-info.json` | 道具描述（用于大图展示）|
| `dialogs.js` | 46 个对话场景（含 when/apply 函数）|

## 开发原则

1. **数据驱动** - 加内容应改 JSON，不改代码
2. **小组件** - 每个 screen 组件 < 300 行
3. **纯函数** - 工具函数放 `utils/`，不依赖状态
4. **单源真理** - 游戏状态只在 `useGameState`，组件读取不维护副本
5. **类型安全（可选）** - 后续可加 TypeScript

## 接下来的工作

详见 `docs/MIGRATION_GUIDE.md`。简而言之：

1. 在 Claude Code 中初始化 Vite 项目
2. 把这个 migration 包的内容复制进去
3. `pnpm install`
4. 按 MIGRATION_GUIDE 的步骤把 v14 各个 screen 组件抽出来
5. `pnpm dev` 测试
