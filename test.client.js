/*global require*/

// this script is run through karma (see npm test).

// Require babel polyfill for browser.
require('babel-polyfill');

var modelContext = require.context('./client/models', true, /^((?!test\.js$).)*\.js$/);
modelContext.keys().forEach(modelContext);

var libContext = require.context('./client/lib', true, /^((?!test\.js$).)*\.js$/);
libContext.keys().forEach(libContext);

var componentContext = require.context('./client/components', true, /^((?!test\.js$).)*\.js$/);
componentContext.keys().forEach(componentContext);

var clientTestContext = require.context('./client', true, /\.test\.js$/);
clientTestContext.keys().forEach(clientTestContext);
