/*global module */
import 'babel-polyfill';
import React from 'react';
import LayoutComponent from '../layout/layout.component';

class ApplicationComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      i18n: props.i18n
    };
  }

  render() {
    let result = React.createElement(LayoutComponent, Object.assign({}, this.props, {
      i18n: this.state.i18n
    }));
    return result;
  }

}
ApplicationComponent.propTypes = Object.assign({}, LayoutComponent.propTypes, {
  i18n: React.PropTypes.any
});

ApplicationComponent.NAME = 'Application';

module.exports = ApplicationComponent;
