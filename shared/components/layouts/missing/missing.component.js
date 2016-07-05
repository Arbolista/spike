/*global module*/

import React from 'react';

import template from './missing.rt.html';
import SpikeComponent from 'shared/lib/base_classes/spike_component';

class MissingComponent extends SpikeComponent {

  get template(){
    return template;
  }

}

MissingComponent.propTypes = {

};

module.exports = MissingComponent;
