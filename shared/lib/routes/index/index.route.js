/*global Promise*/

import RouteBase from './../route.base';

export default class Index extends RouteBase {

  get route_name(){
    return 'Index';
  }

  get component(){
    return require('shared/components/layouts/index/index.component');
  }

  url(_action, _i18n){
    return '';
  }

}
