import { components, keys } from './metadata.json';
import { meta, tests } from './tests.json';

import coverage from './coverage-final.json';
const coveredFiles = Object.keys(coverage);

/* stolen from https://github.com/pveyes/byzantine/blob/master/index.js */
const ccco = (obj, k = Object.keys(obj)) => ({
  covered: k.reduce((t, c) => (t + (obj[c] > 0 ? 1 : 0)), 0),
  all: k.length,
});

keys.forEach(key => {
  const match = new RegExp(`${key}/${key}.jsx$`);
  coveredFiles
    .filter(file => match.test(file))
    .map(f => coverage[f])
    .forEach(cov => { // should only be 1
      components[key].testCoverage = {
        statements: ccco(cov.s),
        functions: ccco(cov.f),
        branches: ccco(cov.b),
      };
    });
});

keys.forEach(key => {
  if (components[key] && tests[key]) {
    components[key].testStatus = tests[key];
  }
});

export default {
  keys,
  components,
  testStatus: meta,
};
