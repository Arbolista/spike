// Require babel polyfill for browser.
require('babel-polyfill');

var componentContext = require.context('./client/components', true, /\.component\.js$/);
componentContext.keys().forEach(componentContext);

var componentTestContext = require.context('./client/components', true, /\.test\.js$/);
componentTestContext.keys().forEach(componentTestContext);
