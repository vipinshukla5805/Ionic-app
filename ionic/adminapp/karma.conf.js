module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'jasmine', 'browserify' ],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/reflect-metadata/Reflect.js',
      // Zone.js dependencies
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true },
      'app/**/*.spec.ts'
    ],

    // list of files to exclude
    exclude: [
      'node_modules/angular2/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': [ 'browserify' ]
    },

    browserify: {
      debug: true,
      transform: [
        [ 'browserify-istanbul', {
          instrumenter: require('isparta'),
          ignore: [ '**/*.spec.ts', '**/*.d.ts' ],
        }]
      ],
      plugin: [
        [ 'tsify', 'jasmine-spec-reporter',
          'karma-jasmine', 'karma-phantomjs-launcher' ]
      ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'spec' ],

    specReporter: {

      // When test faild - report it at the end of all tests
      lateReport: true,

      // Max Error log lines to display
      maxLogLines: 5,

      // Don't show faild tests
      suppressFaild: false,

      // Don't show successful tests
      suppressSuccess: false,

      // Don't show skipped tests
      suppressSkipped: false,

      // Every test that is more slower than the slowest test is mark as slow
      slowTestTime: 40,
      fastTestTime: 20
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    proxies: {
      '/build': '/base/www/build'
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'PhantomJS' ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    captureTimeout: 6000
  })
}
