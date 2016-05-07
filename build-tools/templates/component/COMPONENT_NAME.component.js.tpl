/*global module*/

import React from 'react';

class <%=  componentNameCamelCase %>Component extends React.Component {

  constructor(props, context){
    super(props, context);
    var <%=  componentNameLowerCase %> = this;
    <%=  componentNameLowerCase %>.has_template = true;
    <%=  componentNameLowerCase %>.state = {}
  }

  componentDidMount() {
    var <%=  componentNameLowerCase %> = this;
  }

  render(){
    let template;
    if (!DESIGN){
      template = require('./componentNameLowerCase.rt.html');
    } else {
      let DesignComponentTemplateLoader = require('design_component_template_loader')
      template = DesignComponentTemplateLoader.forComponent(this.constructor);
    }
    return template.call(this);
  }

}

<%=  componentNameCamelCase %>Component.propTypes = {

};

<%=  componentNameCamelCase %>Component.NAME = '<%=  componentNameCamelCase %>';

module.exports = <%=  componentNameCamelCase %>Component;
