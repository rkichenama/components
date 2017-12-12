import { components, keys } from './metadata.json';
import { meta, tests } from './tests.json';

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

/*
import coverage from './coverage-final.json';
const coveredFiles = Object.keys(coverage);

keys.forEach(key => {
  const match = new RegExp(`${key}/${key}.jsx`);
  coveredFiles
    .find(file => match.test(file))
    .map(f => coverage[f])
    .forEach(cov => { // should onlye be 1
      conponents[key].testCoverage = {
        branch, statements, functions
      };
    })
})

stolen from https://github.com/pveyes/byzantine/blob/master/index.js
module.exports = function parseCoverage(json) {
  const paths = Object.keys(json);

  return paths.map((path) => {
    const coverage = json[path];

    const branches = generateEmptyReport();
    const statements = generateEmptyReport();
    const functions = generateEmptyReport();

    const branchIds = Object.keys(coverage.b);
    branchIds.forEach(id => {
      const result = coverage.b[id];
      result.forEach(r => {
        branches.covered += r > 0 ? 1 : 0;
        branches.all += 1;
      });
    });

    const statementIds = Object.keys(coverage.s);
    statementIds.forEach(id => {
      statements.covered += coverage.s[id] > 0 ? 1 : 0;
      statements.all += 1;
    });

    const functionIds = Object.keys(coverage.f);
    functionIds.forEach(id => {
      functions.covered += coverage.f[id] > 0 ? 1 : 0;
      functions.all += 1;
    });

    // We don't return line coverage because it's no longer relevant
    // https://github.com/gotwarlost/istanbul/issues/639
    return {
      path,
      branches,
      statements,
      functions,
    };
  })
}
*/
