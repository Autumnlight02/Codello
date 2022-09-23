// const { performance } = require("perf_hooks");

// let a = performance.now();

const fs = require("fs");
const path = require("path");

const folder = __dirname + "/src/components";

function getAllfiles(path) {
  function getAllFilesInFolder(path, arr) {
    const files = fs.readdirSync(path);
    files.forEach((file) => {
      if (fs.statSync(path + "/" + file).isDirectory()) {
        console.log(path + "/" + file);
        getAllFilesInFolder(path + "/" + file, arr);
      } else {
        arr.push(path + "/" + file);
      }
    });
  }
  const finalArr = [];
  getAllFilesInFolder(path, finalArr);

  return finalArr;
}

let components = getAllfiles(folder);
components = components.filter((e) => e.includes(".svelte"));
components = components.map((e) => e.slice(folder.length));

let finalString = "";
for (let i = 0; i < components.length; i++) {
  finalString += `export * from "./components${components[i]}"; \n`;
}

fs.writeFileSync("./src/main.ts", finalString);

// console.log(performance.now() - a);
