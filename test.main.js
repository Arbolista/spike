// Require babel polyfill for browser.
require('babel-polyfill');

var componentContext = require.context('./client/components', true, /\.component\.js$/);
componentContext.keys().forEach(componentContext);

var testContext = require.context('./client', true, /\.test\.js$/);
testContext.keys().forEach(testContext);
