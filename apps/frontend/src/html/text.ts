import { virtualGroupBase } from "./virtualGroup";

export interface TextProps {
  id?: virtualGroupBase["id"];
  extension?: virtualGroupBase["extension"];
  textContent: string;
}

interface props extends TextProps {
  type: "text";
}

export default class virtualTextGroup extends virtualGroupBase {
  #textContent: string;
  constructor(
    data: TextProps,
    parentVirtualdomElementId: virtualGroupBase["id"]
  ) {
    (data as props).type = "text";
    super(data as props, parentVirtualdomElementId);
    this.#textContent = data.textContent;
  }

  set textContent(string: string) {
    this.#textContent = string;
  }

  get textContent() {
    return this.#textContent;
  }
}

export default interface virtualTextGroup {
  get type(): "text";
  get id(): `text-${string}`;
}
