/*global __dirname process GLOBAL*/

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import StateManager from './../../shared/lib/state_manager/state_manager';
import Router from './../../shared/lib/router/router';
import {ROUTES} from './../../shared/lib/routes';
import Layout from './../../shared/components/layout/layout.component';

class ServerBase {

  config(){
    GLOBAL.JS_ENV = 'server';
    var server = this,
        app = server.app;

    // serve public static files.
    app.use('/', express.static(path.resolve(__dirname, '../../client/build', process.env.NODE_ENV.toLowerCase())));

    app.use(favicon(__dirname + '/../assets/favicon.ico'));
    app.use(logger('dev'));

    // view engine set up
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, '..', 'views'));

    app.get('*', ServerBase.renderReact);
  }

  static renderReact(req, res, _next){
    var state_manager = new StateManager(),
        router = new Router(state_manager, ROUTES);
    return state_manager.getInitialData()
      .then(()=>{
        return router.setLocation({
          pathname: req.path,
          query: req.query
        });
      })
      .then(()=>{
        let props = Object.assign({state_manager: state_manager, router: router}, state_manager.state),
            layout = React.createFactory(Layout)(props),
            meta = {},
            prerender_content;
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
