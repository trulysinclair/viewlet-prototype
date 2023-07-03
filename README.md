# ForgeJS viewlet concept prototype

This is a prototype of a viewlet concept for ForgeJS. It uses React Roots to offer opt-in viewlets that offer an isolated React component tree wrapped in a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that can be used in any HTML page.

## Conceptual Usage

With the prototype implementation of Viewlets, you can simply import a viewlet to your HTML page and use it as a custom element. The viewlet will be rendered in the shadow DOM of the custom element, so it will not interfere with the rest of the page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Viewer Prototype</title>
  </head>
  <body class="grid grid-cols-2">
    <titlebar-element class="w-full justify-center items-center"></titlebar-element>
    <sidebar-element class="w-full justify-center items-center"></sidebar-element>

    <custom-element namer="test" class="w-full justify-center items-center"></custom-element>
    <demo-applet class="w-full justify-center items-center"></demo-applet>
    <statusbar-element class="w-full justify-center items-center"></statusbar-element>

    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Viewlet

A viewlet is a React component that is wrapped in a Web Component. The viewlet is rendered in the shadow DOM of the Web Component, so it will not interfere with the rest of the page. In order to create a Viewlet, you must extend the `Viewlet` class and implement the `render` method.

```tsx
class TitleBarElement extends AbstractViewlet {
  constructor() {
    super();
    this.strictModeEnabled = true; // default
  }

  render = () => {
    return <App name="Titlebar" />;
  };
}

customElements.define("titlebar-element", TitleBarElement);
```

Here you can see an example of a viewlet that renders a React component called `App` in the shadow DOM of the custom element. The `App` component is a simple React component that renders a title and a button. This is entirely opt-in, so you can have a single `root-element` that renders your entire application, or you can have multiple viewlets that render different parts of your application.

### Strict Mode

By default, the viewlet will be rendered in strict mode. This means that the viewlet will be rendered into a `StrictMode` React root. This is useful if you want to have multiple viewlets that are not connected to each other. If you want to you can disable strict mode by setting the `strictModeEnabled` property to `false` in the constructor of your viewlet.

### Styles (and Tailwind support)

The viewlet will automatically load the styles from the Document that it is used in. This means that you can use Tailwind classes in your viewlet. The styles will be scoped to the shadow DOM of the custom element, so they will not interfere with the rest of the page.

At the moment, with the `AbstractViewlet.#adoptDocumentStyleSheets()` method interally which iterates over all the stylesheets in the document and adds them to the shadow DOM of the custom element. This is not ideal, because it will also add stylesheets that are not used in the viewlet. This will be fixed in the future. 