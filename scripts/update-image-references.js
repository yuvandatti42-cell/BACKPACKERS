import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.tsx', '.ts', '.css', '.html'].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const targetFiles = [
  path.resolve('index.html'),
  ...getAllFiles(path.resolve('src'))
];

let replacedFilesCount = 0;

targetFiles.forEach((file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace .jpg, .jpeg, .png image references in string paths (like '/image.jpg' or 'image.png')
  const newContent = content.replace(/(['"\/`])([\w\-]+)\.(jpg|jpeg|png)(['"`\?\)\#])/gi, (match, p1, p2, p3, p4) => {
    // Keep favicon.png or specific non-image assets if needed, otherwise convert to webp
    if (p2 === 'favicon' && p3 === 'ico') return match;
    return `${p1}${p2}.webp${p4}`;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf-8');
    console.log(`✓ Updated references in: ${path.relative(process.cwd(), file)}`);
    replacedFilesCount++;
  }
});

console.log(`\nSuccessfully updated image extensions to .webp across ${replacedFilesCount} files!`);
