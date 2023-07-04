import App from "./App.tsx";
import "./index.css";
import AbstractApplet from "./lib/AbstractApplet.tsx";
import AbstractViewlet from "./lib/AbstractViewlet.tsx";

class TitleBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.strictModeEnabled = true;
    this.className="bg-neutral-700 border-b border-neutral-900"
  }

  render = () => {
    return <div className="w-full">Titlebar</div>;
  };
}

class DemoApplet extends AbstractApplet {
  constructor() {
    super();
    this.className="bg-neutral-50"
  }
}

class StatusBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.className="bg-blue-500 border-t border-neutral-900"
  }

  render: () => React.ReactNode = () => {
    return <div className="w-full">Statusbar</div>;
  };
}

class SideBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.className="bg-neutral-700 border-r border-neutral-900"
  }

  render = () => {
    return <div style={{ width: 60 }}>Sidebar</div>;
  };
}

// export default class extends Viewlet {
class CustomElement extends AbstractViewlet {
  constructor() {
    super();
    this.className="grow flex items-center justify-center flex-col bg-neutral-600"
  }

  render = () => {
    return <App name="Custom" />;
  };
}

customElements.define("titlebar-element", TitleBarElement);
customElements.define("sidebar-element", SideBarElement);
customElements.define("custom-element", CustomElement);
customElements.define("statusbar-element", StatusBarElement);
customElements.define("demo-applet", DemoApplet);
