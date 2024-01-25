const fs = require('fs');
const path = require('path');
const readLine = require('readline');

const filePath = path.join(__dirname, 'text.txt');
console.log('Hello,friend! Are you ready? You can write what you want!');
const stream = fs.createWriteStream(filePath, { flags: 'a' });

const helper = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

helper.on('line', (data) => {
  stream.write(data + '\n');
});

process.on('SIGINT', () => {
  helper.close();
  stream.end();
  process.exit();
});
process.on('exit', () => {
  console.log('See you soon!🐬');
});

function processInput(input) {
  if (input.toLowerCase() === 'exit') {
    helper.close();
    stream.end();
    process.exit();
  }

  stream.write(input + '\n');

  helper.question('', processInput);
}
helper.question('', processInput);