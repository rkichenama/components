const fs = require('fs');
const path = require('path');

const createObjectPath = (obj, path, value) => {
  if (path.length) {
    const suite = path.shift();
    if (!obj[suite]) { obj[suite] = { n: 0, passed: 0, failed: 0, pending: 0 } }
    obj[suite].n++;
    const status = createObjectPath(obj[suite], path, value);
    obj[suite][status]++;
    return status;
  } else {
    const { fullName, failureMessages: errors, status } = value;
    obj[fullName] = { status, errors };
    return status;
  }
};

class MyCustomReporter {
  onRunComplete(contexts, aggregate) {
    const {
      numFailedTests: failed,
      numPassedTests: passed,
      numPendingTests: pending,
      numTotalTests: n,
      testResults
    } = aggregate;
    const json = {
      meta: { failed, passed, pending, n },
      tests: testResults.reduce(
        (tests, test) => {
          test.testResults.forEach(it => {
            const { ancestorTitles } = it;
            if (ancestorTitles.length) {
              createObjectPath(tests, ancestorTitles, it);
            }
          });
          return tests;
        },
        {}
      ),
    };
    fs.writeFileSync(path.join(process.cwd(), 'app/store/tests.json'), JSON.stringify(json, null, 2), { encoding: 'UTF-8' });
    // aggregate.snapshot ?
  }
}

module.exports = MyCustomReporter;
