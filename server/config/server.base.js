/*global __dirname process GLOBAL JS_ENV Promise */

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import StateManager from './../../shared/lib/state_manager/state_manager';
import Router from './../../shared/lib/router/router';
import {
  ROUTES
} from './../../shared/lib/routes';
import ApplicationComponent from './../../shared/components/application/application.component';
import i18nFactory from './../../shared/lib/i18n/i18nFactory';
import Backend from 'i18next-node-fs-backend';


class ServerBase {

  config() {
    GLOBAL.JS_ENV = 'server';
    var server = this,
        app = server.app;

    // serve public static files.
    app.use('/', express.static(path.resolve(__dirname, '../../client/build', process.env.NODE_ENV.toLowerCase())));
    app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

    app.use(favicon(__dirname + '/../assets/favicon.ico'));
    app.use(logger('dev'));

    // view engine set up
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, '..', 'views'));

    app.get('*', ServerBase.renderReact);
  }

  static renderReact(req, res, _next) {
    let i18n;
    try {
      var state_manager = new StateManager(),
          router = new Router(state_manager, ROUTES);
      return state_manager.getInitialData()
        .then(() => {
          return router.setLocation({
            pathname: req.path,
            query: req.query
          });
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            try {
              i18n = i18nFactory(JS_ENV, __dirname, Backend, resolve);
            } catch (e) {
              reject(e);
            }
          })
        })
        .then(() => {

          let props = Object.assign({
            environment: JS_ENV,
            state_manager: state_manager,
            router: router,
            i18n: i18n
          }, state_manager.state);

          let application = React.createFactory(ApplicationComponent)(props);
          let meta = {};
          let prerender_content = ReactDOMServer.renderToString(application);

          if (state_manager.state.example) {
            meta.example_id = state_manager.state.example.data.id;
          }
          res.set('Content-Type', 'text/html');
          res.render('index', {
            prerender_content: prerender_content,
            prerender_data: {
              examples: state_manager.examples
            },
            meta: meta
          });

          return undefined
        });
    } catch (e) {
      res.set('Content-Type', 'text/html');
      res.render('index', {
        prerender_content: e
      });
      return undefined;
    }
  }
}

export default ServerBase;
