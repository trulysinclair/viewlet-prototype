import App from "./ViewletA.tsx";
import "./index.css";
import AbstractViewlet from "./lib/AbstractViewlet.tsx";

class TitleBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.strictModeEnabled = true;
  }

  render = () => {
    return <App name="Titlebar" />;
  };
}

class StatusBarElement extends AbstractViewlet {
  constructor() {
    super();
  }

  render: () => React.ReactNode = () => {
    return <App name="Statusbar" />;
  };
}

class SideBarElement extends AbstractViewlet {
  constructor() {
    super();
  }

  render = () => {
    return <App name="Sidebar" />;
  };
}

// export default class extends Viewlet {
class CustomElement extends AbstractViewlet {
  constructor() {
    super();
  }

  render = () => {
    return <App name="Custom" />;
  };
}

customElements.define("titlebar-element", TitleBarElement);
customElements.define("sidebar-element", SideBarElement);
customElements.define("custom-element", CustomElement);
customElements.define("statusbar-element", StatusBarElement);
