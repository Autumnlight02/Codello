import { ErrorInterface } from "../interfaces/error";
import VirtualElementGroup from "./element";

//todo add attributes all middleware

export interface HTMLConfig {
  voidTags: {};
  attributeConfig: {
    [attributeKey: string]: {
      get?: (VirtualElementGroup: VirtualElementGroup) => any | ErrorInterface;
      set?: (
        VirtualElementGroup: VirtualElementGroup,
        value: string
      ) => boolean | ErrorInterface;
      delete?: (
        VirtualElementGroup: VirtualElementGroup
      ) => boolean | ErrorInterface;
    };
  };
}

const htmlConfig: HTMLConfig = {
  voidTags: {
    script: true,
    area: true,
    base: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
  },
  attributeConfig: {
    class: {
      get: (VirtualElementGroup) => {},
    },
    // class: function (elementObject, element, attributeKey, attributeValue) {},
    // "": function (elementObject, element, attributeKey, attributeValue) {},
    // onclick: function (elementObject, element, attributeKey, attributeValue) {},
    // test: function (test, a, b, c) {},
  },
};

export default htmlConfig;
