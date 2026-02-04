const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

// 检查 ffmpeg 是否可用
ffmpeg.getAvailableEncoders((err, encoders) => {
  if (err) {
    console.error('❌ FFmpeg 未安装或不可用。请先安装 FFmpeg:');
    console.error('   Windows: https://ffmpeg.org/download.html');
    process.exit(1);
  }
  
  compressWebmFiles();
});

function compressWebmFiles() {
  const publicDir = path.join(__dirname, '..', 'public');
  const webmDirs = [
    path.join(publicDir, 'webm', 'Datnie'),
    path.join(publicDir, 'webm', 'Signie'),
    path.join(publicDir, 'webm', 'Mirrormirror'),
    path.join(publicDir, 'webm', 'MotionCapture'),
    path.join(publicDir, 'TheToolbox', 'webm'), // TheToolbox webm 文件在 public/TheToolbox/webm/ 目录
    path.join(publicDir, 'gifs')
  ];

  const allWebmFiles = [];
  
  // 收集所有 webm 文件
  webmDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (file.endsWith('.webm') && !file.endsWith('-compressed.webm')) {
          allWebmFiles.push(path.join(dir, file));
        }
      });
    }
  });

  console.log(`🚀 找到 ${allWebmFiles.length} 个 webm 文件，开始压缩...\n`);
  console.log('压缩策略: 使用 VP9 编码器，CRF 35（高质量压缩）\n');

  let processed = 0;
  let success = 0;
  let skipped = 0;
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  const processNext = (index) => {
    if (index >= allWebmFiles.length) {
      console.log('\n' + '='.repeat(50));
      console.log('📊 压缩完成:');
      console.log(`   成功: ${success}`);
      console.log(`   跳过: ${skipped}`);
      console.log(`   总计: ${allWebmFiles.length}`);
      if (totalOriginalSize > 0) {
        const reduction = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
        console.log(`\n   原始总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   压缩后总大小: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   总减少: ${reduction}%`);
      }
      console.log('='.repeat(50));
      return;
    }

    const webmPath = allWebmFiles[index];
    const webmDir = path.dirname(webmPath);
    const webmName = path.basename(webmPath, '.webm');
    const compressedPath = path.join(webmDir, `${webmName}-compressed.webm`);

    // 检查压缩文件是否已存在
    if (fs.existsSync(compressedPath)) {
      console.log(`⏭️  跳过 (已存在): ${path.relative(publicDir, compressedPath)}`);
      skipped++;
      processNext(index + 1);
      return;
    }

    const stats = fs.statSync(webmPath);
    const originalSize = stats.size;
    totalOriginalSize += originalSize;

    console.log(`处理: ${path.relative(publicDir, webmPath)}`);
    console.log(`  原始大小: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

    // 使用 VP9 编码器进行压缩
    // CRF (Constant Rate Factor): 0-63, 值越大压缩率越高但质量越低
    // 35 是一个平衡值，在保持较好质量的同时显著减小文件大小
    ffmpeg(webmPath)
      .videoCodec('libvpx-vp9')
      .audioCodec('libopus')
      .outputOptions([
        '-crf 35',           // 质量参数，35 是高质量压缩
        '-b:v 0',            // 使用 CRF 模式，不需要设置码率
        '-row-mt 1',         // 启用多线程行处理
        '-threads 4',        // 使用 4 个线程
        '-speed 2',          // 编码速度（0-5，2 是平衡值）
        '-tile-columns 2',   // 平铺列数，提高并行度
        '-frame-parallel 1', // 帧并行
        '-an'                // 移除音频（如果视频没有音频或不需要音频）
      ])
      .on('start', (commandLine) => {
        // console.log('FFmpeg 命令: ' + commandLine);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\r  进度: ${Math.round(progress.percent)}%`);
        }
      })
      .on('end', () => {
        process.stdout.write('\n');
        const compressedStats = fs.statSync(compressedPath);
        const compressedSize = compressedStats.size;
        totalCompressedSize += compressedSize;
        const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
        console.log(`  ✅ 压缩成功: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  📉 减少: ${reduction}%`);
        success++;
        processed++;
        processNext(index + 1);
      })
      .on('error', (err) => {
        process.stdout.write('\n');
        console.error(`  ❌ 压缩失败: ${err.message}`);
        // 如果 VP9 失败，尝试使用 VP8
        console.log(`  🔄 尝试使用 VP8 编码器...`);
        ffmpeg(webmPath)
          .videoCodec('libvpx')
          .audioCodec('libvorbis')
          .outputOptions([
            '-crf 35',
            '-b:v 0',
            '-threads 4',
            '-speed 2',
            '-an'
          ])
          .on('end', () => {
            const compressedStats = fs.statSync(compressedPath);
            const compressedSize = compressedStats.size;
            totalCompressedSize += compressedSize;
            const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
            console.log(`  ✅ 压缩成功 (VP8): ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  📉 减少: ${reduction}%`);
            success++;
            processed++;
            processNext(index + 1);
          })
          .on('error', (err2) => {
            console.error(`  ❌ VP8 压缩也失败: ${err2.message}`);
            processed++;
            processNext(index + 1);
          })
          .save(compressedPath);
      })
      .save(compressedPath);
  };

  processNext(0);
}
