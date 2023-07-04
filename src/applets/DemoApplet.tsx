import AbstractApplet from "../lib/AbstractApplet";

class DemoApplet extends AbstractApplet {
  constructor() {
    super();
    this.className = "bg-neutral-50";
  }
}

customElements.define("demo-applet", DemoApplet);
