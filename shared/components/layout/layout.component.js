/*global module Promise document window DESIGN*/

import React from 'react';

import StateManager from './../../lib/state_manager/state_manager';
import Router from './../../lib/router/router';
//import RouteBase from './../../lib/routes/route.base';
import ExampleBase from './../../models/example/example.base';
import TranslatableComponent from '../translatable/translatable.component';

// NOTE: The template loader is only needed in Design build.
import DesignComponentTemplateLoader from 'design_component_template_loader';
import template from './layout.rt.html';

class LayoutComponent extends TranslatableComponent {

  constructor(props, context) {
    super(props, context);
    var layout = this;
    layout.state = {};
  }

  get state_manager() {
    return this.props.state_manager;
  }

  get router() {
    return this.props.router;
  }

  get example() {
    return this.state_manager.state.example;
  }

  get examples() {
    return this.state_manager.examples;
  }

  get route_name() {
    return this.state_manager.state.route.route_name;
  }

  componentDidMount() {
    var layout = this;
    layout.router.initializeHistory(layout);
  }

  isButtonActive(example_id) {
    let result = this.example && this.example.id === example_id;
    return result;
  }

  goToExample(event) {
    var layout = this,
        value = event.target.dataset.value;
    layout.router.goToExample(value);
  }

  syncFromStateManager() {
    var layout = this;
    return new Promise((fnResolve, _fnReject) => {
      layout.setState(layout.state_manager.state, () => {
        // Prerendered data should be consumed after the first time the
        // state is set from the URL.
        layout.destroyPrerenderData();
        fnResolve();
      });
    });
  }

  destroyPrerenderData() {
    var prerender_data = document.getElementById('prerender_data');
    window.PrerenderData = undefined;
    if (prerender_data) prerender_data.parentNode.removeChild(prerender_data);
  }

  render() {
    if (!DESIGN){
      return template.call(this);
    } else {
      return DesignComponentTemplateLoader.forComponent(this.constructor.NAME).call(this);
    }
  }

}
LayoutComponent.has_template = true;
LayoutComponent.NAME = 'Layout';
LayoutComponent.propTypes = {
  environment: React.PropTypes.any,
  state_manager: React.PropTypes.instanceOf(StateManager).isRequired,
  router: React.PropTypes.instanceOf(Router).isRequired,
  route: React.PropTypes.any,
  example: React.PropTypes.instanceOf(ExampleBase)
}

module.exports = LayoutComponent;
