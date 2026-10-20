import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDirs = [
  path.resolve('./public'),
  path.resolve('./src/assets')
];

async function optimizeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  let totalSavedBytes = 0;
  let optimizedCount = 0;

  for (const file of files) {
    if (!file.endsWith('.webp')) continue;
    const fullPath = path.join(dirPath, file);
    const initialSize = fs.statSync(fullPath).size;

    try {
      // Read entire file into buffer so Windows doesn't lock the file handle
      const inputBuffer = fs.readFileSync(fullPath);
      const meta = await sharp(inputBuffer).metadata();
      
      // Determine max dimension: heroes get 1600, other cards get 1200-1300
      const isHero = file.includes('hero') || file === 'in.webp' || file === 'r.webp';
      const maxDim = isHero ? 1600 : 1200;

      // Only optimize if image is larger than maxDim or file size is over 250KB
      if (meta.width > maxDim || meta.height > maxDim || initialSize > 250 * 1024) {
        const buffer = await sharp(inputBuffer)
          .resize({
            width: maxDim,
            height: maxDim,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 78, effort: 5 })
          .toBuffer();

        // Only overwrite if it actually saved space
        if (buffer.length < initialSize) {
          fs.writeFileSync(fullPath, buffer);
          const saved = initialSize - buffer.length;
          totalSavedBytes += saved;
          optimizedCount++;
          console.log(`✓ Optimized ${file}: ${(initialSize/1024).toFixed(0)}KB -> ${(buffer.length/1024).toFixed(0)}KB (saved ${(saved/1024).toFixed(0)}KB)`);
        }
      }
    } catch (err) {
      console.warn(`! Skipped ${file}: ${err.message}`);
    }
  }

  console.log(`\nFinished ${path.basename(dirPath)}: Optimized ${optimizedCount} images, Saved ${(totalSavedBytes/(1024*1024)).toFixed(1)} MB.`);
}

async function main() {
  console.log('=== Starting WebP Image Dimensions & Compression Optimization ===\n');
  for (const dir of targetDirs) {
    await optimizeDirectory(dir);
  }
  console.log('\nAll done!');
}

main().catch(console.error);
