import codelloApi from "../router";
import { VirtualGroupBase } from "../interfaces/html";
import { ErrorInterface } from "../interfaces/error";

export interface VirtualGroupBaseProps {
  type: VirtualGroupBase["type"];
  domElements?: VirtualGroupBase["domElements"];
  id?: VirtualGroupBase["id"];
  // refferenceGroup?: VirtualGroupBase["refferenceGroup"]; // self refference
  extension?: VirtualGroupBase["extension"];
}

export class virtualGroup implements VirtualGroupBase {
  domElements: VirtualGroupBase["domElements"] = {};
  parentVirtualdomElementId: VirtualGroupBase["parentVirtualdomElementId"];
  #type: VirtualGroupBase["type"];
  // refferenceGroup: VirtualGroupBase["refferenceGroup"];
  extension: VirtualGroupBase["extension"];
  #id: VirtualGroupBase["id"];

  constructor(
    { domElements, type, extension, id }: VirtualGroupBaseProps,
    parentVirtualdomElementId: virtualGroup["parentVirtualdomElementId"] = null
  ) {
    type = type.trim() as virtualGroup["type"];
    if (type === "element" || type === "component" || type === "text") {
    } else {
      throw [
        "error",
        'virtualGroup could not be created since the type is invalid, please make sure that the type is either "element" or "text" or "component"',
        { domElements, type, extension, id, parentVirtualdomElementId },
        "todo",
      ] as ErrorInterface;
    }

    this.#type = type;

    this.#id =
      id !== undefined
        ? id
        : (codelloApi.utility.generateUUID(type) as VirtualGroupBase["id"]);

    // this.refferenceGroup = this;

    //If domElements is not object //TODO do i keep this?
    this.domElements = domElements !== undefined ? domElements : {};

    this.parentVirtualdomElementId =
      parentVirtualdomElementId !== undefined
        ? parentVirtualdomElementId
        : null;

    //If extension is not object
    this.extension = extension !== undefined ? extension : {};
  }

  get type() {
    return this.#type;
  }
  get id() {
    return this.#id;
  }
}
