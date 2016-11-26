// Karma configuration
// Generated on Thu Nov 24 2016 16:31:27 GMT+0700 (SE Asia Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
        'docs/libs/d3/d3.min.js',
        'docs/libs/jquery/jquery-3.1.1.min.js',
        'docs/libs/ol3/ol.js',
        'docs/libs/ol3/ol.css',
        {pattern: 'dist/C9.js', included: true},
        {pattern: 'dist/C9.min.css', included: true},
        {pattern: 'test/*.test.js', included: true}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'dist/C9.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'progress', 'mocha', 'coverage'],


    coverageReporter: {
        reporters: [{type: 'lcov'}]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
