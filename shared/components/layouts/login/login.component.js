/*global module*/

import React from 'react';

import SpikeComponent from 'espina/shared/base_component';
import template from './login.rt.html';
import container from './login.container';
import { login } from 'shared/reducers/session.reducer';

class LoginComponent extends SpikeComponent {

  constructor(props, context){
    super(props, context);
    var login = this;
    login.state = {};
  }

  get template(){
    return template;
  }

  login(){
    this.pushRoute('Index', login);
  }

}

LoginComponent.propTypes = {
  login: React.PropTypes.func.isRequired
};

module.exports = container(LoginComponent);
