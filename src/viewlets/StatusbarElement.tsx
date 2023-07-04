import AbstractViewlet from "../lib/AbstractViewlet";

class StatusBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.className = "bg-blue-500 border-t border-neutral-900";
  }

  render: () => React.ReactNode = () => {
    return <div className="w-full">Statusbar</div>;
  };
}

customElements.define("statusbar-element", StatusBarElement);
