/*global __dirname module*/

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const CLIENT = __dirname + '/../..';
const ROOT = CLIENT + '/..';

module.exports = {
  entry: {
    app: __dirname + '/../app/development',
    style: __dirname + '/../style/app'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: __dirname + '/../../build/development'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader', 'raw-loader!sass-loader')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader',  'raw-loader')
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.jpg$/,
        loader: 'file-loader'
      }, {
        test: /\.otf$/,
        loader: 'url?limit=10000&mimetype=application/font-otf'
      },  {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
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
    })
  ],
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      api: __dirname + '/../../api/development',
      config: __dirname + '/../../config/development',
      models: __dirname + '/../../models',
      lib: __dirname + '/../../lib',
      shared: __dirname + '/../../../shared'
    }
  }
}