 const sleep = `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));`;

const enqueue = `const enqueue = (array, item) => { array.unshift(item); }`;
const dequeue = `const dequeue = (array) => array.pop();`;

const channel = `const channel = () => ({
  closed: false, messages: [], takers: [], putters: [], peekers: []
});`;

const channelSimple = `const channel = () => ({
  messages: [], takers: [], putters: []
});`;

const processSimple = `const process = async function (input, output) {
  while(true) {
    const value = await take(input);
    const newValue = await useValue(value);
    await put(output, newValue);
  }
};`;

const put = `const put = (ch, msg) => new Promise((resolve) => {
  if (ch.closed) { throw new Error('writing to closed channel'); }
  enqueue(ch.messages, msg);
  enqueue(ch.putters, resolve);
  ch.peekers.forEach(peeker => peeker());
  ch.peekers = [];
  if (ch.takers.length) {
    dequeue(ch.putters)();
    dequeue(ch.takers)(dequeue(ch.messages));
  }
});`;

const putSimple = `const put = (ch, msg) => new Promise((resolve) => {
  enqueue(ch.messages, msg);
  enqueue(ch.putters, resolve);
  if (ch.takers.length) {
    dequeue(ch.putters)();
    dequeue(ch.takers)(dequeue(ch.messages));
  }
});`;

const take = `const take = (ch) => new Promise((resolve) => {
  if (ch.closed && ch.putters.length === 0) {
    resolve({ __DONE__: true });
  }

  enqueue(ch.takers, resolve);
  if (ch.putters.length) {
    dequeue(ch.putters)();
    dequeue(ch.takers)(dequeue(ch.messages));
  }
});`;

const takeSimple = `const take = (ch) => new Promise((resolve) => {
  enqueue(ch.takers, resolve);
  if (ch.putters.length) {
    dequeue(ch.putters)();
    dequeue(ch.takers)(dequeue(ch.messages));
  }
});`;

const peek = `const peek = (ch) => new Promise((resolve) => {
  if (ch.putters.length || ch.closed) { resolve(); }
  else { enqueue(ch.peekers, resolve); }
});`;

const close = `const close = (ch) => new Promise((resolve) => {
  if (!ch.closed) {
    ch.closed = true;
    if (!ch.putters.length) {
      while(ch.takers.length) {
        dequeue(ch.takers)({ __DONE__: true });
      }
    }
  }
  resolve();
});`;

const select = `const select = (channels) => Promise.race(
  Object.entries(channels).map(
    ([name, channel]) => peek(channel).then(() => name)
  )
).then(winner => {
  return take(channels[winner])
    .then(value => ({ [winner]: value }));
});`;

const until = `async function until(channel, callback) {
  const noValue = Symbol('don\`t stop');
  let value = noValue;
  take(channel).then(v => { value = v; });
  while (value === noValue) {
    await callback();
  }
}`;

const player = `async function player(name, game) {
  while (true) {
    const { opponentsMove, gameShouldEnd } = await select({
      opponentsMove: game.turns,
      gameShouldEnd: game.end
    });

    if (opponentsMove) {
      console.log(opponentsMove);
    }

    if (gameShouldEnd) {
      console.log('Game Over');
      return gameShouldEnd;
    }

    await sleep(2000);
    await put(game.turns, name);
  }
}`;

const playerSelectSimple =
`async function player(name, { turns, end }) {
  while (true) {
    const { enemyMove, endFlag } = await select({
      enemyMove: turns, endFlag: end
    });

    if (enemyMove) { console.log(enemyMove); }
    else if (endFlag) {
      console.log('Game Over');
      return;
    }
    await sleep(2000);
    await put(game.turns, name);
  }
}`;

const playerSimple = `async function player(name, ch) {
  while (true) {
    const enemyMove = await take(ch);
    console.log(enemyMove);
    await sleep(2000);
    await put(ch, name);
  }}`;

const game = `async function timedGame(ms) {
  const _game = { turns: channel(), end: channel() };
  const ping = player('ping', _game);
  const pong = player('pong', _game);

  await put(_game.turns, 'ping');
  await sleep(ms);
  await put(_game.end, true);
}`;

const gameSimple = `async function pingPong(ms) {
  const ch = channel();
  const ping = player('ping', ch);
  const pong = player('pong', ch);
  await put(ch, '');
}`;

export default {
  sleep,
  enqueue,
  dequeue,
  channel,
  channelSimple,
  put,
  putSimple,
  take,
  takeSimple,
  peek,
  close,
  select,
  until,
  player,
  playerSimple,
  game,
  gameSimple,
  processSimple,
  playerSelectSimple,
};
