/*global JS_ENV Map Promise require*/

import RouteBase from './../route.base';

class Details extends RouteBase {

  get route_name() {
    return 'Details';
  }

  url(action, i18n){
    let route = this,
        route_path = i18n.t(route.key);
    return `/${i18n.language}/${route_path}/${action.payload.user_id}`;
  }

}

export default Details;
