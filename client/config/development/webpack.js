import webpack from 'webpack';

module.exports = {
  entry: {
    app: __dirname + '/app',
    style: __dirname + '/style'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../../build/development'
  },
  module: {
      loaders: [
          {
              test: /\.scss$/,
              loaders: ['style', 'raw', 'sass']
          }, {
              test: /\.css$/,
              loaders: ['style', 'raw']
          }, {
            test: /\.js$/,
            loader: 'babel'
          }, {
            test: /\.json$/,
            loader: 'json'
          }, {
            test: /\.template\.html/,
            loader: "react-templates-loader?targetVersion=0.14.0"
          }
      ]
  },
  sassLoader: {
    includePaths: [__dirname + '/../..', __dirname + '/../../../node_modules']
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      })
  ],
  node: {
    fs: "empty"
  },
  resolve: {
      alias: {
          api: __dirname + '/../../api/development',
          config: __dirname + '/../../config/development'
      }
  }
}
