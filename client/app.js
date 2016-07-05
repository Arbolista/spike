/*global document window Promise console*/

import 'babel-polyfill';
import 'bootstrap/dist/js/bootstrap.min';
import React from 'react';
import ReactDOM from 'react-dom';
import XHR from 'i18next-xhr-backend';

import StateManager from 'client/lib/state_manager';
import ApplicationComponent from 'shared/components/application/application.component';
import i18nFactory from 'shared/lib/i18n/i18nFactory';
import Router from 'shared/lib/router/router';

function setTranslations(){
  return new Promise((resolve, reject) => {
    try {
      let i18n = i18nFactory('', XHR, ()=>{
        let language = Router.locale() || i18n.language;

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

  var state_manager = new StateManager(), i18n;

  setTranslations()
    .then((_i18n)=>{
      i18n = _i18n;
      return state_manager.getInitialData();
    })
    .then(()=>{
      let location = Router.currentWindowLocation();
      return state_manager.initializeRouterAndStore(i18n, location)
    })
    .then((router) => {
      var initial_props = {
        state_manager: state_manager,
        router: router,
        createHistory: createHistory,
        i18n: i18n
      };
      ReactDOM.render(
        React.createElement(ApplicationComponent, initial_props),
        document.getElementById('root'));
    })
    .catch((err)=>{
      console.error(err.stack);
    });
}
