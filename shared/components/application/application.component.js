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

  getChildContext() {
    return {
      i18n: this.state.i18n
    };
  }

  render() {
    return React.createElement(LayoutComponent, this.props);
  }

}

ApplicationComponent.propTypes =  Object.assign({}, LayoutComponent.propTypes,{
  i18n: React.PropTypes.any
});

ApplicationComponent.childContextTypes = {
  i18n: React.PropTypes.any
}


ApplicationComponent.NAME = 'Application';

module.exports = ApplicationComponent;
