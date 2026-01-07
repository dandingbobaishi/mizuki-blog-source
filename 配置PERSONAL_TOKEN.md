# 🔑 配置 PERSONAL_TOKEN 指南

## 📋 仓库架构说明

你有两个仓库：
- **源码仓库**: `mizuki-blog-source` - 存放 Mizuki 源代码
- **Pages 仓库**: `dandingbobaishi.github.io` - 存放构建后的静态文件

工作流需要从源码仓库部署到 Pages 仓库，所以需要配置 Personal Access Token。

---

## 🔐 步骤 1: 创建 Personal Access Token

### 1. 打开 GitHub 设置

访问：https://github.com/settings/tokens

或者：
1. 点击右上角头像
2. Settings
3. 左侧菜单最下方：Developer settings
4. Personal access tokens → Tokens (classic)

### 2. 生成新 Token

1. 点击 **Generate new token** → **Generate new token (classic)**

2. 填写信息：
   - **Note**: `Mizuki Blog Deploy`（备注名称）
   - **Expiration**: `No expiration`（永不过期）或选择一个时间
   
3. 勾选权限（Scopes）：
   - ✅ **repo** (完整的仓库访问权限)
     - ✅ repo:status
     - ✅ repo_deployment
     - ✅ public_repo
     - ✅ repo:invite
     - ✅ security_events
   - ✅ **workflow** (更新 GitHub Actions 工作流)

4. 点击页面底部的 **Generate token**

### 3. 复制 Token

⚠️ **重要**：Token 只会显示一次！

- 复制显示的 token（类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）
- 保存到安全的地方（或直接进行下一步）

---

## 🔧 步骤 2: 配置到源码仓库

### 1. 打开源码仓库设置

访问：https://github.com/dandingbobaishi/mizuki-blog-source/settings/secrets/actions

或者：
1. 打开 `mizuki-blog-source` 仓库
2. Settings
3. 左侧菜单：Secrets and variables → Actions

### 2. 添加 Secret

1. 点击 **New repository secret**

2. 填写：
   - **Name**: `PERSONAL_TOKEN`（必须是这个名字！）
   - **Secret**: 粘贴刚才复制的 token

3. 点击 **Add secret**

---

## ✅ 步骤 3: 验证配置

### 检查清单

- [ ] Personal Access Token 已创建
- [ ] Token 权限包含 `repo` 和 `workflow`
- [ ] Secret 名称是 `PERSONAL_TOKEN`
- [ ] Secret 已添加到 `mizuki-blog-source` 仓库

---

## 🚀 步骤 4: 测试部署

### 1. 推送代码

```bash
cd mizuki
git add .
git commit -m "Configure PERSONAL_TOKEN"
git push origin master
```

### 2. 查看 Actions

1. 打开 https://github.com/dandingbobaishi/mizuki-blog-source/actions
2. 应该看到 "Deploy to GitHub Pages" 工作流正在运行
3. 等待完成（约 2-5 分钟）

### 3. 检查 Pages 仓库

1. 打开 https://github.com/dandingbobaishi/dandingbobaishi.github.io
2. 应该看到新的提交："Deploy from mizuki-blog-source"
3. 文件应该是构建后的静态文件

### 4. 访问网站

访问：https://dandingbobaishi.github.io/

应该能看到你的博客了！

---

## 🎯 完整流程图

```
本地修改
   ↓
git push 到 mizuki-blog-source
   ↓
GitHub Actions 触发
   ↓
安装依赖 → 构建项目
   ↓
使用 PERSONAL_TOKEN
   ↓
推送到 dandingbobaishi.github.io
   ↓
网站自动更新
```

---

## ❓ 常见问题

### Q: Token 创建后在哪里查看？

A: Token 只显示一次！如果忘记了，需要重新生成。

### Q: 提示 "Resource not accessible by integration"？

A: 
1. 检查 Token 权限是否包含 `repo`
2. 检查 Secret 名称是否是 `PERSONAL_TOKEN`
3. 重新生成 Token 并配置

### Q: 提示 "Permission denied"？

A:
1. 确认 Token 有 `repo` 权限
2. 确认 Token 没有过期
3. 重新生成并配置

### Q: Actions 成功但网站没更新？

A:
1. 检查 `dandingbobaishi.github.io` 仓库是否有新提交
2. 等待 5-10 分钟
3. 清除浏览器缓存（Ctrl+Shift+R）

### Q: Token 会过期吗？

A: 
- 如果选择了 "No expiration"，不会过期
- 如果选择了时间，到期后需要重新生成

---

## 🔒 安全提示

1. ⚠️ **不要**将 Token 提交到代码仓库
2. ⚠️ **不要**在公开场合分享 Token
3. ✅ 只在 GitHub Secrets 中配置
4. ✅ 定期检查 Token 使用情况
5. ✅ 不用的 Token 及时删除

---

## 📝 配置完成后

### 日常使用流程

```bash
# 1. 创建或修改文章
在 src/content/posts/ 编辑

# 2. 本地预览（可选）
npm run dev

# 3. 提交并推送
git add .
git commit -m "更新文章"
git push origin master

# 4. 等待自动部署（2-5分钟）

# 5. 访问网站
https://dandingbobaishi.github.io/
```

---

## 🎉 总结

配置 PERSONAL_TOKEN 后：

1. ✅ 推送到 `mizuki-blog-source` 会自动触发构建
2. ✅ 构建完成后自动部署到 `dandingbobaishi.github.io`
3. ✅ 网站自动更新
4. ✅ 无需手动操作

---

需要帮助？查看 Actions 日志获取详细错误信息。
