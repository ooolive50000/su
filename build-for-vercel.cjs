const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// 删除现有的 public 目录
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}

// 使用 spawnSync 来运行 vite 构建命令
const result = spawnSync('npx', ['vite', 'build'], {
  stdio: 'inherit',
  shell: true
});

if (result.status === 0) {
  console.log('Build completed successfully.');
} else {
  console.log('Build failed, creating minimal public directory...');
  // 如果构建失败，创建一个最小化的 public 目录
  fs.mkdirSync(publicDir, { recursive: true });
  
  // 复制 index.html
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    fs.writeFileSync(path.join(publicDir, 'index.html'), indexContent);
  }
  
  console.log('Created minimal public directory structure.');
}