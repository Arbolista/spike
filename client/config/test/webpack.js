/*global require module __dirname*/

var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    preLoaders: [
      {
        test: /\.test\.js$/,
        include: /(client|shared)/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ],
    loaders: [
      {
        test: /^((?!test\.js$).)*\.js$/,
        include: /(client|shared|server)/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'window.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'window.BASE_URL': `"${process.env.API_BASE_URL}"`
    })
  ],
  resolve: {
    alias: {
      api: __dirname + `/../../api/fixture`,
      assets: __dirname + '/../../../server/assets',
      client: __dirname + '/../..',
      shared: __dirname + '/../../../shared'
    }
  }
};
