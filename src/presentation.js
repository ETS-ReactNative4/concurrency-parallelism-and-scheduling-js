import React from 'react';

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

import { theme, ConceptsSlide } from './utils';

import snippets from './snippets';
import actors from './snippets/actors';
import csp from './snippets/csp';

export default class Presentation extends React.Component {
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
            <ListItem>Rick and Morty fan, Juggler</ListItem>
          </List>
        </Slide>
        <Slide id="about_skyscanner">
          <Image src="images/skyscanner.png" />
          <List>
            <ListItem>Global travel engine with 70M users</ListItem>
            <ListItem>500+ engineers in 10 offices</ListItem>
            <ListItem>my favorite thing: dev enablement guild</ListItem>
          </List>
        </Slide>
        <Slide id="history">
          <Heading size={5}>Let's start with some</Heading>
          <Image src="images/histroy.png" />
          <Heading size={5}><u>short</u> and <u>inaccurate</u> History</Heading>
        </Slide>
        <Slide id="in the beggining">
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
            <ListItem>Guaranteed order of execution</ListItem>
            <ListItem>Blocks on I/O</ListItem>
            <ListItem>Easy to understand</ListItem>
          </List>
        </Slide>
        <Slide id="time_sharing">
          <Heading size={5}>Time Sharing</Heading>
          <Layout>
            <div style={{width: "48%", padding: "2%"}}>
              1 Processor
              <Image src="images/cloud.jpg" />
            </div>
            <div style={{ width: "48%", padding: "2%", 'border-left': '1px dashed gray' }}>
              Multiple Tasks
              <Image src="images/meeseeks.jpg" />
            </div>
          </Layout>
          <div>How do we solve this?!</div>
        </Slide>
        <ConceptsSlide highlighted="scheduling" id="concepts-scheduling-2" only />
        <Slide id="scheduling_2">
          <Heading size={5}>Two modes of scheduling</Heading>
          <Layout>
            <div style={{width:"48%", padding: "2%"}}>
              Pre-emptive
              <hr/>
              Tasks execute for only a given time,
              after which they are forcefully suspended.
            </div>
            <div style={{width:"48%", padding: "2%", "border-left": "1px gray dashed"}}>
              Co-operative
              <hr/>
              Task runs until they voluntarily yield the thread of execution.
            </div>
          </Layout>
        </Slide>
        <Slide id="scheduling_problems">
          <Heading size={5}>Scheduling problems</Heading>
          <Layout>
            <div style={{width:"48%", padding: "2%"}}>
              Pre-emptive
              <hr/>
              Given a lot ot tasks, the system starts thrashing,
              due to the cost of context switching.
            </div>
            <div style={{width:"48%", padding: "2%", "border-left": "1px gray dashed"}}>
              Co-operative
              <hr/>
              If a task blocks, no other task can execute.
            </div>
          </Layout>
        </Slide>
        <Slide id="many_processors">
          <Heading size={5}>But what if we have many processors?</Heading>
          <Image src="images/core_count.png" />
        </Slide>
        <ConceptsSlide highlighted="parralelism" id="concepts-parallelism-2" only/>
        <Slide id="crypto_bombe_1">
          <Heading size={5}>the original CRYPTO miner</Heading>
          <Image width="60%" src="images/ENIGMA.jpg" />
          <Notes>
            - also original brute-force attack
          </Notes>
        </Slide>
        <Slide id="parallelism_2">
          <Heading size={5}>Two modes of parralelism</Heading>
          <Layout>
            <div style={{width:"48%", padding: "2%"}}>
              Data
              <hr/>
              The same task executes multiple times in parallel on different elements of a dataset.
              e.g. SIMD, MapReduce
            </div>
            <div style={{width:"48%", padding: "2%", "border-left": "1px gray dashed"}}>
              Task
              <hr/>
              Different tasks executed in parallel.
              e.g. WebWorkers, UNIX processes
            </div>
          </Layout>
        </Slide>
        <Slide id="collaboration_hands">
          <Heading size={5}>Collaboration</Heading>
          <Image src="images/too-many-hands.jpg" />
          <div>How many hands do you need to complete a 4 piece puzzle?!</div>
        </Slide>
        <ConceptsSlide highlighted="concurrency" id="concepts-concurrency-2" only/>
        <Slide id="sharing_vs_comms">
          <Heading size={5}>Communication through sharing</Heading>
          <Image src="images/hamlet.jpg" />
          <Heading size={5}>Sharing through communciation</Heading>
        </Slide>
        <Slide id="concurrency_2">
          <Heading size={5}>Concurrency Models</Heading>
          <List>
            <ListItem>Actors</ListItem>
            <ListItem>Threads with mutual exclusion</ListItem>
            <ListItem>Communicating Sequential Processes</ListItem>
          </List>
        </Slide>
        <Slide id="tasks">
          <Heading size={5}>Tasks all the way down</Heading>
          <Layout>
            <Image style={{ width: "40%" }} src="images/matrioshka.jpg" />
            <List>
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
          <Layout>
            <Image src="images/Trade-offs.jpg" />
            <List>
              <ListItem>Isolation</ListItem>
              <ListItem>Memory use</ListItem>
              <ListItem>Context switching</ListItem>
              <ListItem>Synchronization</ListItem>
              <ListItem>Code complexity</ListItem>
            </List>
          </Layout>
        </Slide>
        <Slide id="reality">
          <Image width="80%" src="images/theory-vs-practice.png" />
        </Slide>
        <Slide id="meanwhile">
          <Heading size={3}>Meanwhile in a parralel universe...</Heading>
        </Slide>
        <Slide id="mother_of_all_demos">
          <Heading size={5}>The original hyper-media</Heading>
          <Layout>
            <Image width="40%" src="images/mouse.gif" />
            <Image width="40%" src="images/hyper-media.gif" />
          </Layout>
        </Slide>
        <Slide id="fast_forward">
          <Heading size={3}>fast-forward a bit...</Heading>
        </Slide>
        <Slide id="js_popular">
          <Heading size={5}>JavaScript is the most popular programming language</Heading>
          <Image src="images/most-popular-language.png" />
          <Notes>
            - love it or hate it
            - evolving fast
            - adding (too) many features
            - triving community (which all of us are part of)
            - of course, it still has it's flaws
          </Notes>
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
        <Slide id="infinate_tables_analogy">
          <BlockQuote>
            <Quote style={{color:'black', 'font-size': '1.5em'}}>
              The JS concurrency model is like running a restaurant with infinite tables.
              You can seat as many customers as you can get, which is great,
              but you only have one cook</Quote>
            <Cite>Codefucius</Cite>
          </BlockQuote>
        </Slide>
        <Slide id="event_loop_1">
          <Heading size={5}>The "event loop"</Heading>
          <Image src="images/evil.png" />
          <Heading size={5}>is not a simple queue</Heading>
        </Slide>
        <Slide id="browser_loop">
          <Heading size={5}>The browser</Heading>
          <div>JS thread has limited control over the system</div>
          <Image src="images/archibald-event-loop.png" />
          <List style={{ 'text-align': 'left !important'}}>
            <ListItem style={{ 'font-size': '1.15em !important' }}>⏳ Push ready timer callbacks to the task queue</ListItem>
            <ListItem style={{ 'font-size': '1.15em !important' }}>📩 Execute the oldest task in the task queue</ListItem>
            <ListItem style={{ 'font-size': '1.15em !important' }}>🎨 Conditionally execute rendering phase</ListItem>
          </List>
        </Slide>
        <Slide id="browser_scheduling">
          <Heading size={5}>Browser scheduling</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.browserSchedulers} />
          <div style={{ "margin-top": "10px" }}>Output: ⏳🎨 or 🎨⏳ then 📩</div>
        </Slide>
        <Slide id="node_loop">
          <Heading size={5}>Node.js</Heading>
          <div>JS thread has "full" control over the system</div>
          <Layout>
            <Image style={{ width: "40%"}} src="images/node_loop.png" />
            <List style={{ 'text-align':'left !important', width: "50%"}}>
              <ListItem  style={{ 'font-size': '1.15em !important' }}>⏳ Execute the oldest ready timer callback</ListItem>
              <hr/>
              <ListItem  style={{ 'font-size': '1.15em !important' }}>🦄 Shortly poll for network, disk or child process work</ListItem>
              <hr/>
              <ListItem  style={{ 'font-size': '1.15em !important' }}>⚠️ Execute all current callbacks in setImmediate queue</ListItem>
            </List>
          </Layout>
          <Notes>
            https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
          </Notes>
        </Slide>
        <Slide id="node_scheduling">
          <Heading size={5}>Node.js scheduling</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.nodeSchedulers} />
          <div style={{ "margin-top": "10px" }}>Output: 🤘⏳⚠️🦄</div>
        </Slide>
        <Slide id="blocking_the_event_loop">
          <Heading size={5}>Blocking the event loop</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.infiniteLoop} />
          <CodePane textSize={25} lang="js" theme="external" source={snippets.infiniteRecursion} />
          <CodePane textSize={25} lang="js" theme="external" source={snippets.infinitePromises} />
        </Slide>
        <Slide id="callbacks_2">
          <Heading size={5}>Callbacks: concurrency through events</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.eventCallbacks} />
        </Slide>
        <Slide id="callbacks_4">
          <Heading size={5}>Callback Hell</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.nestedCallbacks} />
        </Slide>
        <Slide id="promises_1">
          <Heading size={5}>Promises</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.promises} />
        </Slide>
        <Slide id="promises_2">
          <Heading size={5}>Promises</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.promiseOperations} />
        </Slide>
        <Slide id="generators">
          <Heading size={5}>Generators</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.generators} />
        </Slide>
        <Slide id="async_functions">
          <Heading size={5}>Async functions</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.asyncAwait} />
        </Slide>
        <Slide id="observables">
          <Heading size={5}>Observables</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.observables} />
        </Slide>
        <Slide id="coords_of_concur">
          <Image width="70%" src="images/observables.png" />
        </Slide>
        <Slide id="coding_trends">
          <Heading size={5}>#trending</Heading>
          <Image src="images/callbacks.jpg" />
        </Slide>
        <Slide id="async_stack">
          <Heading size={5}>Async "thread"</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={snippets.timeoutLoop} />
        </Slide>
        <Slide id="actors_js">
          <Heading size={5}>Actors: The Erlang model</Heading>
          <Layout>
            <Image width="30%" src="images/elexir.png" />
            <List>
              <ListItem>Independently executed</ListItem>
              <ListItem>Each Actor has an event-loop</ListItem>
              <ListItem>Asyncronous message passing</ListItem>
            </List>
          </Layout>
          <Notes>
            https://monades.roperzh.com/get-to-know-the-actor-model/
          </Notes>
        </Slide>
        <Slide id="bad_actor">
          <Heading size={5}>Inefficient actors</Heading>
            <CodePane textSize={25} lang="js" theme="external" source={actors.inefficientActor} />
        </Slide>
        <Slide id="event_actor">
          <Heading size={5}>Event actors</Heading>
            <CodePane textSize={25} lang="js" theme="external" source={actors.eventActors} />
        </Slide>
        <Slide id="worker_actors">
          <Heading size={5}>Worker actors</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={actors.workerActorsMain} />
          <CodePane textSize={25} lang="js" theme="external" source={actors.workerActorsWorker} />
        </Slide>
        <Slide id="observable_worker">
          <Heading size={5}>Observable Workers</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={actors.observableActor} />
        </Slide>
        <Slide id="workers_1">
          <Heading size={5}>(Web) workers</Heading>
          <List>
            <ListItem>Separate event loop and realms</ListItem>
            <ListItem>Async message passing</ListItem>
            <ListItem>Limited access to DOM, I/O</ListItem>
            <ListItem>Limited shared memory</ListItem>
            <ListItem>Full support in browsers</ListItem>
            <ListItem>Experimental in Node 10</ListItem>
          </List>
          <Notes>
            https://nodejs.org/api/worker_threads.html
          </Notes>
        </Slide>
        <Slide id="csp_js">
          <Heading size={5}>The Go model - CSP</Heading>
          <Layout>
            <Image src="images/golang.png" />
            <List>
              <ListItem>Lightweight processes</ListItem>
            <ListItem>Synchronous message passing through channels</ListItem>
          </List>
          </Layout>
          <Notes>
            http://lucasmreis.github.io/blog/quick-introduction-to-csp-in-javascript/
            http://2ality.com/2017/03/csp-vs-async-generators.html
            http://2ality.com/2017/12/for-await-of-sync-iterables.html
            https://about.sourcegraph.com/go/gophercon-2018-rethinking-classical-concurrency-patterns/
          </Notes>
        </Slide>
        <Slide id="channels_and_processes">
          <Heading size={5}>Channels and Processes</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={csp.channelSimple} />
          <CodePane textSize={25} lang="js" theme="external" source={csp.processSimple} />
        </Slide>
        <Slide id="csp_ping_pong">
          <Heading size={5}>CSP Ping Pong in JS</Heading>
            <CodePane textSize={25} lang="js" theme="external" source={csp.playerSimple} />
            <CodePane textSize={25} lang="js" theme="external" source={csp.gameSimple} />
        </Slide>
        <Slide id="put_and_take">
          <Heading size={5}>Put and Take</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={csp.putSimple} />
          <CodePane textSize={25} lang="js" theme="external" source={csp.takeSimple} />
        </Slide>
        <Slide id="select_operator">
          <Heading size={5}>Select from many channels</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={csp.playerSelectSimple} />
        </Slide>
        <Slide id="select_implementation">
          <Heading size={5}>Select implementation</Heading>
          <CodePane textSize={25} lang="js" theme="external" source={csp.select} />
          <CodePane textSize={25} lang="js" theme="external" source={csp.peek} />
        </Slide>
        <Slide id="infinate_tables_analogy_2">
          <BlockQuote>
            <Quote style={{color:'black', 'font-size': '1.5em'}}>
              The JS concurrency model is like running a restaurant with infinite tables.
              You can seat as many customers as you can get, which is great,
              but you only have one cook</Quote>
            <Cite>Codefucius</Cite>
          </BlockQuote>
        </Slide>
        <Slide id="always_bet_on_js">
          <Image src="images/true-story.png" />
          <Heading size={3}>Always bet on JS</Heading>
        </Slide>
        <Slide id="thank_you">
          <Heading size={3}>Thank you!</Heading>
          <Image src="images/rick-and-morty-hello.gif" />
          <Heading size={3}>Questions?</Heading>
        </Slide>
      </Deck>
    );
  }
}
