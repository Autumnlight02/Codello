import { virtualElementGroup } from "../interfaces/html";
import { virtualGroup } from "./virtualGroup";
import codelloApi from "../router";
import { ErrorInterface } from "../interfaces/error";
export interface ElementProps {
  tagName: virtualElementGroup["tagName"];
  // attributes?: virtualElementGroup["attributes"];
  attributes?: any;
  children?: virtualElementGroup["children"];
  id?: virtualElementGroup["id"];
  extension?: virtualElementGroup["extension"];
}

interface props extends ElementProps {
  type: "element";
}

export class element extends virtualGroup implements virtualElementGroup {
  #tagName: string;
  #attributes: Attributes = { class: [] };
  #attributeMethods: attributes;
  #classList = new classList(this.#attributes);
  children: virtualGroup[] = [];

  constructor(data: ElementProps) {
    const superProps: props = data as props;
    superProps.type = "element";

    super(superProps, undefined);

    //todo add errorhandling
    this.#tagName = data.tagName;
    // if (data.attributes !== undefined) this.#attributes = data.attributes
    this.#attributeMethods = new attributes(data.attributes, this);
  }

  get tagName() {
    return this.#tagName;
  }
  set tagName(tagName) {
    this.#tagName = tagName;
  }

  get classList() {
    return this.#classList;
  }

  get attributes() {
    return this.#attributeMethods;
  }
}

interface Attributes {
  [key: string]: string[];
  class: string[];
}

class attributes {
  #attributes: Attributes;
  #owningVirtualElementGroup: virtualElementGroup;
  constructor(
    attributes: Attributes,
    owningVirtualElementGroup: virtualElementGroup
  ) {
    this.#attributes = attributes !== undefined ? attributes : { class: [] };
    this.#owningVirtualElementGroup = owningVirtualElementGroup;
  }
  get length() {
    //todo figure out the fastes way to get length
    return Object.keys(this.#attributes).length;
  }

  getAll() {
    //todo add interface
    const data = codelloApi.utility.deepFreeze(
      structuredClone(this.#attributes)
    );
    return data;
  }

  get(key: string): any | ErrorInterface {
    const attributeConfig = codelloApi.html.htmlConfig.attributeConfig;

    const alternateGetter = attributeConfig[key]?.get;
    if (alternateGetter === undefined) {
      return this.#attributes[key];
    } else {
      return alternateGetter(this.#owningVirtualElementGroup);
    }
  }
  set(key: string, value: string): boolean | ErrorInterface {
    const attributeConfig = codelloApi.html.htmlConfig.attributeConfig;

    const alternateGetter = attributeConfig[key]?.set;
    if (alternateGetter === undefined) {
      this.#attributes[key] = [value];
      return true;
    } else {
      return alternateGetter(this.#owningVirtualElementGroup, value);
    }
  }
  delete(key: string): boolean | ErrorInterface {
    const attributeConfig = codelloApi.html.htmlConfig.attributeConfig;

    const alternateDeleter = attributeConfig[key]?.delete;
    if (alternateDeleter === undefined) {
      delete this.#attributes[key];
      return true;
    } else {
      return alternateDeleter(this.#owningVirtualElementGroup);
    }
  }
}

//todo add length
class classList {
  #attributeBind: Attributes;
  constructor(attributeBind: Attributes) {
    this.#attributeBind = attributeBind;
  }
  add(className: string): boolean {
    const selector = convertClassNameToSelectorId(className);
    if (this.#attributeBind["class"].indexOf(selector) === -1) {
      this.#attributeBind["class"].push(selector);
      return true;
    } else {
      return false; // should this only return false?
    }
  }
  remove(className: string): boolean {
    const selector = convertClassNameToSelectorId(className);
    const index = this.#attributeBind["class"].indexOf(selector);
    if (index === -1) {
      this.#attributeBind["class"].splice(index, 1);
    }
    return true;
  }
  at(index: number): string | undefined {
    const item = this.#attributeBind["class"].at(index);
    return item === undefined ? undefined : convertSelectorIdToClass(item);
  }
  // boolean, true if toggled, false if prevented
  toggle(className: string): boolean {
    const selector = convertClassNameToSelectorId(className);
    if (this.#attributeBind["class"].indexOf(selector) === -1) {
      this.add(className);
      return true;
    } else {
      this.remove(className);
      return false;
    }
  }
  indexOf(className: string): number {
    const selector = convertClassNameToSelectorId(className);
    return this.#attributeBind["class"].indexOf(selector);
  }
  contains(className: string): boolean {
    const selector = convertClassNameToSelectorId(className);
    return this.#attributeBind["class"].indexOf(selector) !== -1;
  }
  replace(className: string, newClassName: string): boolean | ErrorInterface {
    const newSelector = convertClassNameToSelectorId(newClassName);
    const index = this.indexOf(className);
    if (index === -1) {
      return false;
    }
    this.#attributeBind["class"][index] = newSelector;
    return true;
  }
  getAll(): string[] {
    const classes = structuredClone(this.#attributeBind["class"]);
    for (let i = 0; i < classes.length; i++) {
      classes[i] = convertClassNameToSelectorId(classes[i]);
    }
    return classes;
  }
}

class children {
  #children: element["children"];
  constructor(children: element["children"]) {
    this.#children = children !== undefined ? children : [];
  }
  getAll() {
    const copy = this.#children.concat();
    Object.freeze(copy);
    return copy;
  }
  setAll(children: element["children"]) {
    this.#children = children;
    return true;
  }
  indexOf(id: string | string[]) {}
  append(id: string | string[]) {}
  prepend(id: string | string[]) {}
  insertAt(id: string | string[], index: number) {}
}

//todo add
type childrenInterface = "";

// interface attributes {
//   get [key: string]: string[]
// }

export interface element {
  get type(): virtualElementGroup["type"];
}

//TODO replace
function convertClassNameToSelectorId(string: string) {
  return string;
}
function convertSelectorIdToClass(string: string) {
  return string;
}
