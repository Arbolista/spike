/*eslint-env node*/

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const CLIENT = __dirname + '/../..';
const ROOT = CLIENT + '/..';

module.exports = {
  entry: {
    app: __dirname + '/../app/design',
    style: __dirname + '/../style/vendor'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../../build/design/assets'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader', 'raw-loader!sass-loader')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader',  'raw-loader')
      }, {
        test: /\.js$/,
        loader: 'babel-loader'
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  sassLoader: {
    includePaths: [CLIENT, ROOT + '/node_modules']
  },
  plugins: [
    new ExtractTextPlugin('css/vendor.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      api: __dirname + '/../../api/design',
      config: __dirname + '/../../config/design',
      models: __dirname + '/../../models',
      lib: __dirname + '/../../lib',
      shared: __dirname + '/../../../shared'
    }
  }
}
