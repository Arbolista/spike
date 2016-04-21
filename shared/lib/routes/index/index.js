/*global Promise*/

import SharedRoute from './../route.base';

export default class IndexRoute extends SharedRoute {

  get route_name(){
    return 'IndexRoute';
  }

  assureData(_state){
    return Promise.resolve();
  }

}
