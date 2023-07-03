import App from "./ViewletA.tsx";
import "./index.css";
import AbstractViewlet from "./lib/AbstractViewlet.tsx";

// const sharedWorkerThread = new SharedWorker(new URL("./sharedWorker.ts", import.meta.url), {
//   type: "module",
//   name: "worker-thread",
// });

// sharedWorkerThread.port.start();

class TitleBarElement extends AbstractViewlet {
  constructor() {
    super();
  }

  protected render = () => {
    return <App name="Titlebar" />;
  };
}

class StatusBarElement extends AbstractViewlet {
  constructor() {
    super();
  }

  protected render = () => {
    return <App name="Statusbar" />;
  };
}

class SideBarElement extends AbstractViewlet {
  constructor() {
    super();
  }

  protected render = () => {
    return <App name="Sidebar" />;
  };
}

// export default class extends Viewlet {
class CustomElement extends AbstractViewlet {
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
