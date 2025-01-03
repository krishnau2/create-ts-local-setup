#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templateFiles = [
  "nodemon.json",
  "package.json",
  "tsconfig.json"
]

const argv = process.argv
const projectName = argv.slice(2).join(' ');
const packageRoot = path.join(__dirname)
const cwd = process.cwd()
const projectPath = `${cwd}/${projectName}`

if(projectName.length === 0){
  console.log("Provide a project name.")
  return;
}

// Create the Project Folder
fs.mkdirSync(projectName, e => {
  if(e) console.log(`mkdir Error: ${e}`)
});
console.log(`Created project folder ${projectName}`);

// Create /src
fs.mkdirSync(`${projectName}/src`, e => {
  if(e) console.log(`mkdir Error: ${e}`);
});

// Copy template/index.ts to projectFolder/src/index.ts
fs.copyFile(`${packageRoot}/template/index.ts`, `${projectPath}/src/index.ts`, e => {
  if(e) console.log(`File Copy Error TS file: ${e}`);
});

templateFiles.forEach(fileName => {
  fs.copyFile(`${packageRoot}/template/${fileName}`, `${projectPath}/${fileName}`, e => {
    if(e) console.log(`File Copy Error - ${fileName} - file: ${e}`);
  });
});

console.log('Setup completed.');
console.log(`cd ${projectName}`);
console.log('npm install');
console.log('npm run dev');
console.log('Try editing /src/index.ts file.');
