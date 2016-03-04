module.exports = function(karma) {

  karma.set({
    frameworks: ['browserify', 'mocha'],
    files: ['test/**/*.js'],
    preprocessors: {
      'test/**/*.js': ['browserify']
    },
    browserify: {
      debug: true
    }
  });

  if (process.env.TRAVIS) {

    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      process.stderr.write('SAUCE_USERNAME or SAUCE_ACCESS_KEY not set\n');
      process.exit(1);
    }

    var customLaunchers = {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox'
      }
    };
    karma.set({
      sauceLabs: {
        testName: 'pixelworks',
        recordScreenshots: false,
        connectOptions: {
          port: 5757
        }
      },
      reporters: ['dots', 'saucelabs'],
      captureTimeout: 120000,
      browserNoActivityTimeout: 50000,
      customLaunchers: customLaunchers,
      browsers: Object.keys(customLaunchers)
    });

  } else {

    karma.set({
      browsers: ['Chrome']
    });

  }

};
