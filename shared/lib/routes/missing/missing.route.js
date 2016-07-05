/*global Promise*/

import RouteBase from './../route.base';

export default class Missing extends RouteBase {

  get route_name(){
    return 'Missing';
  }

  get component(){
    return require('shared/components/layouts/missing/missing.component');
  }

}
