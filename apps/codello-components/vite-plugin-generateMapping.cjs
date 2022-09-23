import { createRequire } from "module";
export default (userOptions = {}) => {
  return {
    name: "vite-plugin-generateMapping",
    enforce: "pre",

    transform(raw, id) {
      const require = createRequire(import.meta.url);
      const fs = require("fs");
      const path = require("path");
      if (id.includes("main.ts") === true) {
        const folder = __dirname + "/src/components";

        function getAllfiles(path) {
          function getAllFilesInFolder(path, arr) {
            const files = fs.readdirSync(path);
            files.forEach((file) => {
              if (fs.statSync(path + "/" + file).isDirectory()) {
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
      }
    },
  };
};
