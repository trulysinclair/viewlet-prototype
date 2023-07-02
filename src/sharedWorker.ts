onconnect = (event) => {
  const port = event.ports[0];

  port.onmessage = (event) => {
    console.log("shared worker onmessage");
    
    console.dir(event);
    port.postMessage("hello from shared worker");
  };

  port.start();
};

