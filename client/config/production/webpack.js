/*global __dirname module*/

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const CLIENT = __dirname + '/../..';
const ROOT = CLIENT + '/..';

// NOTE: This configuration is exactly the same as development, except it is minimized and users the extract text plugin.

module.exports = {
  entry: {
    app: __dirname + '/../development/app',
    style: __dirname + '/../development/style'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: __dirname + '/../../build/production'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'raw-loader!sass-loader')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'raw-loader')
      }, {
        test: /\.js$/,
        loader: 'babel'
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
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      api: __dirname + '/../../api/production',
      client: __dirname + '/../..',
      shared: __dirname + '/../../../shared'
    }
  }
}
