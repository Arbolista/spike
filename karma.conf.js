var path = require('path'),
  webpack_config = require('./client/config/test/webpack');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      'test.client.js',
    ],
    basePath: './',
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'test.client.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    webpack: webpack_config
  });
};
