const fs = require('fs').promises;
const path = require('path');

async function copyFolderContent(sourceFolderPath, folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });

    const files = await fs.readdir(sourceFolderPath);

    for (const file of files) {
      const sourceFilePath = path.join(sourceFolderPath, file);
      const filePath = path.join(folderPath, file);

      const stats = await fs.stat(sourceFilePath);

      if (stats.isFile()) {
        await fs.copyFile(sourceFilePath, filePath);
        console.log(`Coped file: ${file}`);
      } else if (stats.isDirectory()) {
        await copyFolderContent(sourceFilePath, filePath);
      }
    }

    console.log('Coping completed');
  } catch (err) {
    console.error('ERROR WHEN COPING', err);
  }
}

const sourceFolderPath = '04-copy-directory/files';
const folderPath = '04-copy-directory/files-copy';

copyFolderContent(sourceFolderPath, folderPath);
