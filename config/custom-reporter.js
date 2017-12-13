const fs = require('fs');
const path = require('path');

const createObjectPath = (obj, path, value) => {
  if (path.length) {
    const suite = path.shift();
    if (!obj[suite]) { obj[suite] = { n: 0, passed: 0, failed: 0, pending: 0, tests: {} } }
    obj[suite].n++;
    const status = createObjectPath(obj[suite].tests, path, value);
    obj[suite][status]++;
    return status;
  } else {
    const { fullName, failureMessages: errors, status } = value;
    obj[fullName] = { status, errors: errors.map(err => err.toString().replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ''
    )) };
    return status;
  }
};

class MyCustomReporter {
  onRunComplete(contexts, aggregate) {
    const {
      numFailedTests,
      numPassedTests,
      numPendingTests,
      numTotalTests,
      testResults
    } = aggregate;
    const { tests } = testResults.reduce(
      (tests, test) => {
        test.testResults.forEach(it => {
          const { ancestorTitles } = it;
          if (ancestorTitles.length) {
            !tests['tests'] && (tests['tests'] = {});
            createObjectPath(tests.tests, ancestorTitles, it);
          }
        });
        return tests;
      },
      {}
    );

    const json = {
      meta: {
        failed: numFailedTests,
        passed: numPassedTests,
        pending: numPendingTests,
        n: numTotalTests,
      },
      tests,
    };
    fs.writeFileSync(path.join(process.cwd(), 'app/store/tests.json'), JSON.stringify(json, null, 2), { encoding: 'UTF-8' });
    // aggregate.snapshot ?
  }
}

module.exports = MyCustomReporter;
