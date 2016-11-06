/*global module*/

import React from 'react';

import template from './footer.rt.html';
import SpikeComponent from 'espina/shared/base_component';

class FooterComponent extends SpikeComponent {

  get template(){
    return template;
  }

}

FooterComponent.propTypes = {

};

module.exports = FooterComponent;
