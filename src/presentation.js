/* eslint-disable */
// Import React
import React from 'react';

import posed from 'react-pose';
// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  Image,
  ListItem,
  List,
  Layout,
  Notes,
  Quote,
  Slide,
  Text,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');
require('prismjs/themes/prism-coy.css');
require('./overrides.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#CECECE',
    tertiary: '#03A9FC',
    quartenary: '#1F2022',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const originalProgs = (<Slide>
  <Heading size={5}>The original programmers</Heading>
  <Layout>
    <Image width="40%" height="40%" src="images/grace-hopper.jpg" />
    <Image width="40%" height="40%" src="images/programmers.jpg" />
  </Layout>
  <div>Note: this slide is accurate</div>
</Slide>);

const log = (...args) => () => console.log(...args);

const callbacks = (`
  button.addEventListener('click', function (event) {
    notifications.flash('Hello world!');
  });

  app.get('/hello', (req, res) => {
    res.send('Hello world!');
  });
`);

const promises = `function dataView() {
  fetch('/data')
    .then(res => res.json())
    .then(validate) // might reject
    .then(render)
    .catch(logAndRenderHelp)
};`;

const asyncAwait = `async function dataView() {
    try {
      const response = await fetch('/data');
      const data = await response.json();
      validate(data); // might throw
      render(data);
    } catch (error) {
      logAndRenderHelp(error);
    }
  }
}`;

const generators = `function* numbersGenerator() {
  let n = 0;
   while (true) {
    yield n;
    n += 1;
  }\
};`

const asyncGenerators = `async function* () {
  while (true) {
    yield fetch('/data');
  }
}`

const observables = `function pollData() {
  timer(0, 500)
    .pipe(concatMap(() => from(fetch('/data'))
      .pipe(map(response => response.json()))))
    .pipe(filter(data => data.done === true))
    .pipe(take(1))
    .subscribe(updateDataView);
}`;

const commonSchedulers = function () {
  setTimeout(log('TIMEOUT'), 0);
  Promise.resolve().then(log('PROMISE'));
  log('SYNC')();
};

const browserSchedulers = function () {
  window.requestAnimationFrame(log('ANIMATION'));
  window.requestIdleCallback(log('IDLE'));
};

const nodeSchedulers = function () {
  setImmediate(log('IMMEDIATE'));
  process.nextTick(log('TICK'));
};

const infiniteLoop = function main() {
  while (true) {}
};

const infiniteRecursion = function main() {
  return main(); // with tail calls optimization
};

const promiseLoop = function main() {
    Promise.resolve()
      .then(main);
};

const notFirstOrLast = (_, index, { length }) => !(index === 0 || index === length - 1);

const snippetify = f => f.toString()
  .split('\n')
  .filter(notFirstOrLast)
  .join('\n');

const Box = posed.div({
  visible: { x: 0, y: 0,  display: 'inline-block', backgroundColor:'red', transition: {

      x: { type: 'keyframes', values: [100, 75, 50, 25, 0] },
      y: { type: 'keyframes', values: [100, 100, 100, 100, 0], delay: 100 },
    }
  },
  hidden: { x: 100, y: 100, transition: {
      x: { type: 'keyframes', values: [0, 0, 0, 0, 100], delay: 100 },
      y: { type: 'keyframes', values: [0, 25, 50, 75, 100] },
    }
  },
});

const MovingBox = ({ visible }) =>
  <Box pose={visible ? 'visible' : 'hidden'}>{visible ? 'visible' : 'hidden'}</Box>;

const f = (name) => (callback) => {
  Promise.resolve(`${name} promise`).then(console.log);
  console.log(`${name} task`);
};

const a = f('a');
const b = f('b');
const c = () => {
  a();
  b();
};

const creditCardSlide = (<Slide>
        <BlockQuote>
          <Quote style={{color:'black', 'font-size': '1.5em'}}>The JS concurrency model is like a credit card.
            It frees you from the hassle and risks of carrying cash, which is great,
            unless you spend more than you make.</Quote>
          <Cite>Matt Ranney (2013)</Cite>
        </BlockQuote>
      </Slide>)


export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tq: [], mtq: [] };
    this.enqueue = (payload, target = 'tq') => () => {
      this.setState(({ tq, mtq }) => ({
        [target]: [...(target === 'tq' ? tq : mtq), payload]
      }));
    };
  }

  render() {
    return (
      <Deck
        transition={['slide']}
        transitionDuration={220}
        progress="bar"
        theme={theme}
      >
        <Slide id="title">
          <Heading size={3} style={{ 'text-align': 'left' }} caps>
            Concurrency, Parallelism and Scheduling in JavaScript
          </Heading>
          <Heading size={6} style={{ 'text-align': 'right' }}>
            by Mihail Mikov<br/>
            @debelbot
          </Heading>
        </Slide>
        <Slide id="about_me">
          <Heading size={3}>Hi, I'm Misho!</Heading>
          <Image src="images/rick-juggling.gif" />
          <List textColor="black">
            <ListItem>Senior Software Engineer @Skyscanner</ListItem>
            <ListItem>Juggler</ListItem>
            <ListItem>Rick and Morty fan</ListItem>
          </List>
        </Slide>
        <Slide id="about_skyscanner">
          <Image src="images/skyscanner.png" />
          <List>
            <ListItem>Global travel engine (70M users)</ListItem>
            <ListItem>500+ engineers</ListItem>
            <ListItem>my favorite thing: dev enablement guild</ListItem>
          </List>
        </Slide>
        <Slide id="history">
          <Heading size={5}>Let's start with some</Heading>
          <Image src="images/histroy.png" />
          <Heading size={5}><u>short</u> and <u>inaccurate</u> History</Heading>
        </Slide>
        <Slide id="card_deck">
          <Heading size={3}>in the beggining...</Heading>
        </Slide>
        <Slide id="batch_mode">
          <Heading size={5}>Batch mode</Heading>
          <Layout>
            <div style={{width: "48%", padding: "2%"}}>
              1 Processor
              <Image src="images/ENIAC.jpg" />
            </div>
            <div style={{ width: "48%", padding: "2%", 'border-left': '1px dashed gray' }}>
              1 Task
              <Image src="images/punched-card-deck.png" />
            </div>
          </Layout>
          <div>* not a real processor</div>
          <Notes>
            - but then processors became better due to Mouse law
            - and thanks to the power of wire, people started using terminals
          </Notes>
        </Slide>
        <Slide id="seq_code">
          <Heading size={5}>Sequential code</Heading>
          <List>
            <ListItem>Easy to understand</ListItem>
            <ListItem>Blocks on I/O</ListItem>
            <ListItem>Introduces the call stack</ListItem>
          </List>
        </Slide>
        <Slide id="time_sharing">
          <Heading size={3}>Time Sharing</Heading>
          <div>Time-slicing</div>
          <Layout>
            <div style={{width: "48%", padding: "2%"}}>
              1 Processor
              <Image src="images/cloud.jpg" />
            </div>
            <div style={{ width: "48%", padding: "2%", 'border-left': '1px dashed gray' }}>
              Multiple Tasks
              <Image src="images/time-slicing.jpg" />
            </div>
          </Layout>
        </Slide>
        <Slide id="scheduling_1">
          <Heading size={5}>Scheduling</Heading>
          <div>Managing priorty</div>
          <div>Selecting which task(s) to execute at a given time</div>
          <div>Preemptive vs Cooperative</div>
        </Slide>
        <Slide id="concurrency_1">
          <Heading size={3}>Concurrency</Heading>
          <div>Managing resourse sharing and communication between tasks</div>
        </Slide>
        <Slide id="sharing_vs_comms">
          <Heading size={5}>Communication through sharing</Heading>
          <Image src="images/hamlet.jpg" />
          <Heading size={5}>Sharing through communciation</Heading>
        </Slide>
        <Slide id="concurrency_2">
          <Heading size={3}>Concurrency</Heading>
          <List>
            <ListItem>Preemptive task switching</ListItem>
            <ListItem>Sleep tasks waiting on I/O</ListItem>
            <ListItem>Mutual exculsion</ListItem>
          </List>
        </Slide>
        <Slide id="crypto_bombe">
          <Heading size={5}>the original CRYPTO Bombe</Heading>
          <Image width="60%" src="images/ENIGMA.jpg" />
          <Notes>
            - also original brute-force attack
          </Notes>
        </Slide>
        <Slide id="parralelism_1">
          <Heading size={5}>Parralelism</Heading>
          <List>
            <ListItem>Managing the number of tasks running at the same time</ListItem>
            <ListItem>Many levels of parralelism</ListItem>
          </List>
        </Slide>
        <Slide id="tasks">
          <Heading size={5}>It's tasks all the way down</Heading>
          <Layout>
            <Image style={{ width: "40%" }} src="images/matrioshka.jpg" />
            <List>
              <ListItem>Actor</ListItem>
              <ListItem>Process</ListItem>
              <ListItem>Thread</ListItem>
              <ListItem>Fiber</ListItem>
              <ListItem>Function</ListItem>
              <ListItem>Instruction</ListItem>
            </List>
          </Layout>
        </Slide>
        <Slide id="trade_offs">
          <Heading size={5}>Trade-offs everywhere</Heading>
          <List>
            <ListItem>Isolation</ListItem>
            <ListItem>Memory use</ListItem>
            <ListItem>Context switching</ListItem>
            <ListItem>Synchronization</ListItem>
            <ListItem>Code complexity</ListItem>
          </List>
        </Slide>
        <Slide id="reality">
          <Image src="images/theory-vs-practice.png" />
        </Slide>
        <Slide id="meanwhile">
          <Heading size={3}>Meanwhile in a parralel universe...</Heading>
        </Slide>
        <Slide id="mother_of_all_demos">
          <Heading size={5}>The original hyper-media</Heading>
          <Layout>
            <Image src="images/mouse.gif" />
            <Image src="images/hyper-media.gif" />
          </Layout>
        </Slide>
        <Slide id="fast_forward">
          <Heading size={3}>fast-forward a bit...</Heading>
        </Slide>
        <Slide id="js_popular">
          <Heading size={5}>JavaScript is the "most popular" language</Heading>
          <Image src="images/most-popular-language.png" />
          <Notes>
            - love it or hate it
            - evolving fast
            - adding (too) many features
            - triving community (which all of us are part of)
            - of course, it still has it's flaws
          </Notes>
        </Slide>
        <Slide id="y_u_no_threads">
          <Heading size={5}>Other languages be like</Heading>
          <Image src="images/y-u-no-guy.png" />
          <Heading size={5}>JavaScript, Y U NO threads?!</Heading>
          <Notes>
            <div>The argument goes: processors / ocs have threads</div>
            <div>Answer yeah, so? processors / ocs have registers / floppy drivers,
              do we need to expose these as well?</div>
          </Notes>
        </Slide>
        <Slide id="philosiraptor">
          <Heading size={5}>But if JavaScript has no threads,</Heading>
          <Image src="images/philosiraptor.png" />
          <Heading size={5}>how does it do concurrency?</Heading>
        </Slide>
        <Slide id="js_is_special">
          <Heading size={5}>🌈 JavaScript is different!</Heading>
          <Image src="images/mdn-event-loop.png" />
        </Slide>
        <Slide id="js_in_3_words">
          <Heading size={5}>JavaScript in 3 words</Heading>
          <List>
            <ListItem>Event-driven</ListItem>
            <ListItem>Single-threaded</ListItem>
            <ListItem>Non-blocking</ListItem>
          </List>
          <div>alternative 3 words: piece of sh*t</div>
        </Slide>
        <Slide id="infinate_tables_analogy">
          <BlockQuote>
            <Quote style={{color:'black', 'font-size': '1.5em'}}>
              The JS concurrency model is like running a restaurant with infinite tables.
              You can seat as many customers as you can get, which is great,
              unless you only have one cook</Quote>
            <Cite>Codefucius</Cite>
          </BlockQuote>
        </Slide>
        <Slide id="event_loop_1">
          <Heading size={5}>The "event loop"</Heading>
          <Image src="images/evil.png" />
        </Slide>
        <Slide id="callbacks_1">
          <Heading size={5}>Callbacks</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={callbacks} />
        </Slide>
        <Slide id="promises_1">
          <Heading size={5}>Promises</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={promises} />
        </Slide>
        <Slide id="generators">
          <Heading size={5}>Generators</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={generators} />
        </Slide>
        <Slide id="async_functions">
          <Heading size={5}>Async functions</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={asyncAwait} />
        </Slide>
        <Slide id="observables">
          <Heading size={5}>Observables</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={observables} />
        </Slide>
        <Slide id="coding_trends">
          <Heading size={5}>#trending</Heading>
          <Image src="images/callbacks.jpg" />
        </Slide>
        <Slide id="blocking_the_event_loop">
          <Heading size={5}>Blocking the event loop</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippetify(infiniteLoop)} />
          <CodePane textSize={25} lang="js" theme="external" source={infiniteRecursion.toString()} />
          <CodePane textSize={25} lang="js" theme="external" source={promiseLoop.toString()} />
        </Slide>
        <Slide id="event_loop_scheduling">
          <Heading size={5}>Scheduling on the event loop</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippetify(commonSchedulers)} />
          <CodePane textSize={25} lang="js" theme="external" source={snippetify(browserSchedulers)} />
          <CodePane textSize={25} lang="js" theme="external" source={snippetify(nodeSchedulers)} />
        </Slide>
        <Slide id="browser_loop">
        </Slide>
        <Slide id="node_loop">
          <Heading size={5}>NodeJS event loop</Heading>
          <Notes>
            https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
          </Notes>
        </Slide>
        <Slide id="async_stack">
        </Slide>
        <Slide id="event_loop_2">
          <Heading>🔄 Event Loop</Heading>
          <div>
            <div style={{ "text-align": "left", padding: "20px", border: "1px solid gray"}}>▶️ Timers queue <span style={{float:"right"}}><span style={{'background-color': 'red'}}>🕗</span> 🕒 🕞</span></div>
            <div style={{ "text-align": "left", padding: "20px", border: "1px solid gray"}}>⏸ Tasks queue <span style={{float:"right"}}>📃 📜 📑</span></div>
            <div style={{ "text-align": "left", padding: "20px", border: "1px solid gray"}}>animation queue<span style={{float:"right"}}>🖼️🎨</span>️</div>
            <div style={{ "text-align": "left", padding: "20px", border: "1px solid gray"}}>Poll events <span style={{float:"right"}}>🖥️ 🖥</span>️</div>
            <div style={{ "text-align": "left", padding: "20px", border: "1px solid gray"}}>setImmediate queue</div>
          </div>
        </Slide>
        <Slide id="react_fiber">
        </Slide>
        <Slide id="js_data_races">
        </Slide>
        <Slide id="event_loop_3">
          <Heading>🔄 Event Loop</Heading>
          <div>
            <span style={{display: 'inline-block', padding: "20px", border: "1px solid gray", width:"10%"}}>📜 📜 - ⏳</span>
            <span style={{display: 'inline-block', padding: "20px", border: "1px solid gray", width:"10%"}}>📜 📜 - 📩</span>
            <span style={{display: 'inline-block', padding: "20px", border: "1px solid gray", width:"10%"}}>️📜 - 🎨</span>
            <span style={{display: 'inline-block', padding: "20px", border: "1px solid gray", width:"10%"}}>📜 - 🖥️</span>
          </div>
          <Notes>
            https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c
          </Notes>
        </Slide>
        <Slide id="csp_js">
          <Heading size={5}>The Go model - CSP</Heading>
          <Notes>
            http://lucasmreis.github.io/blog/quick-introduction-to-csp-in-javascript/
            http://2ality.com/2017/03/csp-vs-async-generators.html
            http://2ality.com/2017/12/for-await-of-sync-iterables.html
            https://about.sourcegraph.com/go/gophercon-2018-rethinking-classical-concurrency-patterns/
          </Notes>
        </Slide>
        <Slide id="actors_js">
          <Heading size={5}>The Erlang model - Actors</Heading>
          <Notes>
            https://monades.roperzh.com/get-to-know-the-actor-model/
          </Notes>
        </Slide>
        <Slide id="workers_1">
          <Heading size={5}>(Web) workers</Heading>
          <List>
            <ListItem>Supported in browsers</ListItem>
            <ListItem>Experimental in node 10</ListItem>
            <ListItem>Message-passing</ListItem>
            <ListItem>very limited shared memory</ListItem>
            <ListItem>Not intendent for I/O</ListItem>
          </List>
          <Notes>
            https://nodejs.org/api/worker_threads.html
          </Notes>
        </Slide>
        <Slide id="connecting workers">
          <Heading size={5}>Connecting workers</Heading>
        </Slide>
        <Slide id="actors">
          <Heading size={5}>Workers as actors</Heading>
        </Slide>
        <Slide id="atomics">
          <Heading size={5}>Atomics</Heading>
          <Notes>
            http://2ality.com/2017/01/shared-array-buffer.html
          </Notes>
        </Slide>
        <Slide>

        </Slide>
        <Slide id="thank_you">
          <Image src="images/true-story.png" />
          <Heading size={5}>Thank you!</Heading>
        </Slide>
      </Deck>
    );
  }
}
