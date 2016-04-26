/*global module*/

import React from 'react';
import template from './<%=  componentNameLowerCase%>.rt.html';

class <%=  componentNameCamelCase %>Component extends React.Component {

  constructor(props, context){
    super(props, context);
    var <%=  componentNameLowerCase %> = this;
    <%=  componentNameLowerCase %>.state = {}
  }

  componentDidMount() {
    var <%=  componentNameLowerCase %> = this;
  }

  render(){
    return template.call(this);
  }

}

<%=  componentNameCamelCase %>Component.propTypes = {

};

<%=  componentNameCamelCase %>Component.NAME = '<%=  componentNameCamelCase %>';

module.exports = <%=  componentNameCamelCase %>Component;
