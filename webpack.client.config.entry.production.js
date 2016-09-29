require('babel-register')

module.exports = require(require('path').resolve(__dirname, './client/config/production/webpack.config.client'))