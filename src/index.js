import React from 'react';
import ReactDOM from 'react-dom';
import Presentation from './presentation';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Presentation />, document.getElementById('root'));
registerServiceWorker();

const ch = new MessageChannel();

const worker = new Worker('/static/js/worker.js');

worker.postMessage('', [ch.port2]);

worker.onmessage = (msg) => {
  console.log('worker', msg.data);
  worker.postMessage('');
};

ch.port1.onmessage = (msg) => {
  console.log('channel', msg.data);
  ch.port1.postMessage('');
};

//worker.postMessage('');
//ch.port1.postMessage('');
