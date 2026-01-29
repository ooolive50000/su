# 益心支教网站

这是一个公益性质的支教信息平台，旨在连接大学生志愿者与贫困山区学校，促进教育公平。

## 功能特性

- 志愿者报名系统
- 学校入驻申请
- 支教信息发布
- 管理后台

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase

## 安装与运行

1. 克隆项目：
```bash
git clone <your-repo-url>
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 构建生产版本：
```bash
npm run build
```

## 部署

### 部署到 Vercel（推荐）

1. 在 GitHub 上创建仓库并推送代码
2. 访问 [Vercel](https://vercel.com) 并使用 GitHub 账户登录
3. 点击 "New Project" 并导入你的仓库
4. 在配置页面确认以下设置：
   - Framework Preset: 选择 "Other"
   - Build Command: `npm run build`
   - Output Directory: `public`
   - Install Command: `npm install`
   - Development Command: `npm run dev`
5. 点击 "Deploy"，稍等几分钟即可完成部署
6. 部署完成后会生成一个类似 `https://yixin-zhijiao.vercel.app` 的链接
7. （重要）为了让 SPA 路由正常工作，需要在 Vercel 项目设置中配置重写规则：
   - 进入项目设置
   - 找到 "Routes" 或 "Redirects/Rewrites" 部分
   - 添加一个重写规则：Source: `/(.*)`，Destination: `/index.html`
8. 重新部署以应用重写规则

### 部署到其他平台

构建后的文件位于 `dist` 目录，可部署到任何静态文件服务器上。

#### 部署到 GitHub Pages 示例：

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录的内容上传到 GitHub Pages 或其他静态托管服务

## 环境变量配置

如果需要自定义 Supabase 配置，请在部署平台设置以下环境变量：

- `VITE_SUPABASE_URL` - Supabase 项目 URL
- `VITE_SUPABASE_ANON_KEY` - Supabase 公开 API 密钥

## 项目结构

- `src/App.tsx` - 主应用组件
- `src/components/` - 可复用组件
- `src/lib/` - 工具函数和配置
- `public/` - 静态资源文件
- `vite.config.ts` - Vite 配置文件
- `vercel.json` - Vercel 部署配置

## 自定义

如需自定义配置，请修改以下文件：

- `vite.config.ts` - 构建配置
- `tailwind.config.ts` - 样式配置
- `src/lib/supabase.ts` - 数据库配置