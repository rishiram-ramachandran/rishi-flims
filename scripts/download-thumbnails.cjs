const fs = require('fs');
const https = require('https');
const path = require('path');

const videosJsonPath = path.join(__dirname, '..', 'src', 'data', 'videos.json');
const outputDir = path.join(__dirname, '..', 'public', 'images', 'thumbnails');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read videos.json
const data = JSON.parse(fs.readFileSync(videosJsonPath, 'utf8'));

// Extract Instagram videos
const instagramVideos = [];
data.categories.forEach(category => {
  category.videos.forEach(video => {
    if (video.platform === 'instagram') {
      instagramVideos.push(video);
    }
  });
});

console.log(`Found ${instagramVideos.length} Instagram videos to download.`);

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  }
};

// Helper function to extract shortcode from Instagram URL
function getInstagramShortcode(url) {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
  return match ? match[1] : null;
}

// Helper function to download a file, following redirects
function downloadFile(fileUrl, fileDest, callback) {
  https.get(fileUrl, options, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return downloadFile(res.headers.location, fileDest, callback);
    }
    
    if (res.statusCode === 200) {
      const file = fs.createWriteStream(fileDest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        callback(null);
      });
    } else {
      callback(new Error(`Failed to download: Status ${res.statusCode}`));
    }
  }).on('error', (err) => {
    callback(err);
  });
}

// Download queue runner
let downloadIndex = 0;
function downloadNext() {
  if (downloadIndex >= instagramVideos.length) {
    console.log('All Instagram thumbnails downloaded successfully!');
    process.exit(0);
  }
  
  const video = instagramVideos[downloadIndex];
  const shortcode = getInstagramShortcode(video.url);
  const destPath = path.join(outputDir, `${video.id}.jpg`);
  
  if (!shortcode) {
    console.warn(`Could not extract shortcode for video: ${video.id}`);
    downloadIndex++;
    downloadNext();
    return;
  }
  
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    console.log(`Thumbnail for ${video.id} already exists locally. Skipping.`);
    downloadIndex++;
    downloadNext();
    return;
  }
  
  const downloadUrl = `https://www.instagram.com/p/${shortcode}/media?size=l`;
  console.log(`Downloading thumbnail for ${video.id} from: ${downloadUrl}`);
  
  downloadFile(downloadUrl, destPath, (err) => {
    if (err) {
      console.error(`Error downloading thumbnail for ${video.id}:`, err.message);
      const fallbackUrl = `https://www.instagram.com/p/${shortcode}/media?size=m`;
      console.log(`Trying fallback URL for ${video.id}: ${fallbackUrl}`);
      downloadFile(fallbackUrl, destPath, (err2) => {
        if (err2) {
          console.error(`Fallback also failed for ${video.id}:`, err2.message);
        } else {
          console.log(`Downloaded fallback thumbnail (size=m) for ${video.id}`);
        }
        downloadIndex++;
        setTimeout(downloadNext, 500);
      });
    } else {
      console.log(`Downloaded high-res thumbnail for ${video.id}`);
      downloadIndex++;
      setTimeout(downloadNext, 500);
    }
  });
}

// Start download
downloadNext();
