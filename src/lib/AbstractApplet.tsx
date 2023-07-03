abstract class AbstractApplet extends HTMLElement {
  // #reactDomRoot?: ReactDOM.Root;
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
    // this.#reactDomRoot = ReactDOM.createRoot(this.shadowRoot as ShadowRoot);
    this.#adoptDocumentStyleSheets();

    // if (window.self !== window.top) {
    //   this.shadowRoot?.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     // stop clicks from passing through
    //   });

    //   alert("Applet");
    // }

    if (window.self !== window.top)
      console.log("SubApplet");
    else
      console.log("Applet");
  }

  connectedCallback() {
    this.classList.add("flex");
    this.classList.add("flex-col");

    if (this.shadowRoot)
      this.shadowRoot.innerHTML = "<iframe src='http://localhost:5173/' class='w-full h-full' />";
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

export default AbstractApplet;
