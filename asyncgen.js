const { random, ceil } = Math;

const IterableOnSync = name => function* () {
    if (!this[name]) {
      return; // assumes the named member is an array
    }
    let i = -1;
    while (true) {
      if (++i >= this[name].length) {
        return;
      }
      yield this[name][i];
    }
  };

const depromisify = promise => (
  promise
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }))
);

const IterableOn = fn => async function* () {
  if (!/function/.test(typeof this[fn])) {
    return; // assumes the named function returns a promise
  }
  while (true) {
    const { error, data } = await depromisify(this[fn]());
    if (error) {
      // log error?
      return;
    }
    yield data;
  }
};


const timeoutPromise = fn => () =>
  new Promise((res, rej) =>
    setTimeout(
      () => {
        try {
          res(fn());
        } catch (err) {
          rej(err);
        }
      },
      500
    )
  );

const Gen = Object.assign(
  {
    list: ['baseball', 'cannon', 'fodder'],
    remote: ((t = 0) => timeoutPromise(() => {
      const r = random();
      if (++t > 3) {
        throw new Error('Something wrong');
      }
      return r;
    }))(),
  },
  {
    async: IterableOn('remote'),
    sync: IterableOnSync('list'),
  },
);

(async function () {
  for (let r of Gen.sync()) { // sync iterator
    console.log(r);
  }

  for await (let r of Gen.async()) {
    console.log(r);
  }
})();

// const ii = IterableOnSync('list').bind(Gen);
// for (let r of ii()) {
//   console.log(r);
// }
