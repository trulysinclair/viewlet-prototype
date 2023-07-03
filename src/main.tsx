import React from "react";
import ReactDOM from "react-dom/client";
import App from "./ViewletA.tsx";
import "./index.css";

const sharedWorkerThread = new SharedWorker(new URL("./sharedWorker.ts", import.meta.url), {
  type: "module",
  name: "worker-thread",
});

sharedWorkerThread.port.start();

abstract class Viewlet extends HTMLElement {
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

    sharedWorkerThread.port.onmessage = (event) => {
      console.log("sharedWorkerThread.port.onmessage");

      console.dir(event);
    };

    sharedWorkerThread.port.postMessage("Hello from browser thread");

    const viewletWorker = new Worker(new URL("./viewletWorker.ts", import.meta.url), {
      type: "module",
      name: "viewletWorker",
    });

    viewletWorker.onmessage = (event) => {
      console.log("viewletWorker.onmessage");

      console.dir(event);
    };

    viewletWorker.postMessage("Hello from browser thread");
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

class TitleBarElement extends Viewlet {
  constructor() {
    super();
  }

  protected render = () => {
    return <App name="Titlebar" />;
  };
}

class StatusBarElement extends Viewlet {
  constructor() {
    super();
  }

  protected render = () => {
    return <App name="Statusbar" />;
  };
}

class SideBarElement extends Viewlet {
  constructor() {
    super();
  }

  protected render = () => {
    return <App name="Sidebar" />;
  };
}

class CustomElement extends Viewlet {
  constructor() {
    super();
  }

  protected render = () => {
    return <App name="Custom" />;
  };
}

customElements.define("custom-element", CustomElement);
customElements.define("titlebar-element", TitleBarElement);
customElements.define("statusbar-element", StatusBarElement);
customElements.define("sidebar-element", SideBarElement);
