/*global require window*/

// this script is run through karma (see npm test).

// Require babel polyfill for browser.
require('babel-polyfill');

[
  require.context('./shared', true, /^((?!test\.js$).)*\.js$/),
  require.context('./client', true, /^((?!test\.js$).)*\.js$/),
  require.context('./client', true, /\.test\.js$/),
  require.context('./shared', true, /\.test\.js$/)
].forEach((context)=>{
  context.keys().forEach(context);
});
