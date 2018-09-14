const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const nullValue = Symbol('null value');

const enqueue = (array, item) => { array.unshift(item); }
const dequeue = (array) => array.length ? array.pop() : nullValue;

const InefficientActor = (handler) => {
  const queue = [];
  let state = {};

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
};

const mailbox = new EventEmitter();

const actor = (handler, initialState = {}) => {
  const id = Symbol();
  let state = initialState;

  mailbox.on(id, (event) => {
    state = handler(state, event);
  });

  return {
    send(msg) { mailbox.emit(id, msg); }
  };
};
