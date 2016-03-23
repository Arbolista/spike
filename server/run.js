process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var App = require(path.join(__dirname, 'config', process.env.NODE_ENV, 'app'));

App.run();
