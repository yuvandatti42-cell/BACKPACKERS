import fs from 'fs';
import jpeg from 'jpeg-js';

const jpegData = fs.readFileSync('gearlogo.jpeg');
const rawImageData = jpeg.decode(jpegData, { useTolerantUnknown: true });

const { width, height, data } = rawImageData;

let minX = width, minY = height, maxX = 0, maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Check if pixel is not white (threshold 245)
    if (r < 245 || g < 245 || b < 245) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add small 10px padding
const pad = 10;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;

console.log(`Cropping from (${minX}, ${minY}) to (${maxX}, ${maxY}) - New size: ${cropWidth}x${cropHeight}`);

const croppedData = Buffer.alloc(cropWidth * cropHeight * 4);

for (let y = 0; y < cropHeight; y++) {
  for (let x = 0; x < cropWidth; x++) {
    const srcIdx = ((minY + y) * width + (minX + x)) * 4;
    const destIdx = (y * cropWidth + x) * 4;
    
    croppedData[destIdx] = data[srcIdx];
    croppedData[destIdx + 1] = data[srcIdx + 1];
    croppedData[destIdx + 2] = data[srcIdx + 2];
    croppedData[destIdx + 3] = data[srcIdx + 3];
  }
}

const croppedJpeg = jpeg.encode({
  data: croppedData,
  width: cropWidth,
  height: cropHeight
}, 95);

fs.writeFileSync('public/gearlogo.jpeg', croppedJpeg.data);
console.log('Saved cropped logo to public/gearlogo.jpeg');
