import channel from './csp-new';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ch = channel();

const rng = async (ch) => {
  let n = 0;
  while (true) {
    // const rand = Math.floor(Math.random() * 100);
    console.log('generated', n);
    await ch.put(n);
    n += 1;
  }
};

const dup = async (ch) => {
  while (true) {
    const value = await ch.take();
    await Promise.all([
      ch.put(value),
      ch.put(value)
    ]);
  }
}

const mult = async (ch) => {
  while (true) {
    const num = await ch.take();
    await sleep(5000);
    console.log('multipled', num,'by 2', num * 2);
  }
};

const div = async (ch) => {
  while (true) {
    const num = await ch.take();
    await sleep(5000);
    console.log('divided', num,'by 2', num / 2);
  }
};


dup(ch);
mult(ch);
div(ch);
rng(ch);
