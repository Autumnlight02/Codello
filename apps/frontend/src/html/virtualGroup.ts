import codelloApi from "../router";
import { ErrorInterface } from "../interfaces/error";
import { codelloHTMLElement } from "../interfaces/html";

export interface VirtualGroupBaseProps {
  type: virtualGroupBase["type"];
  id?: virtualGroupBase["id"];
  extension?: virtualGroupBase["extension"];
}

export class virtualGroupBase {
  domElements: {
    [htmlRendererId: string]: codelloHTMLElement[];
  } = {};
  parentVirtualdomElementId: virtualGroupBase["id"] | null;
  #type: "component" | "element" | "text" | string;
  extension: {
    [extensionId: string]: {
      [key: string]: any;
    };
  };
  #id: `${virtualGroupBase["type"]}-${string}` | string;

  constructor(
    { type, extension, id }: VirtualGroupBaseProps,
    parentVirtualdomElementId: virtualGroupBase["parentVirtualdomElementId"] = null
  ) {
    type = type.trim() as virtualGroupBase["type"];
    if (type === "element" || type === "component" || type === "text") {
    } else {
      throw [
        "error",
        'virtualGroup could not be created since the type is invalid, please make sure that the type is either "element" or "text" or "component"',
        { type, extension, id, parentVirtualdomElementId },
        "todo",
      ] as ErrorInterface;
    }

    this.#type = type;

    this.#id =
      id !== undefined
        ? id
        : (codelloApi.v1.utility.generateUUID(type) as virtualGroupBase["id"]);

    // this.refferenceGroup = this;

    this.parentVirtualdomElementId =
      parentVirtualdomElementId !== undefined
        ? parentVirtualdomElementId
        : null;

    //If extension is not object
    this.extension = extension !== undefined ? extension : {};
  }
  get render() {
    return undefined;
  }

  get type() {
    return this.#type;
  }
  get id() {
    return this.#id;
  }
}
