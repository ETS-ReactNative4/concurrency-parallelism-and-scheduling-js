self.onmessage = (message) => {
  console.log(message);
  setTimeout(() => {
    self.postMessage('pong');
  }, 2000);
};
