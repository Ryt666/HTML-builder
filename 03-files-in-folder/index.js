const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (files, error) => {
  if (error) {
    console.log('ERROR WHEN READ FOLDER', error);
    return 0;
  }

  files.array.forEach((file) => {
    const filePath = path.join(folderPath, file.name);

    if (file.isFile()) {
      fs.stat(filePath, (error) => {
        if (error) {
          console.log(`ERROR WHEN STAT IN FILE ${file.name}:`, error);
          return 0;
        }
        console.log(`${file.name} CONTENTS : `);

        fs.readFile(filePath, (data, error) => {
          if (error) {
            console.log(`ERROR WHEN READ FILE ${file.name}:`, error);
          }
          console.log(data);
        });
      });
    } else {
      console.log(`FILE ${file.name} IS NOT FILE`);
    }
  });
});
