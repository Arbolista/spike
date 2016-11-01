import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { fromJS } from 'immutable';

import ApplicationComponent from 'espina/shared/application_component';
import StateManager from 'espina/server/state_manager';
import Router from 'espina/server/router';
import reducers from "shared/reducers/index"
import {defineRoutes} from 'shared/lib/routes'
import LayoutComponent from 'shared/components/layout/layout.component';

export default function(superclass){

  return class extends superclass {

    handleRequest(req, res, _next) {
      let server = this,
        lang;

      server.setTranslations(req)
        .then((i18n)=>{
          lang = i18n.language;
          return server.prerenderReact(req, i18n)
        })
        .then((prerender_content)=>{
          let meta = {};

          // save language for this user
          // it will be used for client side to
          // decide what to load, hence httpOnly: false
          res.cookie('lang', lang, {
            maxAge: 900000,
            httpOnly: false
          });
          server.saveSessionCookies(req, res);
          res.set('Content-Type', 'text/html');
          res.render('index', {
            prerender_content: prerender_content,
            prerender_data: {},
            meta: meta
          });

          return undefined
        })
        .catch((err)=>{
          server.handleErr(res, err);
        });
    }

    saveSessionCookies(req, res){
      res.cookie('user', req.cookies.user);
      res.cookie('token', req.cookies.token);
    }

    prerenderReact(req, i18n){
    let state_manager = new StateManager(),
          router = new Router(i18n,defineRoutes(i18n));
      let location = {
        pathname: req.path,
        query: req.query
      };
      return new Promise((resolve) => resolve())
        .then(() => {
          let initial_state = StateManager.initialState({
            location: fromJS(router.parseLocation(location))
          }, req.cookies);
          return state_manager.initializeStore(initial_state,reducers);
        })
        .then(()=>{
          let props = {
            stateManager: state_manager,
            router: router,
            i18n: i18n,
            rootComponent: LayoutComponent
          };

          let application = React.createFactory(ApplicationComponent)(props),
              prerender_content = ReactDOMServer.renderToString(application);
          return prerender_content;
        });
    }
  }
}
