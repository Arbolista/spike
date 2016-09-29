require('app-module-path').addPath(__dirname);


var env_server_class = require("./server/config/development/server.js").default,
server = new env_server_class();
server.run();