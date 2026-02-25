# 本地部署说明

## 使用 Zeabur 格式进行本地测试

### 方法一：使用 serve（推荐）

1. 首先确保已安装 serve：
```bash
npm install -g serve
```

2. 构建项目：
```bash
npm run build
```

3. 启动本地服务器：
```bash
serve -s dist -l 3000
```

4. 访问 http://localhost:3000 查看应用

### 方法二：使用 Docker（模拟 Zeabur 环境）

1. 构建 Docker 镜像：
```bash
docker build -t yixin-zhijiao .
```

2. 运行容器：
```bash
docker run -p 3000:3000 yixin-zhijiao
```

3. 访问 http://localhost:3000 查看应用

### 方法三：使用 Vite 预览模式

1. 构建项目：
```bash
npm run build
```

2. 使用 Vite 预览：
```bash
npm run preview
```

## 环境变量配置

如果需要自定义配置，请创建 `.env.local` 文件：

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

## 注意事项

- 本地部署主要用于测试，生产环境建议使用 Zeabur 平台
- 确保 3000 端口未被占用
- 如需修改端口，可以在命令中调整 `-l` 参数