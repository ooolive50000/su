# Zeabur 部署指南

## 快速部署

### 方法一：一键部署（推荐）

1. 点击 [Deploy on Zeabur](https://zeabur.com/templates) 按钮
2. 连接你的 GitHub 仓库
3. Zeabur 会自动识别项目并部署

### 方法二：手动部署

1. **创建新项目**
   - 登录 [Zeabur](https://zeabur.com)
   - 点击 "New Project"
   - 选择 "GitHub" 或 "Docker" 部署方式

2. **配置构建选项**
   ```json
   {
     "build": {
       "command": "npm run build",
       "output": "dist"
     }
   }
   ```

3. **环境变量设置**
   
   在 Zeabur 控制台中添加以下环境变量：
   - `VITE_SUPABASE_URL`: 你的 Supabase 项目 URL
   - `VITE_SUPABASE_ANON_KEY`: 你的 Supabase 匿名密钥

4. **端口配置**
   - 默认端口：8080
   - 已在 `zeabur.json` 中配置

## 本地测试构建

在部署前，建议先在本地测试构建是否成功：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 故障排查

### 构建失败

如果构建失败，检查以下几点：

1. **Node.js 版本**
   - 确保使用 Node.js 18+
   - 本地运行 `node --version` 检查

2. **依赖安装**
   - 删除 `node_modules` 和 `package-lock.json`
   - 重新运行 `npm install`

3. **环境变量**
   - 确保所有必需的环境变量都已设置
   - 检查 `.env.example` 文件了解需要的变量

### 页面显示异常

如果部署成功但页面显示异常：

1. **检查控制台错误**
   - 打开浏览器开发者工具
   - 查看 Console 和 Network 标签页

2. **API 连接**
   - 确认 Supabase 配置正确
   - 检查 CORS 设置

## 自定义域

在 Zeabur 控制台中可以配置自定义域：

1. 进入项目设置
2. 选择 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS

## 自动部署

启用自动部署后，每次推送到主分支都会自动构建和部署：

1. 在 Zeabur 项目中连接到 GitHub 仓库
2. 选择要部署的分支（通常是 main/master）
3. 启用 "Auto Deploy"

## 回滚

如果需要回滚到之前的版本：

1. 进入项目详情页
2. 查看 "Deployments" 历史
3. 点击目标版本旁边的菜单
4. 选择 "Promote to Production"

## 资源监控

在 Zeabur 控制面板可以查看：

- CPU 和内存使用情况
- 网络流量
- 部署历史
- 日志信息

## 支持

遇到问题？

- 查看 [Zeabur 文档](https://zeabur.com/docs)
- 加入 Zeabur Discord 社区
- 提交 Issue 到项目仓库
