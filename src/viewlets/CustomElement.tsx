import App from "../App";
import AbstractViewlet from "../lib/AbstractViewlet";

class CustomElement extends AbstractViewlet {
  constructor() {
    super();
    this.className = "grow flex items-center justify-center flex-col bg-neutral-600";
  }

  render = () => {
    return <App name="Custom" />;
  };
}

customElements.define("custom-element", CustomElement);
