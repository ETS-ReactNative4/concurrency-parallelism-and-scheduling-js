function transferSync(src, dest, amount) {
  if (src.funds >= amount) {
    src.funds -= amount;
    dest.funds += amount;
  } else {
    throw new Error('Insufficient funds');
  }
};

async function transferAsync(src, dest, amount) {
  const srcFunds = await src.getFunds();
  if (srcFunds >= amount) {
    await src.setFunds(srcFunds - amount);
    const destFunds = await dest.getFunds();
    await dest.setFunds(destFunds + amount);
  } else {
    throw new Error('Insufficient funds');
  }
};

const account = Object.freeze({
  getFunds(amount) { return this.funds },
  setFunds(amount) { this.funds = amount; }
});

const makeAccount = (name, funds) =>
  Object.create(account, {
    name: { value: name },
    funds: { value: funds, writable: true, enumerable: true, configure: true }
  });
