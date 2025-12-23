
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('src/assets');

async function convertImages() {
  if (!fs.existsSync(assetsDir)) {
    console.error('Assets directory not found');
    return;
  }

  const files = fs.readdirSync(assetsDir);
  const pngFiles = files.filter(file => file.endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG files to convert...`);

  for (const file of pngFiles) {
    const filePath = path.join(assetsDir, file);
    const fileName = path.parse(file).name;
    const outputPath = path.join(assetsDir, `${fileName}.webp`);

    try {
      if (fs.existsSync(outputPath)) {
         console.log(`Skipping ${file}, ${fileName}.webp already exists.`);
         continue;
      }

      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Converted ${file} to ${fileName}.webp`);
    } catch (error) {
      console.error(`Error converting ${file}:`, error);
    }
  }
}

convertImages();
