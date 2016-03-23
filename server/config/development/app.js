import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';

import Api from './../api';
import AppBase from './../app.base';
import config from './../../../client/config/development/webpack';

const API_PORT = 8080;
const APP_PORT = 3000;

class App extends AppBase {

  static get app(){
    if (App.app) return App.app;
    var dev_server = new WebpackDevServer(webpack(config), {
        contentBase: './../../../client/build/development',
        publicPath: "/assets/",
        proxy: {
          '/data*': `http://localhost:${API_PORT}`,
        },
        stats: {colors: true}
      });
    return dev_server.app;
  }

  static get api(){
    if (!App.api) App.api = express();
    return App.api;
  }

  static run(){
    Api.configure(App.api);

    App.api.listen(API_PORT, () => {
      console.log(`API is now running on http://localhost:${API_PORT}`);
    });

    App.configure(App.app);

    App.app.listen(APP_PORT, () => {
      console.log(`App is now running on http://localhost:${APP_PORT}`);
    });
  }
}

export default App;
