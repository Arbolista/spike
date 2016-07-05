/*global GLOBAL process __dirname require*/

require('app-module-path').addPath(__dirname);

import path from 'path';
import { argv } from 'yargs';

GLOBAL.NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
GLOBAL.API_BASE_URL = process.env.API_BASE_URL = argv.api_base_url || '';

var env_server_path = path.join(`${__dirname}/server/config/${NODE_ENV}/server`),
    env_server_class = require(env_server_path).default,
    server = new env_server_class();

server.run();
