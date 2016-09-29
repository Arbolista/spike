/*global console*/
import express from 'express';
import os from 'os'
import webpack from 'webpack'; 

import ServerBase from '../server.base';
import serverRenderable from '../../lib/mixins/server_renderable';
import config from '../../../server/config/development/webpack';

import cookieParser from 'cookie-parser';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import Backend from 'i18next-node-fs-backend';

const APP_PORT = 3000;

class Server extends serverRenderable(ServerBase) {

  constructor(){
    super();
    var server = this;
    server.app = express();
  }

  run(){
    var server = this;
  
    webpack(config, function(err, stats) {
      server.config();
      server.app.set('views', path.resolve(__dirname, '../../server/', 'views'));
      server.app.use('/assets', express.static(path.resolve(__dirname, '../../assets')));

      server.app.listen(APP_PORT, () => {
        console.info(`App is now running on ${os.hostname()}:${APP_PORT}`);
      });
   });
  }

}


export default Server;