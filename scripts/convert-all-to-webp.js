import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ignoreDirs = ['node_modules', '.git', 'dist'];

function getAllFiles(dirPath, filterFn, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (ignoreDirs.includes(file)) return;
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, filterFn, arrayOfFiles);
    } else {
      if (!filterFn || filterFn(fullPath)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function convertImages() {
  console.log('=== Step 1: Converting all image files to WebP ===');
  const imageFiles = getAllFiles(process.cwd(), (file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.bmp', '.tiff'].includes(ext);
  });

  console.log(`Found ${imageFiles.length} image files to convert.`);

  let successCount = 0;
  let failCount = 0;

  for (const imgPath of imageFiles) {
    const ext = path.extname(imgPath);
    const basePath = imgPath.slice(0, -ext.length);
    const webpPath = `${basePath}.webp`;

    try {
      // Use sharp to convert image to webp
      await sharp(imgPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      
      console.log(`✓ Converted: ${path.relative(process.cwd(), imgPath)} -> ${path.relative(process.cwd(), webpPath)}`);
      successCount++;
    } catch (err) {
      console.error(`✕ Failed to convert ${path.relative(process.cwd(), imgPath)}: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nImage Conversion Finished: ${successCount} succeeded, ${failCount} failed.`);
}

function updateCodeReferences() {
  console.log('\n=== Step 2: Updating image references across codebase to .webp ===');
  const codeFiles = getAllFiles(process.cwd(), (file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.tsx', '.ts', '.js', '.jsx', '.css', '.html', '.json', '.md'].includes(ext);
  });

  let updatedCount = 0;

  for (const file of codeFiles) {
    // Skip package.json and lock files from path updates
    const filename = path.basename(file);
    if (['package.json', 'package-lock.json', 'tsconfig.json'].includes(filename)) continue;

    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace .jpg, .jpeg, .png image references (excluding favicon.ico, npm packages, imports of non-images, etc.)
    const updatedContent = content.replace(/(['"\/`])([\w\-\.\/]+)\.(jpg|jpeg|png)(['"`\?\)\#])/gi, (match, p1, p2, p3, p4) => {
      // Avoid replacing if it's a mime type or npm package name
      if (p2.includes('image/') || p2 === 'favicon' && p3 === 'ico') return match;
      return `${p1}${p2}.webp${p4}`;
    });

    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent, 'utf-8');
      console.log(`✓ Updated references in: ${path.relative(process.cwd(), file)}`);
      updatedCount++;
    }
  }

  console.log(`\nUpdated references in ${updatedCount} code files.`);
}

async function main() {
  await convertImages();
  updateCodeReferences();
  console.log('\nAll done!');
}

main().catch(console.error);
