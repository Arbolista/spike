/*global module*/

import React from 'react';

import template from './missing.rt.html';
import SpikeComponent from 'espina/shared/base_component';

class MissingComponent extends SpikeComponent {

  get template(){
    return template;
  }

}

MissingComponent.propTypes = {

};

module.exports = MissingComponent;
