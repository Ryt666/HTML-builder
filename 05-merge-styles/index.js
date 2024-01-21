const fs = require('fs').promises;
const path = require('path');

async function readStylesFolder() {
  try {
    const stylesFolderPath = '05-merge-styles/styles';

    const files = await fs.readdir(stylesFolderPath);

    const stylesArray = [];

    for (const file of files) {
      const filePath = path.join(stylesFolderPath, file);

      const stats = await fs.stat(filePath);

      if (stats.isFile() && path.extname(file) === '.css') {
        const styleData = await fs.readFile(filePath, 'utf-8');

        stylesArray.push(styleData);
      }
    }

    const bundlePath = path.join(__dirname, './project-dist/bundle.css');
    await fs.writeFile(bundlePath, stylesArray.join('\n'));

    console.log('Success bundle.css.');
  } catch (error) {
    console.error('ERROR:', error);
  }
}
readStylesFolder();
