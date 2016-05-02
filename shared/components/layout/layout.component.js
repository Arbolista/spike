/*global module Promise document window*/

import React from 'react';

import StateManager from './../../lib/state_manager/state_manager';
import Router from './../../lib/router/router';
//import RouteBase from './../../lib/routes/route.base';
import ExampleBase from './../../models/example/example.base';
import template from './layout.rt.html';


class LayoutComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    var layout = this;
    layout.state = {};
  }

  get t() {

    if (!this.props || !this.props.i18n) {
      // component not wrapped - probably unit test
      return (key) => {
        // no translation - used for checking the keys
        return key;
      };
    } else {
      return this.props.i18n.getFixedT('en', 'translation');
    }
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
    return template.call(this);
  }

}
LayoutComponent.propTypes = {
  environment: React.PropTypes.any,
  state_manager: React.PropTypes.instanceOf(StateManager).isRequired,
  router: React.PropTypes.instanceOf(Router).isRequired,
  route: React.PropTypes.any,
  example: React.PropTypes.instanceOf(ExampleBase),
  i18n: React.PropTypes.any
}

LayoutComponent.NAME = 'Layout';

module.exports = LayoutComponent;
