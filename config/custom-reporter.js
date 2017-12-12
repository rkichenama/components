// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onTestResult (test, result, aggregate) {
    // console.log('onTestResult');
    // console.log('test', JSON.stringify(test.path));
    /*
      result
        .numFailingTests
        .numPassingTests
        .numPendingTests
        .testFilePath
        .testResults []
          .failureMessages []
          .fullName
          .status
          .ancestorTitles [] ?? Suite names, like breadcrumb
    */

    // console.log('result', result.testResults);
  }
  
  onRunComplete(contexts, aggregate) {
    // console.log('Custom reporter output:');
    // console.log('GlobalConfig: ', this._globalConfig);
    // console.log('Options: ', this._options);
    // console.log('result', aggregate);
  }
}

module.exports = MyCustomReporter;
