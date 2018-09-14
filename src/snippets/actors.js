const inefficientActor = `function actor(handler, initialState = {}) {
  const queue = [];
  let state = initialState;

  (function loop() {
    const event = dequeue(queue);
    if (event !== undefined) {
      state = handler(state, event);
    }
    setTimeout(loop);
  }());

  return {
    send(message) {
      enqueue(queue, message);
    }
  };
};`;

const eventActors =`const mailbox = new EventEmitter();

const actor = (handler, initialState = {}) => {
  const id = Symbol();
  let state = initialState;

  mailbox.on(id, (event) => {
    state = handler(state, event);
  });

  return {
    send(msg) { mailbox.emit(id, msg); }
  };
};`;

const workerActorsMain = `// main.js
const actor = new Worker('/worker.js');
actor.onmessage = (message) => {
  setTimeout(() => {
    actor.postMessage('ping');
  }, 2000);
};
actor.postMessage('ping');`;

const workerActorsWorker = `// worker.js
self.onmessage = (message) => {
  setTimeout(() => {
    self.postMessage('pong');
  }, 2000);
};`;

const observableActor =
`const worker = new Worker('/worker.js');
let worker$ = Rx.Observable.fromEvent(worker, 'message');
worker$
   .map(event => event.data)
   .subscribe(msg => {
     console.log(msg);
     worker.postMessage('ping');
    });
`;

export default {
  inefficientActor,
  eventActors,
  workerActorsMain,
  workerActorsWorker,
  observableActor,
}
