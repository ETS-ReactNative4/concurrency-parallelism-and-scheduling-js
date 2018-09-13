const transferSync = (src, dest, amount) => {
  if (src.funds >= amount) {
    src.funds -= amount;
    dest.funds += amount;
  } else {
    throw new Error('Insufficient funds');
  }
};

const naiveTransferAsync = async (src, dest, amount) => {
  const srcFunds = await src.getFunds();
  const destFunds = await dest.getFunds();
  if (srcFunds >= amount) {
    await src.setFunds(srcFunds - amount);
    await dest.setFunds(destFunds + amount);
  } else {
    throw new Error('Insufficient funds');
  }
};

const imperfetcTransferAsync = async (src, dest, amount) => {
  try {
    const srcFunds = await src.getFunds();
    if (srcFunds >= amount) {
      await src.setFunds(funds - amount);
      await dest.setFunds(funds + amount);
    } else { throw new Error('Insufficient funds'); }
  } catch (err) { throw err; }
};

const transferAsyncCallbacks = async (src, dest, amount) => {
    await src.setFunds(funds => funds - amount);
    await dest.setFunds(funds => funds + amount);
}

const transferAsyncDebitCredit = async (src, dest, amount) => {
  await src.debit(amount);
  await dest.credit(amount);
};

const transferPromise = (src, dest, amount) =>
  src.getFunds()
    .then(funds => src.setFunds(funds - amount))
    .then(() => dest.setFunds(funds + amount));

const transferPromiseCallbacks = (src, dest, amount) =>
  src.setFunds(funds => funds - amount)
    .then(() => dest.setFunds(funds => funds + amount));

const defer = () => {
  let resolve;
  let reject;
  const deferred = new Promise((y, n) => {
    resolve = y;
    reject = n;
  });

  return { resolve, reject, deferred };
};

const delay = (ms = 0) => new Promise(y => setTimeout(y, ms));

const account = Object.freeze({
  getFunds(amount) { return this.funds },
  setFunds(amount) { this.funds = amount; }
});

const makeAccount = (name, funds) =>
  Object.create(account, {
    name: { value: name },
    funds: { value: funds, writable: true, enumerable: true, configure: true }
  });

const log = (...stuff) => console.table(stuff);

((async () => {
  try {
    const acc1 = makeAccount('acc1', 50);
    const acc2 = makeAccount('acc2', 0);
    const acc3 = makeAccount('acc3', 0);
    await log(acc1, acc2, acc3);
    await Promise.all([ naiveTransferAsync(acc1, acc2, 50), naiveTransferAsync(acc1, acc3, 50) ]).catch(console.warn);
    await log(acc1, acc2, acc3);
  }
  catch (ex) {
    console.error(ex);
  }
})());

((async () => {
  try {
    const acc1 = makeAccount('accA', 50);
    const acc2 = makeAccount('accB', 0);
    const acc3 = makeAccount('accC', 0);
    await log(acc1, acc2, acc3);
    await naiveTransferAsync(acc1, acc2, 50);
    await naiveTransferAsync(acc1, acc3, 50).catch(console.warn);
    await log(acc1, acc2, acc3);
  }
  catch (ex) {
    console.error(ex);
  }
})());

((() => {
  const acc1 = makeAccount('accX', 50);
  const acc2 = makeAccount('accY', 0);
  const acc3 = makeAccount('accZ', 0);
  console.table([acc1, acc2, acc3]);
  transferSync(acc1, acc2, 50);
  try{
  transferSync(acc1, acc3, 50);
  } catch(ex) { console.warn(ex); }
  console.table([acc1, acc2, acc3]);
})());

((() => {
  const acc1 = makeAccount('EV1', 50);
  const acc2 = makeAccount('EV2', 0);
  const acc3 = makeAccount('EV3', 0);
  console.table([acc1, acc2, acc3]);
  setTimeout(() => transferSync(acc1, acc2, 50), 0);
  setTimeout(() => transferSync(acc1, acc3, 50), 0);
  setTimeout(() => console.table([acc1, acc2, acc3]));
})());
