/*global require __dirname*/

// Vendor Stylesheets
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');

// other css assets.
let cssContext = require.context(__dirname + '/../../../server/assets/css', true);
cssContext.keys().forEach(cssContext);

// component context
let componentContext = require.context(__dirname + '/../../../shared/components', true, /\.s?css$/);
componentContext.keys().forEach(componentContext);
