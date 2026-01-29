const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 首先运行 vite 构建到临时目录
console.log('Running vite build to temp directory...');
execSync('npx vite build', { stdio: 'inherit' });

console.log('Build completed successfully.');