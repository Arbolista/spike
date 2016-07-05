import React from 'react';
import ReactDOMServer from 'react-dom/server';

import ApplicationComponent from 'shared/components/application/application.component';
import StateManager from 'shared/lib/state_manager/state_manager';

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
      let state_manager = new StateManager();
      let location = {
        pathname: req.path,
        query: req.query
      };
      return state_manager.getInitialData()
        .then(() => {
          return state_manager.initializeRouterAndStore(i18n, location, req.cookies);
        })
        .then((router)=>{
          let props = {
            state_manager: state_manager,
            router: router,
            i18n: i18n
          };

          let application = React.createFactory(ApplicationComponent)(props),
              prerender_content = ReactDOMServer.renderToString(application);
          return prerender_content;
        });
    }
  }
}
