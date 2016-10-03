/*global module*/

import React from 'react';

import template from './example2.rt.html';
import SpikeComponent from 'shared/lib/base_classes/spike_component';

class Example2Component extends SpikeComponent {

  get template(){
    return template;
  }

}

Example2Component.propTypes = {

};

module.exports = Example2Component;
