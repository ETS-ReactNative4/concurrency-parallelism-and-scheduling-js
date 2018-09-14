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

async function player(name, game) {
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
}

async function timedGame(ms) {
  const _game = { turns: channel(), end: channel() };
  const ping = player('ping', _game);
  const pong = player('pong', _game);

  await put(_game.turns, 'ping');
  await sleep(ms);
  await put(_game.end, true);
}

const ch = channel();
async function playerX(name) {
    while(true) {
        const message = await take(ch);
        console.log(message);
        await put(ch, name);
    }
}
