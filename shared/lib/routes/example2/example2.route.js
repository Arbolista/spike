/*global*/

import RouteBase from '../route.base';

class Example2 extends RouteBase {

  get route_name(){
    return 'Example2';
  }

  get component(){
    return require('shared/components/layouts/example2/example2.component');
  }

}

export default Example2;

