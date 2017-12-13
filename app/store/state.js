import { components, keys } from './metadata.json';
import { meta, tests } from './tests.json';
import coverage from './coverage-final.json';

const testStatus = {
  meta,
  components: keys.reduce((t, c) => {
    t[c] = { tests: {}, coverage: {}};
    return t;
  }, {}),
};

const addTestResultsToComponentMetadata = key => {
  if (components[key] && tests[key]) {
    components[key].testStatus = tests[key];
  }
};

const normalizeTestResults = key => {
  if (tests[key]) {
    testStatus.components[key].tests = tests[key];
  }
};

const coveredFiles = Object.keys(coverage);
/* stolen from https://github.com/pveyes/byzantine/blob/master/index.js */
const parseCoverageReport = (obj, k = Object.keys(obj)) => ({
  covered: k.reduce((t, c) => (t + (obj[c] > 0 ? 1 : 0)), 0),
  all: k.length,
});
const addCoverageResultsToComponentMetadata = key => {
  const match = new RegExp(`${key}/${key}.jsx$`);
  coveredFiles
    .filter(file => match.test(file))
    .map(f => coverage[f])
    .forEach(cov => { // should only be 1
      components[key].testCoverage = {
        statements: parseCoverageReport(cov.s),
        functions: parseCoverageReport(cov.f),
        branches: Object.keys(cov.b).reduce((t, key) => {
          const { covered, all } = parseCoverageReport(cov.b[key]);
          return {
            covered: t.covered + covered,
            all: t.all + all,
          };
        }, { covered: 0, all: 0 }),
      };
    });
};
const normalizeCoverageResults = key => {
  const match = new RegExp(`${key}/${key}.jsx$`);
  coveredFiles
    .filter(file => match.test(file))
    .map(f => coverage[f])
    .forEach(cov => { // should only be 1
      testStatus.components[key].coverage = {
        statements: parseCoverageReport(cov.s),
        functions: parseCoverageReport(cov.f),
        branches: Object.keys(cov.b).reduce((t, key) => {
          const { covered, all } = parseCoverageReport(cov.b[key]);
          return {
            covered: t.covered + covered,
            all: t.all + all,
          };
        }, { covered: 0, all: 0 }),
      };
    });
};


keys.forEach(key => {
  addCoverageResultsToComponentMetadata(key);
  addTestResultsToComponentMetadata(key);
  normalizeTestResults(key);
  normalizeCoverageResults(key);
});


export default {
  keys,
  components,
  testStatus,
};
