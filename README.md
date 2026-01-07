# 🚀 Mizuki 博客 - 使用指南

# 🚀 Mizuki 博客 - 使用指南

## 📊 仓库架构说明

你有两个仓库：

1. **源码仓库**: `mizuki-blog-source` 
   - 存放 Mizuki 源代码
   - 推送代码到这里

2. **Pages 仓库**: `dandingbobaishi.github.io`
   - 存放构建后的静态文件
   - 自动部署，无需手动操作

```
mizuki-blog-source → GitHub Actions → dandingbobaishi.github.io → 网站
```

---

## ⚡ 首次配置（重要！）

**必须先配置 PERSONAL_TOKEN 才能自动部署！**

详细步骤查看：[快速配置指南.md](./快速配置指南.md)

### 简要步骤

1. **创建 Token**: https://github.com/settings/tokens
   - 勾选 `repo` 和 `workflow` 权限

2. **配置 Secret**: https://github.com/dandingbobaishi/mizuki-blog-source/settings/secrets/actions
   - 名称：`PERSONAL_TOKEN`
   - 值：刚才创建的 token

3. **推送测试**:
   ```bash
   git push origin master
   ```

4. **访问**: https://dandingbobaishi.github.io/

---

## 📝 快速开始

### 1. 本地预览

```bash
cd mizuki
npm run dev
```

访问 http://localhost:4321

### 2. 创建文章

在 `src/content/posts/` 目录下创建 `.md` 文件：

```markdown
---
title: 文章标题
published: 2024-01-15
description: 文章描述
tags: [标签1, 标签2]
category: 分类
---

文章内容...
```

### 3. 部署到 GitHub Pages

#### 方法 1: 使用脚本（推荐）

```bash
# 双击运行
deploy-simple.bat
```

#### 方法 2: 手动推送

```bash
git add .
git commit -m "更新博客"
git push origin master
```

### 4. 配置 GitHub Pages

**首次部署需要配置**：

1. 打开你的 GitHub 仓库
2. 进入 **Settings** → **Pages**
3. 设置：
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `root`
4. 点击 **Save**

### 5. 访问网站

等待 2-5 分钟后访问：
- `https://你的用户名.github.io/你的仓库名/`

---

## 📁 项目结构

```
mizuki/
├── src/
│   ├── content/
│   │   └── posts/          # 📝 文章目录
│   ├── components/         # 🧩 组件
│   ├── styles/            # 🎨 样式
│   ├── layouts/           # 📐 布局
│   └── config.ts          # ⚙️ 配置文件
├── public/                # 📦 静态资源
│   └── assets/           # 图片等
├── .github/
│   └── workflows/
│       └── deploy-simple.yml  # 🚀 自动部署
├── deploy-simple.bat      # 一键部署脚本
└── package.json          # 项目配置
```

---

## ⚙️ 配置说明

### 网站基本信息

编辑 `src/config.ts`：

```typescript
export const siteConfig = {
  title: "你的博客名称",
  subtitle: "副标题",
  siteURL: "https://你的用户名.github.io/仓库名/",
  // ...
};
```

### 导航栏

```typescript
export const navBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    {
      name: "关于",
      url: "/about/",
      icon: "material-symbols:info",
    },
  ],
};
```

### 主题颜色

```typescript
themeColor: {
  hue: 230,  // 0-360，调整主题色相
  fixed: false,
},
```

---

## 🎨 样式定制

### 已包含的样式

1. **增强动画** (`enhanced-animations.css`)
   - 页面加载动画
   - 悬浮效果
   - 过渡动画

2. **玻璃拟态** (`glass-morphism.css`)
   - 半透明卡片
   - 模糊背景

3. **背景图案** (`background-patterns.css`)
   - 圆点、网格、波浪、几何图案

### 使用方法

在 HTML 中添加类名：

```html
<!-- 玻璃效果 -->
<div class="glass-card">内容</div>

<!-- 悬浮效果 -->
<div class="hover-lift">内容</div>

<!-- 背景图案 -->
<body class="bg-pattern-dots">
```

---

## 🔧 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 创建新文章
npm run new-post

# 代码格式化
npm run format
```

---

## 📊 部署流程

```
本地修改 → git push → GitHub Actions → 自动构建 → 部署到 gh-pages → 网站更新
```

### 自动部署说明

- **触发条件**: 推送到 `master` 分支
- **构建时间**: 约 2-5 分钟
- **部署位置**: `gh-pages` 分支
- **工作流文件**: `.github/workflows/deploy-simple.yml`

---

## ❓ 常见问题

### Q: 推送后网站没更新？

1. 检查 GitHub Actions 是否成功（仓库 → Actions 标签）
2. 等待 5-10 分钟
3. 清除浏览器缓存（Ctrl+Shift+R）

### Q: 构建失败？

1. 查看 Actions 日志中的错误信息
2. 本地测试：`npm run build`
3. 检查文章的 front-matter 格式

### Q: 图片不显示？

1. 图片放在 `public/assets/` 目录
2. 使用路径：`/assets/image.jpg`
3. 或使用完整 URL

### Q: 如何修改域名？

1. 在 `src/config.ts` 中修改 `siteURL`
2. 如果使用自定义域名，在 Pages 仓库添加 `CNAME` 文件

---

## 📚 详细文档

- **最终解决方案.md** - 部署问题解决方案
- **简易部署说明.md** - 快速部署指南
- **快速开始.md** - 完整使用指南

---

## 🎯 推荐工作流

1. **本地编辑** - 创建/修改文章
2. **本地预览** - `npm run dev` 查看效果
3. **提交推送** - 运行 `deploy-simple.bat`
4. **等待部署** - 2-5 分钟后查看网站

---

## 💡 提示

- 📝 专注于内容创作
- 🎨 保持简洁的设计
- 🔄 定期更新文章
- 📊 关注阅读体验

---

## 🔗 相关链接

- **你的博客**: https://dandingbobaishi.github.io/
- **GitHub**: https://github.com/dandingbobaishi
- **Astro 文档**: https://docs.astro.build/

---

## � 许可证a

本项目基于 Mizuki 主题，遵循相应的开源许可证。

---

祝你写作愉快！✨
