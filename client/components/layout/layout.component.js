/*global module*/

import React from 'react';

import StateManagerBase from './../../../shared/lib/state_manager';
import template from './layout.rt.html';

class LayoutComponent extends React.Component {

  constructor(props, context){
    super(props, context);
    var layout = this;
    layout.state = {}
  }

  get example(){
    return this.state_manager.state.example;
  }

  get examples(){
    return this.state_manager.examples;
  }

  get state_manager(){
    return this.props.state_manager;
  }

  componentDidMount() {
    var layout = this;
    layout.state_manager.initializeHistory(layout);
  }

  setParam(event){
    var layout = this,
        param = event.target.dataset.param,
        value = event.target.dataset.value;
    layout.state_manager.setParams({
      [param]: value
    });
  }

  syncFromStateManager(fnStateSet){
    var layout = this;

    layout.setState(layout.state_manager.state, ()=>{
      fnStateSet();
      // Prerendered data should be consumed after the first time the
      // state is set from the URL.
      layout.state_manager.destroyPrerenderData();
    });
  }

  render(){
    return template.call(this);
  }

}

LayoutComponent.propTypes = {
  state_manager: React.PropTypes.instanceOf(StateManagerBase).isRequired
};
LayoutComponent.NAME = 'Layout';

module.exports = LayoutComponent;
