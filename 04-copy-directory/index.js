const fs = require('fs').promises;
const path = require('path');

const sourceFolderPath = '04-copy-directory/files';
const folderPath = '04-copy-directory/files-copy';

async function copyFolderContent(source, path) {
  try {
    await fs.copyFile(source, path);
    console.log(`File copied.`);
  } catch (error) {
    console.error(`ERROR:`, error);
  }
}

async function updateDestinationFolder() {
  try {
    const files = await fs.readdir(sourceFolderPath);

    try {
      await fs.mkdir(folderPath);
      console.log('Coping completed.');
    } catch (Error) {

    }

    const existingFiles = await fs.readdir(folderPath);

    await Promise.all(existingFiles.map(async (existingFile) => {
      if (!files.includes(existingFile)) {
        const filePathToRemove = path.join(folderPath, existingFile);
        await fs.unlink(filePathToRemove);
        console.log(`File ${existingFile} was deleted from ${folderPath}.`);
      }
    }));
    await Promise.all(files.map(async (file) => {
      const sourceFilePath = path.join(sourceFolderPath, file);
      const filePath = path.join(folderPath, file);
      await copyFolderContent(sourceFilePath, filePath);
    }));
  } catch (error) {
    console.error('ERROR:', error);
  }
}

updateDestinationFolder();
