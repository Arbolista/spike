/*global __dirname module*/

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const CLIENT = __dirname + '/../..';
const ROOT = CLIENT + '/..';

// Identical to development webpack config, except minified.
module.exports = {
  context: __dirname + '/../../../',
  entry: {
    app: __dirname + '/entry',
    style: __dirname + '/style'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: __dirname + '/../../../build/production'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.scss$/,
        loaders: //ExtractTextPlugin.extract({fallbackLoader:'style', loader:'css!sass?sourceMap=true'})
        [
          'style-loader',
          'css-loader?importLoaders=2&sourceMap',
          'postcss-loader',
          'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        ]
      }, {
        test: /\.css$/,
        loaders: //ExtractTextPlugin.extract('style', 'css?sourceMap=true')
       [
          'style-loader',
          'css-loader?importLoaders=2&sourceMap',
          'postcss-loader',
          'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        ]
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
      }, {
        test: /\.rt\.html$/,
        loader: 'react-templates-loader?targetVersion=0.14.0'
      }
    ]
  },
  /*sassLoader: {
    includePaths: [CLIENT, ROOT + '/node_modules']
  },*/
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
  node: {
    fs: 'empty',
    __dirname: true
  },
  resolve: {
    alias: {
      api: __dirname + `/../../api/fixture`,
      assets: __dirname + '/../../../server/assets',
      client: __dirname + '/../..',
      shared: __dirname + '/../../../shared',
      server: __dirname + '/../../../server'
       
    }
  }
}

