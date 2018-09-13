
Producer-Consumer
  Using threads
  Using the event loop





function makeService() {
  const queue = [];
  const interval = setInterval(() => {
    console.log('pushing', queue.length, queue);
    queue.push(queue.length);
  }, 3000);

  function* makeGenerator() {
    let stopped = false;
    while (true) {
      const next = queue.splice(0, 1)[0] || null;
      console.log('consuming', next, queue);
      let stopSignal = yield next;
      if (!stopped && stopSignal && stopSignal.stop === true) {
        clearInterval(interval);
        stopped = true;
      }
      if (stopped && queue.length === 0) {
        return null;
      }
  }
}

  const service =  makeGenerator();
  return { service, getQueue() { return queue; } };
}

const { service, getQueue } = makeService();
function main() {
  for (let i = 0; i<5; i+=1) {
    console.log(service.next());
  }
}

const timeout = ms => new Promise(resolve => setTimeout(resolve), ms);
