/*global Promise*/

import SharedRoute from './../route.base';

export default class MissingRoute extends SharedRoute {

  get route_name(){
    return 'MissingRoute';
  }

  assureData(_state){
    return Promise.resolve();
  }

}
