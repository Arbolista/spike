/*global __dirname module*/

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const CLIENT = __dirname + '/../..';
const ROOT = CLIENT + '/..';

// compile development app here.

module.exports = {
  entry: {
    app: __dirname + '/../development/app',
    style: __dirname + '/../development/style'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: __dirname + '/../assets'
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
      }, {
        test: /\.template\.html/,
        loader: 'react-templates-loader?targetVersion=0.14.0'
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
      config: __dirname + '/../../config/production',
      models: __dirname + '/../../models',
      lib: __dirname + '/../../lib',
      shared: __dirname + '/../../../shared'
    }
  }
}
