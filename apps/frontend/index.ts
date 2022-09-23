import codelloApi from "./src/router";
const test = new codelloApi.html.element({
  tagName: "div",
  attributes: { test1: "test", test3: "test", test2: "test", test5: "test" },
});
test.tagN




console.log("hello world");
let ele: any[] = [];
let performanceReading: any[] = [];
for (let i = 0; i < 10000; i++) {
  const attributes = {};
  for (let i = 0; i < 5; i++) {
    attributes[codelloApi.utility.generateUUID("")] =
      codelloApi.utility.generateUUID("");
  }
  let a = performance.now();
  ele.push(new codelloApi.html.element({ tagName: "div", attributes }));
  ele.push(document.createElement("div"));
  let b = performance.now();
  performanceReading.push(b - a);
}
let final = 0;
for (let i = 0; i < performanceReading.length; i++) {
  final += performanceReading[i];
}
console.log(final);

const element = new codelloApi.html.element({
  tagName: "div",
  id: codelloApi.utility.generateUUID("element"),
});

element.tagName = "a";
element.attributes.set("test", "true");
element.attributes;
//@ts-ignore
window.test = test;

//@ts-ignore
window.ele = ele;
