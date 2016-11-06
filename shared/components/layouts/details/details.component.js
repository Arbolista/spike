/*global module*/

import React from 'react';

import SpikeComponent from 'espina/shared/base_component';
import authenticate from 'shared/lib/mixins/authenticate_component';
import template from './details.rt.html';
import detailsContainer from './details.container';

class DetailsComponent
  extends authenticate(SpikeComponent) {

  constructor(props, context){
    super(props, context);
    var details = this;
    details.has_template = true;
    details.state = {}
  }

  componentDidMount() {
    this.props.ensureExamples(this.props.session.get('token'));
    this.props.detailExample({
      id: this.example_id,
      token: this.props.session.get('token')
    });
  }

  get template(){
    return template;
  }

  get example_id(){
    return parseInt(this.props.location.getIn(['params', 'example_id']));
  }

  get data_loaded(){
    return this.examples_loaded && this.current_example_loaded;
  }

  get examples_loaded(){
    return this.props.examples && !this.props.examples.get('load_error');
  }

  get current_example_loaded(){
    return this.props.current_example &&
      !this.props.current_example.get('load_error') &&
      !this.props.current_example.get('loading');
  }

  get current_example(){
    return this.props.examples.getIn(['examples', this.example_id.toString()]);
  }

  get example_full_name(){
    return `${this.current_example.get('first_name')} ${this.current_example.get('last_name')}`;
  }

  get skills(){
    return this.props.current_example.get('skills').toJS();
  }

  close(){
    this.pushRoute('Index');
  }

}

DetailsComponent.propTypes = {
  detailExample: React.PropTypes.func.isRequired,
  ensureExamples: React.PropTypes.func.isRequired,
  examples: React.PropTypes.object,
  session: React.PropTypes.object.isRequired,
  current_example: React.PropTypes.object,
  location: React.PropTypes.object.isRequired
};

module.exports = detailsContainer(DetailsComponent);
