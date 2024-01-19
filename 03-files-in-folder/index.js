const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function readFolderContents(folderPath) {
    try {
      // Чтение содержимого папки
      const files = await fs.readdir(folderPath, { withFileTypes: true });
  
      // Обход каждого объекта в папке
      for (const file of files) {
        const filePath = path.join(folderPath, file.name);
  
        // Проверка, является ли объект файлом
        if (file.isFile()) {
          // Используйте stat для получения информации о файле
          const stats = await fs.stat(filePath);
  
          // Вывод информации о файле
          console.log(`Имя файла: ${file.name}`);
          console.log(`Расширение файла: ${path.extname(file.name)}`);
          console.log(`Размер файла: ${stats.size} байт`);
          console.log(`Является ли файлом: ${stats.isFile()}`);
          console.log(`Дата последнего изменения: ${stats.mtime}`);
          console.log('--------------------------');
        }
      }
    } catch (err) {
      console.error('Ошибка чтения папки:', err);
    }
  }
  
  // Указание пути к папке для чтения
  const folderPath = '/путь/к/вашей/целевой/папке';
  
  // Вызов функции для чтения содержимого папки
  readFolderContents(folderPath);