import VirtualElementGroup from "../html/element";
import { virtualGroupBase } from "../html/virtualGroup";

export interface codelloHTMLElement extends HTMLElement {
  c_Ref: virtualGroup;
}

export type virtualGroup = virtualGroupBase | VirtualElementGroup;
//   | virtualTextGroup
//   | virtualComponentGroup
//   | VirtualElementGroup;

// export interface virtualTextGroup extends VirtualGroupBase {
//   type: "text";
//   variablekey: string | null;
//   translationKey: string | null;
//   text: string;
//   id: `text-${string}`;
// }

// export interface virtualComponentGroup extends VirtualGroupBase {
//   id: `component-${string}`;
//   //TODO
// }
