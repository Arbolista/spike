var path = require('path'),
  webpack_config = require('./client/config/test/webpack');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      'test.main.js',
    ],
    basePath: './',
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'test.main.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    webpack: webpack_config
  });
};
