interface VirtualGroupBaseProps {
  domElements?: VirtualGroupBase["domElements"];
  type: VirtualGroupBase["type"];
  id?: VirtualGroupBase["id"];
  refferenceGroup?: VirtualGroupBase["refferenceGroup"]; // self refference
  extension?: VirtualGroupBase["extension"];
}

export interface codelloHTMLElement {}

export type virtualGroup =
  | virtualTextGroup
  | virtualComponentGroup
  | virtualElementGroup;

export interface VirtualGroupBase {
  type: "component" | "element" | "text";
  domElements: {
    [viewportId: string]: codelloHTMLElement[];
  };
  id: string;
  parentVirtualdomElementId: string | null;
  refferenceGroup: virtualGroup; // self refference
  extension: {
    [extensionId: string]: {
      [key: string]: any;
    };
  };
}

export interface virtualTextGroup extends VirtualGroupBase {
  type: "text";
  variablekey: string | null;
  translationKey: string | null;
  text: string;
}

export interface virtualComponentGroup extends VirtualGroupBase {
  //TODO
}

export interface virtualElementGroup extends VirtualGroupBase {
  type: "element";
  tagName: string; // what is the tagName of the element
  // #attributes: { [key: string]: string[]; class: string[] }
  children: virtualGroup[];
}
