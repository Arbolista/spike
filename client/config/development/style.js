/*global require __dirname*/

// Vendor Stylesheets
require('bootstrap/dist/css/bootstrap.min.css');

// other css assets.
let cssContext = require.context(__dirname + '/../../assets/css', true);
cssContext.keys().forEach(cssContext);

// component context
require(__dirname + '/../../components/layout/layout.scss');
