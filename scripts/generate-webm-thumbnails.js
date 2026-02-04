const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

// 检查 ffmpeg 是否可用
ffmpeg.getAvailableEncoders((err, encoders) => {
  if (err) {
    console.error('❌ FFmpeg 未安装或不可用。请先安装 FFmpeg:');
    console.error('   Windows: https://ffmpeg.org/download.html');
    console.error('   或使用: choco install ffmpeg (需要 Chocolatey)');
    console.error('   或使用: winget install ffmpeg');
    process.exit(1);
  }
  
  generateThumbnails();
});

function generateThumbnails() {
  const publicDir = path.join(__dirname, '..', 'public');
  const webmDirs = [
    path.join(publicDir, 'webm', 'Datnie'),
    path.join(publicDir, 'webm', 'Signie'),
    path.join(publicDir, 'webm', 'Mirrormirror'),
    path.join(publicDir, 'webm', 'MotionCapture'),
    path.join(publicDir, 'TheToolbox', 'webm'), // TheToolbox webm 文件在 public/TheToolbox/webm/ 目录
    path.join(publicDir, 'gifs') // Post1 中也有 gifs 目录下的 webm
  ];

  const allWebmFiles = [];
  
  // 收集所有 webm 文件
  webmDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (file.endsWith('.webm')) {
          allWebmFiles.push(path.join(dir, file));
        }
      });
    }
  });

  console.log(`🚀 找到 ${allWebmFiles.length} 个 webm 文件，开始生成预览图...\n`);

  let processed = 0;
  let success = 0;
  let skipped = 0;

  const processNext = (index) => {
    if (index >= allWebmFiles.length) {
      console.log('\n' + '='.repeat(50));
      console.log('📊 处理完成:');
      console.log(`   成功: ${success}`);
      console.log(`   跳过: ${skipped}`);
      console.log(`   总计: ${allWebmFiles.length}`);
      console.log('='.repeat(50));
      return;
    }

    const webmPath = allWebmFiles[index];
    const webmDir = path.dirname(webmPath);
    const webmName = path.basename(webmPath, '.webm');
    const thumbnailPath = path.join(webmDir, `${webmName}-thumb.jpg`);

    // 检查预览图是否已存在
    if (fs.existsSync(thumbnailPath)) {
      console.log(`⏭️  跳过 (已存在): ${path.relative(publicDir, thumbnailPath)}`);
      skipped++;
      processNext(index + 1);
      return;
    }

    console.log(`处理: ${path.relative(publicDir, webmPath)}`);

    // 获取视频时长，然后提取中间帧
    ffmpeg(webmPath)
      .ffprobe((err, metadata) => {
        if (err) {
          console.error(`  ❌ 获取视频信息失败: ${err.message}`);
          // Fallback: 使用 1 秒的位置
          generateThumbnail(webmPath, webmDir, webmName, thumbnailPath, '00:00:01.000', index);
          return;
        }

        const duration = metadata.format.duration; // 秒数
        let timestamp = '00:00:01.000'; // 默认使用 1 秒
        
        if (duration && duration > 2) {
          // 如果视频长度超过 2 秒，使用中间位置
          const midSeconds = Math.floor(duration / 2);
          const hours = Math.floor(midSeconds / 3600);
          const minutes = Math.floor((midSeconds % 3600) / 60);
          const seconds = midSeconds % 60;
          timestamp = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.000`;
        } else if (duration && duration > 0.5) {
          // 如果视频长度在 0.5-2 秒之间，使用 0.5 秒位置
          timestamp = '00:00:00.500';
        }

        generateThumbnail(webmPath, webmDir, webmName, thumbnailPath, timestamp, index);
      });
  };

  const generateThumbnail = (webmPath, webmDir, webmName, thumbnailPath, timestamp, index) => {
    ffmpeg(webmPath)
      .screenshots({
        timestamps: [timestamp], // 使用计算出的时间戳
        filename: `${webmName}-thumb.jpg`,
        folder: webmDir,
        size: '1920x1080' // 保持原始尺寸或指定尺寸
      })
      .on('end', () => {
        const stats = fs.statSync(thumbnailPath);
        console.log(`  ✅ 生成成功: ${(stats.size / 1024).toFixed(2)} KB (时间戳: ${timestamp})`);
        success++;
        processed++;
        processNext(index + 1);
      })
      .on('error', (err) => {
        console.error(`  ❌ 生成失败: ${err.message}`);
        processed++;
        processNext(index + 1);
      });
  };

  processNext(0);
}
