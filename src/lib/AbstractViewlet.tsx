import React from "react";
import ReactDOM from "react-dom/client";

abstract class AbstractViewlet extends HTMLElement {
  #reactDomRoot?: ReactDOM.Root;
  static get observedAttributes() {
    return ["namer"];
  }

  protected strictModeEnabled?: boolean = true;

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#reactDomRoot = ReactDOM.createRoot(this.shadowRoot as ShadowRoot);
    this.#adoptDocumentStyleSheets();
  }

  /**
   * Renders the element into the React Shadow DOM.
   *
   * Subclasses must implement this method to return a ReactNode.
   * Render is called when the element is connected to the DOM.
   * @returns
   */
  protected render: () => React.ReactNode = () => {
    return <div>Viewlet</div>;
  };

  connectedCallback() {
    this.classList.add("flex");
    this.classList.add("flex-col");

    if (this.shadowRoot && this.render && this.#reactDomRoot) {
      this.#reactDomRoot.render(
        this.strictModeEnabled
          ? (
            <React.StrictMode>
              {this.render()}
            </React.StrictMode>
          )
          : this.render(),
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
