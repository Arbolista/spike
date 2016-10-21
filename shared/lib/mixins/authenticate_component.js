import React from 'react';

import Login from 'shared/components/layouts/login/login.component';

export default function(superclass){

  return class extends superclass {


    render(){
      let component = this;
      if (component.logged_in){
        return component.template.call(component);
      } else {
        return React.createElement(Login, {
          login: this.props.login
        });
      }
    }

  }

}
