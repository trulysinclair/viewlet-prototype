import AbstractViewlet from "../lib/AbstractViewlet";

const sidebarName = "sidebar";

class SideBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.className = "bg-neutral-700 border-r border-neutral-900";
  }

  render = () => {
    return <div style={{ width: 60 }}>{sidebarName}</div>;
  };
}

customElements.define("sidebar-element", SideBarElement);
