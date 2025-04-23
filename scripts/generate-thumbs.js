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

        if (!fs.existsSync(output)) {
          execSync(`magick convert "${input}" -resize 500x500^ -gravity center -extent 500x500 "${output}"`);
          console.log(`✅ Generated thumb: ${category}/${file}`);
        }
      });
  }
});

console.log('✨ Thumbnail generation complete!');