import React from "react";
import ReactDOM from "react-dom/client";

abstract class AbstractViewlet extends HTMLElement {
  // enable observedAttributes to get attributeChangedCallback
  static get observedAttributes() {
    return ["namer"];
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#adoptDocumentStyleSheets();

    // sharedWorkerThread.port.onmessage = (event) => {
    //   console.log("sharedWorkerThread.port.onmessage");

    //   console.dir(event);
    // };

    // sharedWorkerThread.port.postMessage("Hello from browser thread");

    // const viewletWorker = new Worker(new URL("./viewletWorker.ts", import.meta.url), {
    //   type: "module",
    //   name: "viewletWorker",
    // });

    // viewletWorker.onmessage = (event) => {
    //   console.log("viewletWorker.onmessage");

    //   console.dir(event);
    // };

    // viewletWorker.postMessage("Hello from browser thread");
  }

  protected render: () => React.ReactNode = () => {
    return <div>Viewlet</div>;
  };

  connectedCallback() {
    this.classList.add("flex");
    this.classList.add("flex-col");

    if (this.shadowRoot && this.render) {
      ReactDOM.createRoot(
        this.shadowRoot,
      ).render(
        <React.StrictMode>
          {this.render()}
        </React.StrictMode>,
      );
    }
  }

  #adoptDocumentStyleSheets() {
    const sheets = document.styleSheets;

    Array.from(sheets).forEach((sheet) => {
      if (sheet.href) {
        if (!this.shadowRoot)
          return;

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = sheet.href;

        this.shadowRoot?.appendChild(link);
      } else {
        Array.from(sheet.cssRules).forEach((rule) => {
          if (!this.shadowRoot)
            return;

          const sht = new CSSStyleSheet();
          sht.insertRule(rule.cssText);

          this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, sht];
        });
      }
    });
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  adoptedCallback() {
    console.log("adoptedCallback");
  }
}

export default AbstractViewlet;
