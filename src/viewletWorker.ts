self.onmessage = (event) => {
  console.log("viewlet worker onmessage");

  console.dir(event);
  self.postMessage(
    "hello from viewlet worker",
  );
};

self.postMessage("hello from viewlet worker");
