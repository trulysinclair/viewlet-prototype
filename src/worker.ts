onconnect = (event) => {
  console.log("worker onconnect", event);
  const port = event.ports[0];

  port.onmessage = (event) => {
    console.log("worker onmessage", event);
    port.postMessage("hello from global worker");
  };

  port.start();
};
// console.log("custom-element-worker");

// self.onmessage = (event) => {
//   console.log("worker onmessage", event);
//   self.postMessage("hello from global worker");
// };
