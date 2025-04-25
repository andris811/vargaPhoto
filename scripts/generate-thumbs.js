const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CATEGORIES = ['nature', 'portrait', 'landscape', 'city', 'film', 'bw'];
const IMAGES_ROOT = path.join(__dirname, '..', 'assets', 'images');

console.log('⏳ Generating thumbnails...');

// Create thumbs folders if they don't exist
CATEGORIES.forEach(category => {
  const categoryPath = path.join(IMAGES_ROOT, category);
  const thumbPath = path.join(categoryPath, 'thumbs');

  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath, { recursive: true });
    console.log(`📁 Created thumbs folder for ${category}`);
  }

  // Process images
  if (fs.existsSync(categoryPath)) {
    fs.readdirSync(categoryPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .forEach(file => {
        const input = path.join(categoryPath, file);
        const output = path.join(thumbPath, file);

        // Always regenerate thumbnail (remove the existence check)
        try {
          execSync(`magick "${input}" -resize 500x500^ -gravity center -extent 500x500 "${output}"`);
          console.log(`🔄 Regenerated thumb: ${category}/${file}`);
        } catch (error) {
          console.error(`❌ Failed to generate thumb for ${category}/${file}:`, error.message);
        }
      });
  }
});

console.log('✨ Thumbnail generation complete!');