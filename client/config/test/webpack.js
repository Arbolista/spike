var webpack = require('webpack');

module.exports = {
  cache: true,
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.test\.js$/,
        include: /client/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      }
    ],
    loaders: [
      {
        test: /^((?!test\.js$).)*\.js$/,
        include: /(client|shared)/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      }, {
        test: /\.template\.html/,
        loader: "react-templates-loader?targetVersion=0.14.0"
      }
    ],
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      })
  ],
  resolve: {
      alias: {
          api: __dirname + '/../../api/test',
          config: __dirname + '/../../config/test',
          models: __dirname + '/../../models',
          lib: __dirname + '/../../lib',
          shared: __dirname + '/../../../shared'
      }
  }
};
