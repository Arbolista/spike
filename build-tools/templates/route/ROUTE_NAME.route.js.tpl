/*global*/

import RouteBase from '../route.base';

class <%=  componentNameCamelCase %> extends RouteBase {

  get route_name(){
    return '<%=  componentNameCamelCase %>';
  }

  get component(){
    return require('shared/components/layouts/<%= componentNameLowerCase %>/<%= componentNameLowerCase %>.component');
  }

}

export default <%=  componentNameCamelCase %>;

