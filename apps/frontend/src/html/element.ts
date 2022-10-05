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
  type?: "element";
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
    data.tagName = data.tagName.trim();
    if (typeof data.tagName !== "string" || data.tagName.length === 0) {
      throw [
        "error",
        "element could not be created since the tagName is invalid, please make sure that the type of the tagName is string and that the length is not 0",
        data,
        "todo",
      ] as ErrorInterface;
    }
    //todo if the tagname is either c_txt or c_comp then error out due to reserved element types

    data.type = "element";
    super(data as props, undefined);
    codelloApi.dictionary.get["idElementDictionary"][this.id] = this;

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
  #render() {}
  get render() {
    return this.#render;
  }
}

interface Attributes {
  [key: string]: string[] | string;
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
      codelloApi.utility.deepCopy(this.#attributes)
    ) as Attributes;
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
      this.#attributes[key] = value;
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
    const classes = codelloApi.utility.deepCopy(
      this.#attributeBind["class"]
    ) as string[];
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
  indexOf(id: string | string[]): number | { [id: string]: number } {
    const children = this.#children;
    if (Array.isArray(id)) {
      const entries: { [id: string]: number } = {};
      for (let i = 0; i < id.length; i++) {
        entries[id[i]] = -1;
      }
      for (let i = 0; i < children.length; i++) {
        if (entries[children[i].id] !== undefined) entries[children[i].id] = i;
      }
      return entries;
    } else {
      for (let i = 0; i < children.length; i++) {
        if (children[i].id === id) return i;
      }
      return -1;
    }
  }
  // append(id: string | string[]):boolean | ErrorInterface {
  //   if (Array.isArray(id)) {

  //   } else {

  //   }
  // }

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
  get id(): `element-${string}`;
}

//TODO replace
function convertClassNameToSelectorId(string: string) {
  return string;
}
function convertSelectorIdToClass(string: string) {
  return string;
}
