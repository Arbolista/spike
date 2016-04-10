import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import Layout from './../../client/components/layout/layout.component';
import StateManager from './../lib/state_manager/state_manager';

/*global __dirname*/

class ServerBase {

  config(){
    var server = this,
        app = server.app;

    // serve public static files.
    app.use('/', express.static(path.resolve(__dirname, '..', 'assets')));

    app.use(favicon(__dirname + '/../assets/favicon.ico'));
    app.use(logger('dev'));

    // view engine set up
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, '..', 'views'));

    app.get('*', ServerBase.renderReact);
  }

  static renderReact(req, res, _next){
    var state_manager = new StateManager();
    return state_manager.getInitialData()
      .then(()=>{
        return state_manager.updateStateFromUrl({
          pathname: req.path,
          query: req.query
        });
      })
      .then(()=>{
        var props = Object.assign({state_manager: state_manager}, state_manager.state),
            layout = React.createFactory(Layout)(props),
            meta = {},
            prerender_content = ReactDOMServer.renderToString(layout);

        if (state_manager.state.example){
          meta.example_id = state_manager.state.example.data.id;
        }
        res.set('Content-Type', 'text/html');
        res.render('index', {
          prerender_content: prerender_content,
          prerender_data: {examples: state_manager.examples},
          meta: meta
        });
        return undefined
      });
  }

}

export default ServerBase;
