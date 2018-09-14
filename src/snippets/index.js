const onetimeCallbacks = (
`setTimeout(function () {
  console.log('Hello World!');
}, 1000);

ajax('/data', (data) => {
  view.update(data);
});
`);

const eventCallbacks = (
`setInterval(() => console.log('around each second'), 1000);

button.addEventListener('click', function (event) {
  notifications.flash('Hello world!');
});

app.get('/hello', (req, res) => {
  res.send('Hello world!');
});`);

const nestedCallbacks = (`function pollTopPlayerProfile() {
  ajax('/gamesite', (error, gameSite) => {
    ajax('/dota2', (error, dota2) => {
      ajax('/scoreboard', (error, topScores) => {
        ajax(\`/profile/\${topScores[0].userId}\`, (player) =>
          renderTopPlayer(player)
        );
      });
    });
  });
}`);

const usingEvents = (
`const mailbox = new eventEmitter();

mailbox.on('message', () => console.log('📩 message!'));

mailbox.emit('message', payload);
`);

const timeoutLoop = (
`(function nonBlockingInifinateLoop() {
  setTimeout(() => {
    console.log('loop!');
    nonBlockingInifinateLoop();
  }, 0);
}());`);

const promises = `function dataView() {
  fetch('/data')
    .then(res => res.json())
    .then(validate) // might reject
    .catch(useDefaultData)
    .then(render)
};`;

const promiseOperations = (
`//Fan-out
const answer = Promise.resolve(42);
const mult = answer.then(x => x * 2);
const div = answer.then(x => x / 2);

//Fan-in
Promise.all([fetch('/this'), fetch('/that')]);

//Race
Promise.race([fetch('/stuff'), orTimeout()]);`);

const asyncAwait = `async function dataView() {
    let data;
    try {
      const response = await fetch('/data');
      data = await response.json();
      validate(data); // might throw
    } catch (error) {
      data = defaultData;
    }
    render(data);
  }
}`;

const generators = `function* numbersGenerator() {
  let n = 0;
   while (true) {
    yield n;
    n += 1;
  }
};`;

const asyncGenerators = `async function* () {
  while (true) {
    yield fetch('/data');
  }
}`

const observables = `function pollData() {
  interval(5000)
    .pipe(concatMap(() => from(fetch('/data'))
      .pipe(map(response => response.json()))))
    .pipe(filter(data => data.done === true))
    .pipe(take(1))
    .subscribe(updateDataView);
}`;

const commonSchedulers = `function () {
  setTimeout(log('TIMEOUT'), 0);
  Promise.resolve().then(log('PROMISE'));
  console.log('SYNC');
}`;

const browserSchedulers = `setTimeout(() => console.log('⏳ My time has come!'));

requestAnimationFrame(
  () => console.log('🎨 I'm an artist!'));

requestIdleCallback(
  () => console.log('📩 Don't stay idle!'));`;

const nodeSchedulers = (
`setTimeout(() => console.log('⏳ Do it now!'));

setImmediate(() => console.log('⚠️ on every tick'));

fs.readFile(() => console.log('🦄 doing some I/O'));

process.nextTick(() => console.log('🤘 microtasks'));`);

const infiniteLoop = `/* async */ function main() {
  while (true) {}
}`;

const infiniteRecursion = `function main() {
  return main(); // with tail calls optimization
}`;

const infinitePromises = `function main() {
    Promise.resolve()
      .then(main);
}`;

const eventEmitter = `const eventEmitter = () => {
  const handlers = [];

  const send = msg => handlers.forEach(
    handler => setTimeout(() => handler(msg)));

  const onMessage = (handler) => {
    handlers.push(handler)
  };

  return { send, receive };
};`


export default {
  onetimeCallbacks,
  eventCallbacks,
  nestedCallbacks,
  promises,
  promiseOperations,
  asyncAwait,
  generators,
  asyncGenerators,
  observables,
  commonSchedulers,
  browserSchedulers,
  nodeSchedulers,
  infiniteLoop,
  infiniteRecursion,
  infinitePromises,
  timeoutLoop,
  eventEmitter,
  usingEvents
};
