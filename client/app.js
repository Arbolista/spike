/*global document window Promise console*/

import 'babel-polyfill';
import 'bootstrap/dist/js/bootstrap.min';
import React from 'react';
import ReactDOM from 'react-dom';
import Helper from './lib/helper';

import ApplicationComponent from './../shared/components/application/application.component';
import StateManager from './../shared/lib/state_manager/state_manager';
import Router from './../shared/lib/router/router';
import i18nFactory from './../shared/lib/i18n/i18nFactory';
import {
  ROUTES
} from './../shared/lib/routes.js';
import XHR from 'i18next-xhr-backend';

function setTranslations(router){
  return new Promise((resolve, reject) => {
    try {
      let i18n = i18nFactory(window.JS_ENV, '', XHR, ()=>{
        let language = router.getQueryParam('lang') || Helper.getCookieValue('lang') ||  i18n.language;

        if (language && language !== i18n.language) {
          i18n.changeLanguage(language, resolve);
        } else {
          resolve(i18n);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

// Pass in an instance of ReactJs History function - with either browser or hash history.
export default function(createHistory) {

  window.JS_ENV = 'client';
  window.DESIGN = window.DESIGN || false;

  var state_manager = new StateManager(),
      router = new Router(state_manager, ROUTES);

  state_manager.getInitialData()
    .then(()=>{
      return router.setLocationToCurrentUrl();
    })
    .then(() => {
      return setTranslations(router);
    })
    .then((i18n) => {
      var initial_props = Object.assign({
        environment: window.JS_ENV,
        state_manager: state_manager,
        createHistory: createHistory,
        router: router,
        i18n: i18n
      }, state_manager.state);

      ReactDOM.render(
        React.createElement(ApplicationComponent, initial_props),
        document.getElementById('root'));
    })
    .catch((err)=>{
      console.error(err);
    });
}
