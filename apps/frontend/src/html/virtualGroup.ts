import codelloApi from "../router";
import { VirtualGroupBase } from "../interfaces/html";

export interface VirtualGroupBaseProps {
  domElements?: VirtualGroupBase["domElements"];
  type: VirtualGroupBase["type"];
  id?: VirtualGroupBase["id"];
  refferenceGroup?: VirtualGroupBase["refferenceGroup"]; // self refference
  extension?: VirtualGroupBase["extension"];
}

export class virtualGroup implements VirtualGroupBase {
  domElements: VirtualGroupBase["domElements"] = {};
  parentVirtualdomElementId: VirtualGroupBase["parentVirtualdomElementId"];
  #type: VirtualGroupBase["type"];
  refferenceGroup: VirtualGroupBase["refferenceGroup"];
  extension: VirtualGroupBase["extension"];
  #id: VirtualGroupBase["id"];

  constructor(
    { domElements, type, extension, id }: VirtualGroupBaseProps,
    parentVirtualdomElementId: virtualGroup["parentVirtualdomElementId"] = null
  ) {
    //Todo add error handling IF type is not one of valid
    this.#type = type;

    this.#id = id !== undefined ? id : codelloApi.utility.generateUUID(type);

    this.refferenceGroup = this;
    //If domElements is not object
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
