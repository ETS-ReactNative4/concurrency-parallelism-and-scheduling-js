let counters = {
  worker: 0,
  channel: 0
};

let port;
self.onmessage = (e) => {
  if (e.ports && e.ports[0]) {
    port = e.ports[0];
    port.start();
    port.onmessage = () => {
      counters.channel += 1;
      port.postMessage(counters.channel);
    }
  } else {
    counters.worker += 1;
    self.postMessage(counters.worker);
  }
};
