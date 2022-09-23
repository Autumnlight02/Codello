const fs = require("fs");
const path = __dirname + "/src/components/";

const components = fs.readdirSync(path);

let finalFileString = "";
for (let i = 0; i < components.length; i++) {
  if (components[i].indexOf(".svelte") === -1) continue;
  const componentName = components[i].slice(
    0,
    components[i].indexOf(".svelte")
  );
  finalFileString += `import ${componentName} from "./components/${components[i]}" \n`;
}

fs.writeFileSync(__dirname + "/src/index.js", finalFileString);
