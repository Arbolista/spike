require('babel-register')

module.exports = require(require('path').resolve(__dirname, './server/config/production/webpack'))