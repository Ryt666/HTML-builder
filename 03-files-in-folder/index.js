const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function readFolderContents(folderPath) {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(folderPath, file.name);

      if (file.isFile()) {
        const stats = await fs.stat(filePath);
        const fileNameWithoutExt = path.parse(file.name).name;
        console.log(`${fileNameWithoutExt}-${path.extname(file.name)}-${stats.size / 1024}kb`);
        //console.log(`Is it file?: ${stats.isFile()}`);
      }
    }
  } catch (error) {
    console.error('ERROR WHEN READING FILE:', error);
  }
}

readFolderContents(folderPath);
