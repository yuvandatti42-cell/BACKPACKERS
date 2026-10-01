import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const files = fs.readdirSync(publicDir);

async function convertAll() {
  console.log('Starting WebP conversion...');
  let convertedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const name = path.basename(file, ext);
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, `${name}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);
        console.log(`✓ Converted: ${file} -> ${name}.webp`);
        convertedCount++;
      } catch (err) {
        console.error(`✕ Failed to convert ${file}:`, err.message);
      }
    }
  }

  console.log(`\nSuccessfully converted ${convertedCount} images to WebP!`);
}

convertAll();
