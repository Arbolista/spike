/*global module*/

import React from 'react';

import template from './footer.rt.html';
import SpikeComponent from 'shared/lib/base_classes/spike_component';

class FooterComponent extends SpikeComponent {

  get template(){
    return template;
  }

}

FooterComponent.propTypes = {

};

module.exports = FooterComponent;
