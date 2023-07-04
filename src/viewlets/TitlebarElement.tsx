import AbstractViewlet from "../lib/AbstractViewlet";

class TitleBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.strictModeEnabled = true;
    this.className = "bg-neutral-700 border-b border-neutral-900";
  }

  render = () => {
    return <div className="w-full">Titlebar</div>;
  };
}

customElements.define("titlebar-element", TitleBarElement);
