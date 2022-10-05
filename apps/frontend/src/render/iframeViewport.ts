import codelloApi from "../router";

interface viewportConfig {
  isEditor: boolean;
}

export default class iframeViewport {
  #id: string = codelloApi.utility.generateUUID("viewport");
  #isInitialized: boolean = false;
  #onLoad: ((iframe: HTMLIFrameElement) => void)[] = [];
  #iframe: HTMLIFrameElement;
  // #iframe:
  constructor(props?: viewportConfig) {
    const iframe = codelloApi.html.createElement("iframe") as HTMLIFrameElement;
    this.#iframe = iframe;
    iframe.addEventListener("load", () => {
      this.#isInitialized = true;
      for (let i = 0; i < this.#onLoad.length; i++) {
        this.#onLoad[i](iframe);
      }
    });
  }

  get id() {
    return this.#id;
  }
  get iframe() {
    return this.#iframe;
  }
  addOnloadEvent(func: (iframe: HTMLIFrameElement) => void) {
    this.#onLoad.push(func);
  }
}
