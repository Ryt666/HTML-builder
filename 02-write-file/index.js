const fs = require('fs');
const path = require('path');
const readLine = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const stream = fs.createWriteStream(filePath, { flags: 'a' });

const helper = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

helper.on('line', (data) => {
  stream.write(data + '\n');
});

process.on('SIGINT', () => {
  console.log('See you soon!🐬');
  helper.close();
  stream.end();
});

process.exit();
