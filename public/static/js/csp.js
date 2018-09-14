const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const enqueue = (array, item) => { array.push(item); }
const dequeue = (array) => array.splice(0, 1)[0];

const _enqueue = (array, item) => { array.unshift(item); }
const _dequeue = (array) => array.pop();

const channel = () => ({
  messages: [], takers: [], putters: [], peekers: []
});

const put = (ch, msg) => new Promise((resolve) => {
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
  enqueue(ch.takers, resolve);
  if (ch.putters.length) {
    dequeue(ch.putters)();
    dequeue(ch.takers)(dequeue(ch.messages));
  }
});

const peek = (ch) => new Promise((resolve) => {
  if (ch.putters.length) { resolve(); }
  else { enqueue(ch.peekers, resolve); }
});

async function process(channel) {
  while (true) {
    const msg = await take(channel);
    const newMsg = await useTheMessage(msg);
    await put(channel, message);
  }
}

async function until(channel, callback) {
  const noValue = Symbol('don`t stop');
  let value = noValue;
  take(channel).then(v => { value = v; });
  while (value === noValue) {
    await callback();
  }
}

const selectNoPeekers = (channels) => {
  const noValue = Symbol('don`t stop');
  let finalValue = noValue;
  return Promise.race(
    Object.entries(channels).map(([name, channel]) =>
      take(channel).then((value) => {
        if (finalValue === noValue) {
          finalValue = value;
          console.log('taking', value, 'from', name);
          return ({ [name]: value });
        } else {
          put(channel, value);
          console.log(name, 'missed it, putting', value, 'back');
        }
      })
    )
  );
}

const select = (channels) => Promise.race(
  Object.entries(channels).map(
    ([name, channel]) => peek(channel).then(() => name)
  )
).then(winner => {
  return take(channels[winner])
    .then(value => ({ [winner]: value }));
});


const cache = {};
const cachedSelect = (channels) => {
  const noValue = Symbol('don`t stop');
  let finalValue = noValue;
  return Promise.race(
    Object.entries(channels).map(([name, channel]) => {
      if (!cache[name]) {
        cache[name] = take(channel).then((value) => {
          if (finalValue === noValue) {
            finalValue = value;
            console.log('taking', value, 'from', name);
            delete cache[name];
          }
          return ({ [name]: value });
        })
      }

      return cache[name];
    }))}



const hits = channel();
const misses = channel();
const stops = channel();

async function untilPing() {
  await until(stops, async () => {
    const message = await take(hits);
    console.log(message);
    await sleep(2000);
    await put(hits, 'ping');
  });
  console.log('stopped!');
}

async function untilPong() {
  await until(stops, async () => {
    const message = await take(hits);
    console.log(message);
    await sleep(2000);
    await put(hits, 'pong');
  });
  console.log('stopped!');
}

async function selectPing() {
  let stop = false;
  while (!stop) {
    const { hits: hit, stops: stop } = await select({ stops, hits });
    console.log(hit, stop);
    await sleep(2000);
    await put(hits, 'ping');
  }
}

async function selectPong() {
  let stop = false;
  while (!stop) {
    const { hits: hit, stops: stop } = await select({ stops, hits });
    console.log(hit, stop);
    await sleep(2000);
    await put(hits, 'pong');
  }
}

async function ping() {
  let stop = false;
  take(stops).then(() => { stop = true; });
  while (!stop) {
    const message = await take(hits);
    console.log(message);
    await sleep(2000);
    await put(hits, 'ping');
  }
}

async function pong() {
  let stop = false;
  take(stops).then(() => { stop = true; });
  while (!stop) {
    const message = await take(hits);
    console.log(message);
    await sleep(2000);
    await put(hits, 'pong');
  }
}

async function pang() {
  while (true) {
    const message = await take(hits);
    console.log(message);
    await sleep(2000);
    await put(hits, 'pong');
  }
}

async function pung() {
  while (true) {
    const message = await take(hits);
    console.log(message);
    await sleep(2000);
    await put(hits, 'pang');
  }
}

selectPing();
selectPong();
// pang();
put(hits, '');
