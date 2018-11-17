const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const enqueue = (array, item) => { array.unshift(item); }
const dequeue = (array) => array.pop();

const channel = () => ({
  closed: false, messages: [], takers: [], putters: [], peekers: []
});

const put = (ch, msg) => new Promise((resolve) => {
  if (ch.closed) { throw new Error('writing to closed channel'); }
  enqueue(ch.messages, msg);
  enqueue(ch.putters, resolve);
  ch.peekers.forEach(peeker => peeker());
  ch.peekers = [];
  if (ch.takers.length) {
    dequeue(ch.putters)();
    dequeue(ch.takers)(dequeue(ch.messages));
  }
});

const take = (ch) => new Promise((resolve) => {
  if (ch.closed && ch.putters.length === 0) {
    resolve({ __DONE__: true });
  }

  enqueue(ch.takers, resolve);
  if (ch.putters.length) {
    dequeue(ch.putters)();
    dequeue(ch.takers)(dequeue(ch.messages));
  }
});

const peek = (ch) => new Promise((resolve) => {
  if (ch.putters.length || ch.closed) { resolve(); }
  else { enqueue(ch.peekers, resolve); }
});

const close = (ch) => new Promise((resolve) => {
  if (ch.closed) { resolve(); }

  ch.closed = true;
  if (!ch.putters.length) {
    while(ch.takers.length) {
      dequeue(ch.takers)({ __DONE__: true });
    }
  }
  resolve();
});

const select = (channels) => Promise.race(
  Object.entries(channels).map(
    ([name, channel]) => peek(channel).then(() => name)
  )
).then(winner => {
  return take(channels[winner])
    .then(value => ({ [winner]: value }));
});

async function until(channel, callback) {
  const noValue = Symbol('don`t stop');
  let value = noValue;
  take(channel).then(v => { value = v; });
  while (value === noValue) {
    await callback();
  }
}

export default () => {
  const ch = channel();
  return {
    put: put.bind(null, ch),
    take: take.bind(null, ch),
    close: close.bind(ch)
  };
};

export {
  channel, put, take, close, select, until
};
