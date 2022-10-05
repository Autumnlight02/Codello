import { ErrorInterface } from "../interfaces/error";
import { virtualElementGroup } from "../interfaces/html";

// add an .getClass(selector option to get an class by selector)
export interface dictionaryEntries {
  idBreakpointDictionary: any;
  idClassDictionary: any;
  idSelectorDictionary: any;
  selectorIdDictionary: any;
  idElementDictionary: {
    [key: virtualElementGroup["id"]]: virtualElementGroup;
  };
  idTextDictionary: any;
  idComponentDictionary: any;
  [key: string]: any;
}

export default class dictionary {
  //@ts-ignore //TODO
  #dictionarys: dictionaryEntries = { idElementDictionary: {} };
  constructor() {}
  addDictionary(dictionaryName: string): boolean | ErrorInterface {
    // checking if its a string
    if (typeof dictionaryName !== "string")
      throw [
        "error",
        "dictionary names have to be strings!",
        dictionaryName,
        "TODO",
      ];

    dictionaryName = dictionaryName.trim();

    // checking if its a private field
    if (dictionaryName.charAt(0) === "#")
      throw [
        "error",
        "dictionary names cannot start with an #, since this would declare them private and not accessible.",
        dictionaryName,
        "TODO",
      ];

    // checking if the thext is over a length of 0
    if (dictionaryName.length === 0)
      throw [
        "error",
        "dictionary names cannot be an empty string",
        dictionaryName,
        "TODO",
      ];

    // checking if the dictionary already exist, if not creating a new one
    if (this.#dictionarys[dictionaryName] === undefined) {
      this.#dictionarys[dictionaryName] = {};

      return true;
    } else {
      throw ["error", "dictionary already exists", dictionaryName, "TODO"];
    }
  }

  get get() {
    return Object.freeze({ ...this.#dictionarys });
  }
}
