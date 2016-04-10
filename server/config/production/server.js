import express from 'express';
import os from 'os'

import ServerBase from './../server.base';

const APP_PORT = 3000;

/*global console*/

class Server extends ServerBase {

  constructor(){
    super();
    var server = this;
    server.app = express();
  }

  run(){
    var server = this;
    server.config();

    server.app.listen(APP_PORT, () => {
      console.info(`App is now running on ${os.hostname()}`);
    });
  }

}

export default Server;
