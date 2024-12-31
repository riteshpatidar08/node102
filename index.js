//NOTE common js module
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
//TODO READING FILE

//NOTE synchronous blocking code
console.log('...reading file started');

const data = fs.readFileSync('./words.txt', 'utf-8');
console.log(chalk.blue(data));
console.log(chalk.blue.bgRed.bold('Hello world!'));
console.log('...reading file end');

//NOTE async non blocking code

console.log('...reading file started async');

fs.readFile('./words.txt', 'utf-8', (err, data) => {
  console.log(data);
});

console.log('...reading file end async');

const dataa = ['ritesh', 'lakshit', 'anshuman', 'divyanshu'];

//TODO WRITING FILE

//NOTE Synchronous way of writing data in a file
// const writeFile = fs.writeFileSync('./example.txt', JSON.stringify(dataa));

// console.log(writeFile);

//NOTE asynchornous way of writing data in a file
fs.writeFile('./async.txt', JSON.stringify(dataa), () => {});

//TODO APPENDING SOME TEXT TO EXISTING FILE ;

fs.appendFile('./../example.txt', '\n appending data', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('appending succesfful');
  }
});

//Deleting the file

fs.unlink('./example.txt', () => {});

//Renaming a file
fs.rename('./notes.txt', 'newnotes.txt', () => {});

console.log(chalk.bgYellow(__dirname));

console.log(chalk.bgYellow(__filename));

//relative and absolute path

//TODO PATH.JOIN() METHOD

const filePath = path.resolve('data', 'newfolder', 'index.txt');

console.log(filePath);

const fileData = fs.readFileSync(filePath, 'utf-8');

console.log(fileData); 

//TODO PATH.RESOLVE() ;

const resolveEg = path.resolve('folder', 'user', 'node');
const joinEg = path.join('folder', 'user', 'node');

console.log(chalk.red(resolveEg));

console.log(chalk.green(joinEg));



