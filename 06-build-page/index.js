/* eslint-disable no-const-assign */
const fs = require('fs').promises;
const path = require('path');

async function replaceTemplateWithContent() {
  try {
    const templatePath = '06-build-page/template.html';
    let templateContents = await fs.readFile(templatePath, 'utf-8');

    const newContentsPath = '06-build-page/project-dist';

    const tags = ['header', 'articles', 'footer'];
    await Promise.all(
      tags.map(async (tag) => {
        const componentFilePath = path.join(
          '06-build-page/components',
          `${tag}.html`,
        );
        try {
          const componentContent = await fs.readFile(
            componentFilePath,
            'utf-8',
          );
          templateContents = templateContents.replace(
            new RegExp(`<${tag}\\s*>[\\s\\S]*?<\\/${tag}>`, 'g'),
            componentContent,
          );
        } catch (error) {
          console.log('ERROR:', error);
        }
      }),
    );

    const indexHtmlPath = path.join(newContentsPath, 'index.html');
    await fs.writeFile(indexHtmlPath, templateContents);
  } catch (error) {
    console.log('ERROR:', error);
  }
}

replaceTemplateWithContent();

async function readStylesFolder() {
  try {
    const stylesFolderPath = '06-build-page/styles';

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

    const bundlePath = path.join(__dirname, './project-dist/style.css');
    await fs.writeFile(bundlePath, stylesArray.join('\n'));

    console.log('Success style.css.');
  } catch (error) {
    console.error('ERROR:', error);
  }
}

readStylesFolder();

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

const sourceFolderPath = '06-build-page/assets';
const folderPath = '06-build-page/project-dist/assets';

copyFolderContent(sourceFolderPath, folderPath);
