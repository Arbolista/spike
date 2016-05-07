/*global console*/

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import ServerBase from './../server.base';
import config from './../../../client/config/webpack/development';

const APP_PORT = 3000;

class Server extends ServerBase {

  constructor(){
    super();
    var server = this;
    server.dev_server = new WebpackDevServer(webpack(config), {
      contentBase: './../../../client/build/development',
      publicPath: '/assets/',
      stats: {colors: true}
    });

    server.app = server.dev_server.app;
  }

  run(){
    var server = this;
    server.config();

    server.dev_server.listen(APP_PORT, () => {
      console.info(`App is now running on http://localhost:${APP_PORT}`);
    });
  }

}

export default Server;
