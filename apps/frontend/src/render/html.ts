import { ErrorInterface } from "../interfaces/error";
import { virtualElementGroup, virtualGroup } from "../interfaces/html";
import codelloApi from "../router";

interface htmlRenderConfig {
  isEditor: boolean;
  renderCss: boolean;
  reloadOnChange: boolean;
}

export default class html {
  static #currentViewportIteration: number = 0;
  #containerElement: HTMLElement = codelloApi.html.createElement("div");
  #rootRenderGroup: {
    type: virtualGroup["type"];
    id: virtualGroup["id"];
  };
  #renderedElements: {
    [id: virtualGroup["id"]]: true;
  } = {};
  // no normal uuid to prevent too much usage
  #id: `r${number}`;
  constructor(
    renderTargetType: virtualGroup["type"],
    renderTargetId: virtualGroup["id"],
    props?: htmlRenderConfig
  ) {
    let target;
    if (renderTargetType === "element") {
      renderTargetId = renderTargetId as virtualElementGroup["id"];
      target = codelloApi.dictionary.get["idElementDictionary"][renderTargetId];

      // } else if (renderTargetType === "text") {
      // } else if (renderTargetType === "component") {
    } else {
      throw [
        "error",
        'virtualGroup could not be created since the type is invalid, please make sure that the type is either "element" or "text" or "component"',
        { renderTargetType, renderTargetId, props },
        "todo",
      ] as ErrorInterface;
    }
    if (target === undefined) {
      throw "TODO ERROR";
    }
    target.render();

    // if (codelloApi.)
    this.#rootRenderGroup = { id: renderTargetId, type: renderTargetType };

    this.#id = ("r" + html.increaseCurrentViewportIteration()) as `r${number}`;
  }

  get containerElement() {
    return this.#containerElement;
  }

  get id() {
    return this.#id;
  }
  static get currentViewportIteration() {
    return this.#currentViewportIteration;
  }
  static increaseCurrentViewportIteration() {
    this.#currentViewportIteration += 1;
    return this.#currentViewportIteration;
  }
}
