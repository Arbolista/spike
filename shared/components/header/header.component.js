/*global module*/

import React from 'react';

import template from './header.rt.html';
import SpikeComponent from 'espina/shared/base_component';
import { login, logout } from 'shared/reducers/session.reducer';

class HeaderComponent extends SpikeComponent {

  get template(){
    return template;
  }

  get logged_in(){
    return this.props.logged_in;
  }

  login(){
    this.pushRoute('Index', login);
  }

  logout(){
    this.pushRoute('Login', logout);
  }

}

HeaderComponent.propTypes = {
  logged_in: React.PropTypes.bool.isRequired
};

module.exports = HeaderComponent;
