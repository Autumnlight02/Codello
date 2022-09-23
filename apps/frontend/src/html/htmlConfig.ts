// const htmlConfig: HTMLConfig = {
//   elementsWithNoChildren: {
//     textContent: true,
//     script: true,
//     area: true,
//     base: true,
//     br: true,
//     col: true,
//     command: true,
//     embed: true,
//     hr: true,
//     img: true,
//     input: true,
//     keygen: true,
//     link: true,
//     meta: true,
//     param: true,
//     source: true,
//     track: true,
//     wbr: true,
//   },
//   attributeConfig: {
//     class: function (elementObject, element, attributeKey, attributeValue) {
//       // if (attributeKey === "class") {
//       //   let renderedClassNames = "";
//       //   for (let i = 0, l = elementObject.attributes["class"].length; i < l; i++) {
//       //     //TODO ADD ELEMENT TO ALL SELECTORS
//       //     /*           console.log(codelloApi.dictionary.idSelectorDictionary);
//       //      */
//       //     /*  renderedClassNames +=
//       //       codelloApi.dictionary.idSelectorDictionary[elementObject.attributes.class[i]].selector.slice(1) + " "; */
//       //     //TODO enable this line on top back for class rendering
//       //   }
//       //   element.setAttribute("class", renderedClassNames.slice(0, -1));
//       // }
//     },
//     "": function (elementObject, element, attributeKey, attributeValue) {},
//     onclick: function (elementObject, element, attributeKey, attributeValue) {
//       // if (codelloApi.userConfig.userSettings.runScriptsInEditor === true) {
//       //   element.setAttribute(attributeKey, attributeValue.join(""));
//       // } else {
//       //   element.setAttribute(
//       //     attributeKey,
//       //     "console.log('This function is currently deactivated, to enable it allow runScriptsInEditor')"
//       //     //TODO add this to the notification system
//       //   );
//       // }
//     },
//     test: function (test, a, b, c) {},
//   },
// };
// export interface HTMLConfig {
//   elementsWithNoChildren: {};
//   attributeConfig: {
//     [attributeKey: string]: (
//       elementObject: any, //VirtualDomElement,
//       element: Element,
//       attributeKey: string,
//       attributeValue: string[]
//     ) => any;
//   };
// }

import { virtualElementGroup } from "../interfaces/html";
import { ErrorInterface } from "../interfaces/error";

//todo add attributes all middleware

export interface HTMLConfig {
  voidTags: {};
  attributeConfig: {
    [attributeKey: string]: {
      get?: (virtualElementGroup: virtualElementGroup) => any | ErrorInterface;
      set?: (
        virtualElementGroup: virtualElementGroup,
        value: string
      ) => boolean | ErrorInterface;
      delete?: (
        virtualElementGroup: virtualElementGroup
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
      get: (virtualElementGroup) => {},
    },
    // class: function (elementObject, element, attributeKey, attributeValue) {},
    // "": function (elementObject, element, attributeKey, attributeValue) {},
    // onclick: function (elementObject, element, attributeKey, attributeValue) {},
    // test: function (test, a, b, c) {},
  },
};

export default htmlConfig;
