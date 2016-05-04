/*global document window*/

import 'babel-polyfill';
import 'bootstrap/dist/js/bootstrap.min';
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './../shared/components/layout/layout.component';
import StateManager from './../shared/lib/state_manager/state_manager';
import Router from './../shared/lib/router/router';
import {ROUTES} from './../shared/lib/routes.js';

// Pass in an instance of ReactJs History function - with either browser or hash history.
export default function(createHistory){

  window.JS_ENV = 'client';

  var state_manager = new StateManager(),
      router = new Router(state_manager, ROUTES);
  state_manager.getInitialData()
    .then(()=>{
      return router.setLocation(router.current_location);
    })
    .then(()=>{
      var initial_props = Object.assign({
        state_manager: state_manager,
        createHistory: createHistory,
        router: router
      }, state_manager.state);
      ReactDOM.render(
        React.createElement(Layout, initial_props),
        document.getElementById('root')
      );
    });
}
