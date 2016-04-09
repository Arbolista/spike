import 'babel-polyfill';
import 'bootstrap/dist/js/bootstrap.min';
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/layout/layout.component';
import StateManager from './lib/state_manager/state_manager';

// Pass in an instance of ReactJs History function - with either browser or hash history.
export default function(createHistory){

  var state_manager = new StateManager();
  state_manager.getInitialData()
    .then(()=>{
      var initial_props = Object.assign({state_manager: state_manager}, state_manager.state, {createHistory: createHistory});
      ReactDOM.render(
        React.createElement(Layout, initial_props),
        document.getElementById('root')
      );
    });
};
