var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      'test.main.js',
    ],
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'test.main.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.spec\.js$/,
            include: /spec/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
            },
          }
        ],
        loaders: [
          {
            test: /\.js$/,
            include: /src/,
            exclude: /(node_modules|spec)/,
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          }
        ],
      }
    },
  });
};
