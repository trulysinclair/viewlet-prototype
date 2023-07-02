import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

class CustomElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const mountPoint = document.createElement("span");

    const sheets = document.styleSheets;
    mountPoint.classList.add("w-full")
    console.group("sheets");
    console.log(sheets);

    this.classList.add("flex");

    Array.from(sheets).forEach((sheet) => {
      console.group("sheet");
      console.log(sheet);
      if (sheet.href) {
        console.group("sheet.href");
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = sheet.href;
        shadowRoot.appendChild(link);
        console.groupEnd();
      } else {
        console.group("sheet.cssRules");
        Array.from(sheet.cssRules).forEach((rule) => {
          console.group("rule");
          console.log(rule);
          const sht = new CSSStyleSheet();
          sht.insertRule(rule.cssText);

          console.log(sht);

          shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sht];

          console.log("adoptedStyleSheets");
          console.log(shadowRoot.adoptedStyleSheets);
          console.groupEnd();
        });
        console.groupEnd();
      }
      console.groupEnd();
    });

    console.log("adoptedStyleSheets");
    console.log(shadowRoot.adoptedStyleSheets);

    shadowRoot.appendChild(mountPoint);
    ReactDOM.createRoot(
      mountPoint,
    ).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );

    console.groupEnd();
  }
}

customElements.define("custom-element", CustomElement);
