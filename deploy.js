const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, 'dist');

// 1. Recreate dist folder
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// 2. Files to copy
const filesToCopy = [
    'index.html',
    'app.js',
    'style.css',
    'sw.js',
    'manifest.json',
    '_headers'
];

filesToCopy.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(distDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
    }
});

// 3. Copy metadata directory
const metaSrc = path.join(__dirname, 'metadata');
const metaDest = path.join(distDir, 'metadata');
if (fs.existsSync(metaSrc)) {
    fs.mkdirSync(metaDest, { recursive: true });
    fs.readdirSync(metaSrc).forEach(file => {
        fs.copyFileSync(path.join(metaSrc, file), path.join(metaDest, file));
    });
}

// 4. Copy all image assets from root
fs.readdirSync(__dirname).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) {
        fs.copyFileSync(path.join(__dirname, file), path.join(distDir, file));
    }
});

console.log('Build folder created successfully inside /dist');

// 5. Deploy /dist using Wrangler
try {
    console.log('Deploying /dist to Cloudflare Pages...');
    execSync('npx wrangler pages deploy dist --project-name mog-liquidity-desk', { stdio: 'inherit' });
    console.log('Deployment successful!');
} catch (err) {
    console.error('Deployment failed:', err.message);
}
