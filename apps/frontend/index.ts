import codelloApi from "./src/router";

console.log("hello world");
const element = new codelloApi.v1.html.element({
  tagName: "div",
  id: "element-001",
});
const element2 = new codelloApi.v1.html.element({
  tagName: "div",
  id: "element-002",
});



element.children.append("element-002");

// new codelloApi.viewport();

// const renderFrame = new codelloApi.render.html("element", "element-001");
// document.body.appendChild(renderFrame.containerElement);

//@ts-ignore
// window.ele = ele;
//@ts-ignore
// window.codelloApi = codelloApi;
// console.log(ele);
