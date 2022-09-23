interface CodelloApi {
  v1: CodelloApiV1;
}
interface CodelloApiV1 {
  html: html;
  css: css;
  utility: utility;
  dictionarys: dictionarys;
}
interface html {
  element: (props: virtualElementGroupProps) => virtualElementGroup; // is class
  text: (props: virtualTextGroupProps) => virtualTextGroup;
}
interface css {}

interface utility {
  uuid: (prefix: string) => string;
}
interface dictionarys {}

interface virtualElementGroupProps {
  tagName: string;
  attributes?: { [key: string]: string[] };
  children?: virtualElementGroup[];
  id?: string;
  extension?: { [key: string]: string[] };
}

interface virtualTextGroupProps {}
interface virtualTextGroup {}

interface virtualGroupBase {}

interface virtualElementGroup {
  tagName: string;
  id: string; //readonly
  type: "element"; //readonly
  refferencegroup: virtualElementGroup; // this refference
  domElements: { [viewportId: string]: HTMLElement[] }; //readonly
  parentVirtualDomId: string | null;
  extension: {
    get: (extensionId: string, key: string) => boolean;
    set: (extensionId: string, key: string, value: string) => boolean;
    delete: (extensionId: string, key: string) => boolean;
  };

  classList: {
    length: number; //readonly
    add: (className: string) => boolean | ErrorInterface;
    remove: (className: string) => boolean | ErrorInterface;
    at: (index: number) => string | undefined;
    toggle: (className: string) => boolean | ErrorInterface;
    contains: (className: string) => boolean;
    replace: (
      className: string,
      newClassName: string
    ) => boolean | ErrorInterface;
    getAll: () => string[]; // returns frozen copy
  };
  attributes: {
    length: number; //readonly
    getAll: () => { [key: string]: string[]; class: string[] }; // returns frozen copy
    get: (key: string) => any | ErrorInterface; //returns any since extensions can hook into specific attribute calls and return whatever
    set: (key: string, value: string) => boolean | ErrorInterface;
    delete: (key: string) => boolean | ErrorInterface;
  };

  // adding individual events / or depending on where you do it on all elements
  events: {
    add: (
      on: elementEventTypes, // which action
      run: "before" | "after", //action
      event: (data: {
        // event function
        eventType: string;
        action?: "get" | "set" | "delete";
        previousValue: any;
        newValue?: any;
      }) => any // can prevent action if run before
    ) => boolean; // if it worked
    delete: (eventObject: Function) => boolean;
  };
}

type elementEventTypes =
  | "TagNameChange"
  | "ParentAdd"
  | "ParentChange"
  | "ParentRemove"
  | "DomElementsAdd"
  | "DomElementsChange"
  | "DomElementsRemove"
  | "ExtensionSet"
  | "ExtensionChange"
  | "ExtensionGet"
  | "ExtensionDelete"
  | "classListAdd"
  | "classListChange"
  | "classListDelete"
  | "classListAt"
  | "classListToggle"
  | "classListContains"
  | "classListReplace"
  | "classListGetAll"
  | "attributesChange"
  | "attributesGetAll"
  | "attributesGet"
  | "attributesSet"
  | "attributesDelete"
  | "eventsAdd"
  | "eventsRemove"
  | "eventRun"
  | "any";

// error interface in the case of an extension preventing the action
type ErrorInterface = ["error", string, any, string];
