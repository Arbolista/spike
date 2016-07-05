import React from 'react';

import Router from 'shared/lib/router/router';
import StateManager from 'shared/lib/state_manager/state_manager';

class ContextableComponent extends React.Component {

  get state_manager(){
    return this.context.state_manager;
  }
  get router(){
    return this.context.router;
  }
  get i18n(){
    return this.context.i18n;
  }

  getChildContext(){
    let component = this;
    return {
      state_manager: component.state_manager,
      router: component.router,
      i18n: component.i18n
    }
  }

}

ContextableComponent.childContextTypes = {
  state_manager: React.PropTypes.instanceOf(StateManager).isRequired,
  router: React.PropTypes.instanceOf(Router).isRequired,
  i18n: React.PropTypes.object.isRequired
}

ContextableComponent.contextTypes = {
  state_manager: React.PropTypes.instanceOf(StateManager).isRequired,
  router: React.PropTypes.instanceOf(Router).isRequired,
  i18n: React.PropTypes.object.isRequired
}

export default ContextableComponent;
