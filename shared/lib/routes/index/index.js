/*global Promise*/

import RouteBase from './../route.base';

export default class IndexRoute extends RouteBase {

  get route_name(){
    return 'IndexRoute';
  }

  assureData(_state){
    return Promise.resolve();
  }

}
