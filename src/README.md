# MANIFITION ROOM

> 沉浸式虚拟人生规划显化空间

一个基于 React Three Fiber 的 3D Web 应用，用于人生愿景规划与显化。

## ✨ 特性

- **四阶段沉浸式体验**
  - 🌌 阶段 A - 虚空唤醒：粒子系统与入场动画
  - 🖼️ 阶段 B - 愿景环廊：3D 画廊与卡片拖拽
  - ∞ 阶段 C - 莫比乌斯环：时空过渡通道
  - ◉ 阶段 D - 显化核心：具象化模块探索

- **Wabi-sabi 美学设计**
  - 侘寂色彩系统
  - 自然材质（混凝土、宣纸、风化木）
  - 体积光与粒子效果

- **高敏感友好（HSP Friendly）**
  - 低刺激模式（减慢动画，降低对比）
  - 支持 `prefers-reduced-motion`
  - 平滑的相机阻尼运动

- **交互特性**
  - 鼠标/触控拖拽
  - 键盘快捷键
  - 时间轴与历史管理
  - 撤销/重做功能

## 🎮 操作指南

### 鼠标控制
- **移动鼠标** - 控制视角
- **拖拽卡片** - 调整愿景卡片位置
- **点击按钮** - 切换阶段

### 键盘快捷键
- `1` - 切换到虚空唤醒阶段
- `2` - 切换到愿景环廊阶段
- `3` - 切换到莫比乌斯环阶段
- `4` - 切换到显化核心阶段
- `[` - 显示/隐藏左侧面板
- `Ctrl/Cmd + Z` - 撤销
- `Ctrl/Cmd + Y` 或 `Ctrl/Cmd + Shift + Z` - 重做

## 🛠️ 技术栈

- **React** - UI 框架
- **Three.js** - 3D 渲染引擎
- **React Three Fiber** - React 的 Three.js 渲染器
- **@react-three/drei** - 有用的 R3F 辅助组件
- **Zustand** - 轻量级状态管理
- **GSAP** - 动画库
- **Tailwind CSS v4** - 样式系统
- **Vite** - 构建工具

## 📦 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🏗️ 项目结构

```
/
├── components/
│   ├── stages/              # 四个主要阶段
│   │   ├── VoidScene.tsx
│   │   ├── VisionBoard.tsx
│   │   ├── MobiusTransition.tsx
│   │   └── ManifestationSpace.tsx
│   ├── ui/                  # UI 组件
│   │   ├── LeftPanel.tsx
│   │   ├── StageIndicator.tsx
│   │   ├── Instructions.tsx
│   │   ├── Timeline.tsx
│   │   └── KeyboardShortcuts.tsx
│   ├── effects/             # 视觉效果
│   │   └── Stars.tsx
│   ├── CameraRig.tsx        # 相机控制
│   ├── VisionCard.tsx       # 愿景卡片
│   └── Scene.tsx            # 主场景
├── store/
│   └── useAppStore.ts       # Zustand 状态管理
├── styles/
│   └── globals.css          # 全局样式
├── App.tsx                  # 主应用组件
└── src/main.tsx            # 入口文件
```

## 🎨 设计理念

### Wabi-sabi（侘寂）美学
追求朴素、自然、不完美的美感，使用低饱和度色彩和自然材质。

### 高敏感友好
所有动画、转场都考虑高敏感人群的舒适度，避免眩晕与焦虑。

### 动线即呼吸
采用"凝视-漂浮"而非"点击-跳转"的交互范式，所有移动都有阻尼效果。

## 🔧 配置说明

### 低刺激模式
在左侧面板中可以开启/关闭低刺激模式。开启后：
- 动画速度减慢
- 视觉对比度降低
- 粒子数量减少
- 后期效果强度降低

### 无障碍支持
- 支持系统 `prefers-reduced-motion` 设置
- 提供 ARIA 标签
- 键盘导航支持
- 屏幕阅读器友好

## 📝 待开发功能

- [ ] MediaPipe 手势识别
- [ ] WebXR / VR 支持
- [ ] 音频可视化
- [ ] 实际图片上传
- [ ] 云端存储与同步
- [ ] 导出功能（图片/视频）
- [ ] 社交分享

## 📄 许可证

MIT License

---

**MANIFITION ROOM** - 将愿景显化为现实 ✨