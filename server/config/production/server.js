import express from 'express';
import os from 'os'
import webpack from 'webpack';

import ServerBase from '../server.base';
import serverRenderable from 'server/lib/mixins/server_renderable';
import webpack_config from 'client/config/production/webpack';

const APP_PORT = 3000;

/*global console*/

class Server extends serverRenderable(ServerBase) {

  constructor(){
    super();
    var server = this;
    server.app = express();
  }

  run(){
    var server = this;

    // returns a Compiler instance
    webpack(webpack_config, function(err, stats) {
      server.config();

      server.app.listen(APP_PORT, () => {
        console.info(`App is now running on ${os.hostname()}`);
      });
    });
  }

}

export default Server;
