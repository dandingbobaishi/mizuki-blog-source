# Mizuki 博客 - 快速开始

## 🚀 一键启动

### Windows 用户

双击运行 `start-dev.bat` 文件即可启动开发服务器。

### 手动启动

```bash
# 1. 进入 mizuki 目录
cd mizuki

# 2. 安装依赖（首次运行）
npm install

# 3. 启动开发服务器
npm run dev
```

## 📍 访问地址

启动成功后，在浏览器中打开：
- http://localhost:4321

## 🎨 新增美化功能

### ✨ 视觉效果增强

1. **交互式粒子背景** - 鼠标移动时粒子会跟随互动
2. **玻璃拟态效果** - 现代化的半透明卡片设计
3. **增强动画** - 页面加载、悬浮、过渡动画
4. **滚动进度条** - 顶部显示阅读进度
5. **背景图案** - 多种可选背景图案（圆点、网格、波浪等）

### 🔧 功能增强

1. **高级搜索** 
   - 实时搜索结果
   - 搜索历史记录
   - 热门搜索建议
   - 键盘快捷键支持

2. **增强评论系统**
   - 嵌套回复
   - 表情支持
   - 点赞功能
   - 评论排序

3. **主题定制器**
   - 实时主题切换
   - 自定义主色调
   - 字体大小调整
   - 圆角大小调整
   - 动画速度控制
   - 设置导入/导出

4. **增强文章卡片**
   - 悬浮动画效果
   - 阅读时间显示
   - 浏览量和点赞数
   - 渐变边框效果

## 📁 项目结构

```
mizuki/
├── src/
│   ├── components/          # 组件目录
│   │   ├── InteractiveBackground.svelte    # 交互式背景
│   │   ├── ScrollProgress.svelte           # 滚动进度
│   │   ├── AdvancedSearch.svelte          # 高级搜索
│   │   ├── CommentSystem.svelte           # 评论系统
│   │   ├── ThemeCustomizer.svelte         # 主题定制器
│   │   └── EnhancedPostCard.astro         # 增强文章卡片
│   ├── styles/              # 样式目录
│   │   ├── enhanced-animations.css        # 增强动画
│   │   ├── glass-morphism.css            # 玻璃拟态
│   │   └── background-patterns.css       # 背景图案
│   ├── config.ts           # 配置文件
│   └── content/            # 内容目录
│       └── posts/          # 文章目录
├── public/                 # 静态资源
├── package.json           # 项目配置
└── astro.config.mjs       # Astro 配置
```

## 🎯 使用新功能

### 1. 在布局中添加组件

编辑 `src/layouts/Layout.astro`：

```astro
---
import InteractiveBackground from '@/components/InteractiveBackground.svelte';
import ScrollProgress from '@/components/ScrollProgress.svelte';
import ThemeCustomizer from '@/components/ThemeCustomizer.svelte';
---

<html>
  <body>
    <!-- 交互式背景 -->
    <InteractiveBackground client:load />
    
    <!-- 滚动进度条 -->
    <ScrollProgress client:load />
    
    <!-- 主题定制器 -->
    <ThemeCustomizer client:load />
    
    <!-- 你的内容 -->
    <slot />
  </body>
</html>
```

### 2. 配置功能开关

编辑 `src/config.ts`：

```typescript
export const siteConfig = {
  // ... 其他配置
  
  enhancements: {
    interactiveBackground: true,  // 启用交互式背景
    scrollProgress: true,         // 启用滚动进度
    enhancedAnimations: true,     // 启用增强动画
    glassEffect: true,            // 启用玻璃拟态
    themeCustomizer: true,        // 启用主题定制器
    advancedSearch: true,         // 启用高级搜索
    commentSystem: true,          // 启用评论系统
  }
};
```

### 3. 使用增强文章卡片

在文章列表页面中：

```astro
---
import EnhancedPostCard from '@/components/EnhancedPostCard.astro';
---

{posts.map(post => (
  <EnhancedPostCard entry={post} enhanced={true} />
))}
```

## 🎨 主题定制

### 方式 1: 使用主题定制器（推荐）

1. 启动网站后，点击右侧的调色板图标
2. 在弹出的面板中调整各项设置
3. 设置会自动保存到浏览器本地存储

### 方式 2: 修改配置文件

编辑 `src/config.ts`：

```typescript
export const siteConfig = {
  themeColor: {
    hue: 230,        // 主题色相 (0-360)
    fixed: false,    // 是否固定主题色
  },
  
  // 壁纸模式
  wallpaperMode: {
    defaultMode: "banner",  // banner | fullscreen | none
  },
  
  // 字体配置
  font: {
    asciiFont: {
      fontFamily: "ZenMaruGothic-Medium",
      enableCompress: true,
    },
    cjkFont: {
      fontFamily: "萝莉体 第二版",
      enableCompress: true,
    },
  },
};
```

## 📝 创建新文章

```bash
npm run new-post
```

然后在 `src/content/posts/` 目录下编辑新创建的 Markdown 文件。

## 🚀 构建和部署

### 构建生产版本

```bash
npm run build
```

构建后的文件在 `dist/` 目录。

### 预览构建结果

```bash
npm run preview
```

### 部署到 GitHub Pages

项目已配置 GitHub Actions，推送代码到 main 分支即可自动部署：

```bash
git add .
git commit -m "Update blog"
git push origin main
```

## 🔧 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
npm run new-post     # 创建新文章
npm run check        # 检查代码
npm run format       # 格式化代码
```

## 📚 文档链接

- [Astro 官方文档](https://docs.astro.build/)
- [Svelte 官方文档](https://svelte.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [启动指南详细版](./启动指南.md)

## 💡 提示

1. **性能优化**: 交互式背景在移动端会自动降低粒子数量
2. **主题切换**: 支持浅色/深色/自动三种模式
3. **响应式设计**: 所有新功能都已适配移动端
4. **浏览器兼容**: 建议使用 Chrome、Firefox、Safari 最新版本

## 🐛 问题排查

### 端口被占用

```bash
npm run dev -- --port 3000
```

### 依赖安装失败

```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install
```

### 构建失败

检查 Node.js 版本（需要 >= 18.0.0）：

```bash
node --version
```

## 🎉 开始使用

1. 运行 `start-dev.bat` 或 `npm run dev`
2. 在浏览器中打开 http://localhost:4321
3. 开始创作你的博客内容！

---

**当前博客地址**: https://dandingbobaishi.github.io/

祝你使用愉快！ 🎊
