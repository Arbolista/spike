import React from 'react';
import { createHistory } from 'history';

import template from './layout.template.html';
import Example from './../../models/example/example';
import StateManager from './../state_manager';

class LayoutComponent extends React.Component {

  constructor(props, context){
    super(props, context);
    var layout = this;
    layout.state = {}
  }

  get example(){
    return this.state.example;
  }

  componentDidMount() {
    var layout = this;
    layout.state_manager = new StateManager(layout.props.createHistory, layout.props.examples);
    layout.state_manager.history.listen((location)=>{
      layout.state_manager.updateStateFromUrl(location, layout);
    });
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
      fnStateSet()
    });
  }

  render(){
    return template.call(this);
  }

}

LayoutComponent.NAME = 'Layout';

module.exports = LayoutComponent;
