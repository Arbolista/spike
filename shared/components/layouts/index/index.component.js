/*global module*/

import React from 'react';
import _ from 'lodash';
import { toJS } from 'immutable';

import template from './index.rt.html';
import SpikeComponent from 'shared/lib/base_classes/spike_component';
import authenticate from 'shared/lib/mixins/authenticate_component';
import indexContainer from './index.container';
import { detailExample } from 'shared/reducers/current_example.reducer';

class IndexComponent
  extends authenticate(SpikeComponent) {

  get template(){
    return template;
  }

  get examples(){
    return this.props.examples && _.values(this.props.examples.get('examples').toJS());
  }

  get data_loaded(){
    return !!this.props.examples && !this.props.examples.get('load_error');
  }

  componentDidMount(){
    this.props.ensureExamples(this.props.session.get('token'));
  }

  detailExample(example){
    // route_name, action, payload.
    this.pushRoute('Details', detailExample, {id: example.id});
  }

}

IndexComponent.propTypes = {
  ensureExamples: React.PropTypes.func.isRequired,
  examples: React.PropTypes.object,
  session: React.PropTypes.object.isRequired
};

module.exports = indexContainer(IndexComponent);
