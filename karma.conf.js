// Karma configuration
// Generated on Tue Dec 02 2014 20:55:30 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'artjs'
    ],


    // list of files / patterns to load in the browser
    files: [
      'javascripts/artJs/Initialize.js',
      'javascripts/artJs/utils/Log.js',
      'javascripts/artJs/utils/ObjectUtils.js',
      'javascripts/artJs/utils/ArrayUtils.js',
      'javascripts/artJs/utils/Class.js',
      'javascripts/artJs/events/Delegate.js',
      'javascripts/artJs/utils/MathUtils.js',
      'javascripts/artJs/utils/*.js',
      'javascripts/artJs/events/*.js',
      'javascripts/artJs/math/*.js',
      'javascripts/artJs/component/*.js',
      'javascripts/artJs/data/*.js',
      'javascripts/artJs/dom/*.js',
      'javascripts/artJs/module/*.js',
      'javascripts/artJs/net/*.js',
      'javascripts/artJs/spec/matchers/Base.js',
      'javascripts/artJs/spec/**/*.js',
      'javascripts/artJs/template/*.js',
      'javascripts/artJs/transition/*.js',
      'javascripts/artJs/ui/*.js',
      'javascripts/spec/Init.js',
      'javascripts/spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};