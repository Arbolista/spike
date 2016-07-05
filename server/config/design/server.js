/*global console*/

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import ServerBase from '../server.base';
import config from 'client/config/design/webpack';

const APP_PORT = 3000;

class Server extends ServerBase {

  constructor(){
    super();
    var server = this;
    server.dev_server = new WebpackDevServer(webpack(config), {
      contentBase: './../../../client/build/design',
      publicPath: '/assets/',
      stats: {colors: true}
    });

    server.app = server.dev_server.app;
  }

  handleRequest(req, res, _next) {
    let server = this,
      lang;

    server.setTranslations(req)
      .then((i18n)=>{
        lang = i18n.language;

        // save language for this user
        // it will be used for client side to
        // decide what to load, hence httpOnly: false
        res.cookie('lang', lang, {
          maxAge: 900000,
          httpOnly: false
        });
        res.set('Content-Type', 'text/html');
        res.render('index', {
          prerender_content: '',
          prerender_data: {},
          meta: {}
        });

        return undefined
      })
      .catch((err)=>{
        server.handleErr(res, err);
      });
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
