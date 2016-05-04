/*global Promise*/

import RouteBase from './../route.base';

export default class MissingRoute extends RouteBase {

  get route_name(){
    return 'MissingRoute';
  }

  assureData(_state){
    return Promise.resolve();
  }

}
