import FsHelper from './../lib/fs_helper';

import express from 'express';
import bodyParser from 'body-parser';

const CONTROLLER_DIR = __dirname + '/../controllers';

class Api {

  static config(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    App.syncControllers();
    Api.route(app);
  }

  static syncControllers(){
    FsHelper.walk(CONTROLLER_DIR, (err, files)=>{
      if (err) throw new Error(err);
      files.forEach((file)=>{
        if (/\.test\.js$/.test(file)) return true;
        var controller = require(CONTROLLER_DIR + '/' + file);
        Api[controller.NAME] = controller;
      });
    });
  }

  // may want to split these out into a separate file when routes get more complicated.
  static route(app){
    app.use('/data/v1/examples', Api.Examples.index);
  }

}

export default Api;
