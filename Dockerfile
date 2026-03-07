# 使用 Node.js 18 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json
COPY package.json ./

# 安装所有依赖（包括开发依赖，因为需要构建）
RUN npm install

# 复制所有源代码
COPY . .

# 构建应用
RUN npm run build

# 安装 serve 来提供静态文件服务
RUN npm install -g serve

# 暴露端口
EXPOSE 8080

# 启动应用
CMD ["serve", "-s", "dist", "-l", "8080"]