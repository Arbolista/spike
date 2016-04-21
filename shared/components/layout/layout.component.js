/*global module*/

import React from 'react';
import _ from 'lodash';

import StateManager from './../../lib/state_manager/state_manager';
import Router from './../../lib/router/router';
import BaseRoute from './../../lib/routes/route.base';
import BaseExample from './../../models/example/example.base';
import template from './layout.rt.html';

class LayoutComponent extends React.Component {

  constructor(props, context){
    super(props, context);
    var layout = this;
    layout.state = {}
  }

  get state_manager(){
    return this.props.state_manager;
  }

  get router(){
    return this.props.router;
  }

  get example(){
    return this.state_manager.state.example;
  }

  get examples(){
    return this.state_manager.examples;
  }

  get route_name(){
    return this.state_manager.state.route.route_name;
  }

  componentDidMount() {
    var layout = this;
    layout.router.initializeHistory(layout);
  }

  goToExample(event){
    var layout = this,
        value = event.target.dataset.value;
      console.log('component#goToExample')
    layout.router.goToExample(value);
  }

  syncFromStateManager(){
    var layout = this;
    console.log('Layout#syncFromStateManager')
    return new Promise((fnResolve, fnReject)=>{
      layout.setState(layout.state_manager.state, ()=>{
        // Prerendered data should be consumed after the first time the
        // state is set from the URL.
        console.log('new state has been set')
        layout.destroyPrerenderData();
        fnResolve();
      });
    });
  }

  destroyPrerenderData(){
    var prerender_data = document.getElementById('prerender_data');
    window.PrerenderData = undefined;
    if (prerender_data) prerender_data.parentNode.removeChild(prerender_data);
  }

  render(){
    return template.call(this);
  }

}

LayoutComponent.NAME = 'Layout';

module.exports = LayoutComponent;
