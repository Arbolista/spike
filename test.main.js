// Require babel polyfill for browser.
require('babel-polyfill');

var testsContext = require.context('./spec', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./src', true, /\.js$/);
srcContext.keys().forEach(srcContext);
