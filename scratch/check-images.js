const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Simple script to read image dimensions
const dir = path.join(__dirname, '..', 'public', 'images', 'thumbnails');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

console.log('Image dimensions:');
files.forEach(file => {
  const filePath = path.join(dir, file);
  try {
    // We can use a simple node script to read JPEG dimensions without external libraries
    const buffer = fs.readFileSync(filePath);
    let i = 0;
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      i += 2;
      let len = buffer.length;
      while (i < len) {
        while (buffer[i] === 0xFF) i++;
        let marker = buffer[i];
        i++;
        if (marker === 0xD9 || marker === 0xDA) break; // End of image / Start of scan
        let size = buffer.readUInt16BE(i);
        if (marker >= 0xC0 && marker <= 0xC3) {
          // SOF0 - SOF3 contain height and width
          let height = buffer.readUInt16BE(i + 3);
          let width = buffer.readUInt16BE(i + 5);
          console.log(`${file}: ${width}x${height} (Ratio: ${(width/height).toFixed(2)})`);
          break;
        }
        i += size;
      }
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
});
