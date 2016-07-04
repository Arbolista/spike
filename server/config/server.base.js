/*global __dirname process GLOBAL JS_ENV Promise console*/

import express from 'express';
import cookieParser from 'cookie-parser';
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
    GLOBAL.DESIGN = false;
    var server = this,
        app = server.app;

    app.use(cookieParser());
    // serve public static files.
    app.use('/', express.static(path.resolve(__dirname, '../../client/build', process.env.NODE_ENV.toLowerCase())));
    app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

    app.use(favicon(__dirname + '/../../client/assets/favicon.ico'));
    app.use(logger('dev'));

    // view engine set up
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, '..', 'views'));

    app.get('*', ServerBase.handleRequest);
  }

  static handleRequest(req, res, _next) {
    let lang;

    ServerBase.setTranslations(req)
      .then((i18n)=>{
        lang = i18n.language;
        return ServerBase.prerenderReact(req, i18n)
      })
      .then((data)=>{
        let prerender_content = data[0],
            state_manager = data[1],
            meta = {};
        if (state_manager.example_id){
          meta.example_id = state_manager.example_id;
        }
        // save language for this user
        // it will be used for client side to
        // decide what to load, hence httpOnly: false
        res.cookie('lang', lang, {
          maxAge: 900000,
          httpOnly: false
        });
        res.set('Content-Type', 'text/html');
        res.render('index', {
          prerender_content: prerender_content,
          prerender_data: {
            examples: state_manager.examples
          },
          meta: meta
        });

        return undefined
      })
      .catch((err)=>{
        ServerBase.handleErr(res, err);
      });
  }

  static prerenderReact(req, i18n){
    var state_manager = new StateManager(),
        router = new Router(state_manager, ROUTES);
    return state_manager.getInitialData()
      .then(() => {
        return router.setLocation({
          pathname: req.path,
          query: req.query
        });
      })
      .then(()=>{
        let props = Object.assign({
          environment: JS_ENV,
          state_manager: router.state_manager,
          router: router,
          i18n: i18n
        }, state_manager.state);

        let application = React.createFactory(ApplicationComponent)(props),
            prerender_content = ReactDOMServer.renderToString(application);
        return [prerender_content, state_manager];
      });
  }

  static setTranslations(req){
      // get the language from url
    // or from cookie
    // or fallback to english
    let lang = (req.query && req.query.lang) ||
      (req.cookies && req.cookies['lang']);

    let i18n;

    return new Promise((resolve, reject) => {
      try {
        i18n = i18nFactory(__dirname, Backend, resolve);
      } catch (e) {
        reject(e);
      }
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        try {
          if (lang && lang !== i18n.language) {
            i18n.changeLanguage(lang, () => {
              resolve(i18n);
            });
          } else {
            lang = i18n.language;
            resolve(i18n);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  static handleErr(res, err){
    res.set('Content-Type', 'text/html');
    let prerender_content;
    console.error('Error handling response')
    console.error(err);
    if (process.env.NODE_ENV.toLowerCase() === 'production'){
      prerender_content = '<div class="alert alert-danger">Server Error</div>';
    } else {
      prerender_content = JSON.stringify(err, null, 2);
    }
    res.render('index', {
      prerender_content: prerender_content,
      prerender_data: {},
      meta: {}
    });
    return undefined;
  }

}

export default ServerBase;
