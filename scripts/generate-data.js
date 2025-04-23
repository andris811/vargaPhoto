const fs = require('fs');
const path = require('path');

const CATEGORIES = ['nature', 'portrait', 'landscape', 'city', 'film', 'bw'];
const IMAGES_ROOT = path.join(__dirname, '..', 'assets', 'images');
const OUTPUT_FILE = path.join(__dirname, '..', 'js', 'gallery-data.js');

console.log('⏳ Generating gallery data...');

let outputContent = `// Auto-generated at ${new Date().toISOString()}
const galleryData = [
`;

CATEGORIES.forEach(category => {
  const categoryPath = path.join(IMAGES_ROOT, category);

  if (fs.existsSync(categoryPath)) {
    fs.readdirSync(categoryPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .forEach(file => {
        const title = file
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        outputContent += `  {
    src: "assets/images/${category}/${file}",
    thumb: "assets/images/${category}/thumbs/${file}",
    category: "${category}",
    title: "${title}"
  },\n`;
      });
  }
});

outputContent += `];

export default galleryData;`;

fs.writeFileSync(OUTPUT_FILE, outputContent);
console.log(`✅ Gallery data saved to ${OUTPUT_FILE}`);