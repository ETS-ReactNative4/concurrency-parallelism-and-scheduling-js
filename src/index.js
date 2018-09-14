import React from 'react';
import ReactDOM from 'react-dom';
import Presentation from './presentation';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Presentation />, document.getElementById('root'));
registerServiceWorker();

const worker = new Worker('/static/js/worker.js');

worker.onmessage = (message) => {
  console.log(message);
  setTimeout(() => {
    worker.postMessage('ping');
  }, 2000);
};

worker.postMessage('ping');
