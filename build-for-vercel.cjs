const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 首先运行 vite 构建
console.log('Running vite build...');
execSync('npx vite build', { stdio: 'inherit' });

// 将构建结果从 temp_dist 复制到 public
const sourceDir = path.join(__dirname, 'temp_dist');
const destDir = path.join(__dirname, 'public');

// 删除现有的 public 目录内容（除了可能存在的特殊文件）
if (fs.existsSync(destDir)) {
  const items = fs.readdirSync(destDir);
  for (const item of items) {
    if (item !== '.git') { // 保留 .git 文件夹及其内容
      const fullPath = path.join(destDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
    }
  }
} else {
  fs.mkdirSync(destDir, { recursive: true });
}

// 复制文件
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      copyDir(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

console.log('Build completed and copied to public folder.');

// 辅助函数：递归复制目录
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}