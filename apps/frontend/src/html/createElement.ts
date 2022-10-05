// a speed component to cache html elements and create them faster
//https://jsbench.me/utl4rba3k7 test has a small error on iteration 1 but its negletable.

const tagNames: { [key: string]: HTMLElement } = {};
export default function createElement(tagName: string) {
  const element = tagNames[tagName];
  if (element !== undefined) {
    return element;
  }
  const newElement = document.createElement(tagName);
  tagNames[tagName] = newElement;
  return newElement;
}
