const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 需要优化的首页缩略图列表
const thumbnails = [
  'datnie.png',
  'linkedinthumbnail.png',
  'iandaithumb.jpg',
  'mocapthumbnail.png',
  'toolboxthumb.png',
  'aetherTagthumb.png'
];

const publicDir = path.join(__dirname, '..', 'public');

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputPath = path.join(publicDir, filename);
  
  // 检查文件是否存在
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  文件不存在: ${filename}`);
    return null;
  }

  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    console.log(`\n处理: ${filename}`);
    console.log(`  原始大小: ${(originalSize / 1024).toFixed(2)} KB`);

    // 先读取文件到 buffer，避免同时读写同一文件的问题
    const inputBuffer = fs.readFileSync(inputPath);
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();
    
    // 根据文件类型选择优化策略
    const ext = path.extname(filename).toLowerCase();
    
    if (ext === '.png') {
      // PNG: 转换为 WebP 格式以获得更小的文件大小
      // 或者保持 PNG 但大幅压缩
      // 用户选择了最小文件，所以我们转换为 WebP
      const webpFilename = filename.replace('.png', '.webp');
      const webpPath = path.join(publicDir, webpFilename);
      
      // 创建 WebP 版本
      const webpBuffer = await image
        .webp({ 
          quality: 60, // 较低质量以获得最小文件
          effort: 6 // 更高的压缩努力
        })
        .toBuffer();
      
      fs.writeFileSync(webpPath, webpBuffer);
      const webpSize = webpBuffer.length;
      const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
      
      console.log(`  ✅ WebP 大小: ${(webpSize / 1024).toFixed(2)} KB`);
      console.log(`  📉 减少: ${reduction}%`);
      
      // 同时优化原 PNG 文件（大幅压缩）
      const optimizedBuffer = await image
        .png({ 
          compressionLevel: 9, // 最高压缩
          quality: 60 // 较低质量
        })
        .toBuffer();
      
      fs.writeFileSync(outputPath, optimizedBuffer);
      const optimizedSize = optimizedBuffer.length;
      const pngReduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`  ✅ 优化后 PNG 大小: ${(optimizedSize / 1024).toFixed(2)} KB`);
      console.log(`  📉 PNG 减少: ${pngReduction}%`);
      
      return {
        filename,
        originalSize,
        optimizedSize,
        webpSize,
        reduction: pngReduction,
        webpReduction: reduction
      };
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // JPG: 压缩质量设置为 60%（最小文件）
      const optimizedBuffer = await image
        .jpeg({ 
          quality: 60, // 较低质量以获得最小文件
          mozjpeg: true // 使用 mozjpeg 编码器以获得更好的压缩
        })
        .toBuffer();
      
      fs.writeFileSync(outputPath, optimizedBuffer);
      const optimizedSize = optimizedBuffer.length;
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`  ✅ 优化后大小: ${(optimizedSize / 1024).toFixed(2)} KB`);
      console.log(`  📉 减少: ${reduction}%`);
      
      return {
        filename,
        originalSize,
        optimizedSize,
        reduction
      };
    } else {
      console.log(`  ⚠️  不支持的文件格式: ${ext}`);
      return null;
    }
  } catch (error) {
    console.error(`  ❌ 处理失败: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 开始优化首页项目缩略图...\n');
  console.log('目标: 最小文件大小（快速加载）\n');
  
  const results = [];
  
  for (const thumbnail of thumbnails) {
    const result = await optimizeImage(thumbnail);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 优化总结:');
  console.log('='.repeat(50));
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  results.forEach(result => {
    totalOriginal += result.originalSize;
    totalOptimized += result.optimizedSize || result.originalSize;
    
    console.log(`\n${result.filename}:`);
    console.log(`  原始: ${(result.originalSize / 1024).toFixed(2)} KB`);
    if (result.optimizedSize) {
      console.log(`  优化后: ${(result.optimizedSize / 1024).toFixed(2)} KB`);
      console.log(`  减少: ${result.reduction}%`);
    }
    if (result.webpSize) {
      console.log(`  WebP: ${(result.webpSize / 1024).toFixed(2)} KB`);
      console.log(`  WebP 减少: ${result.webpReduction}%`);
    }
  });
  
  const totalReduction = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(50));
  console.log(`总计:`);
  console.log(`  原始总大小: ${(totalOriginal / 1024).toFixed(2)} KB (${(totalOriginal / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`  优化后总大小: ${(totalOptimized / 1024).toFixed(2)} KB (${(totalOptimized / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`  总减少: ${totalReduction}%`);
  console.log('='.repeat(50));
  
  console.log('\n✅ 优化完成！');
  console.log('\n注意: PNG 文件已同时生成 WebP 版本。');
  console.log('如果要在代码中使用 WebP，需要更新图片路径。');
}

main().catch(console.error);
