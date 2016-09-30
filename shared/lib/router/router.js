/*global window NODE_ENV*/
import queryString from 'query-string';
import extend from 'extend';

import { defineRoutes } from '../routes';

export default class Router {

  constructor(i18n, routes) {
    let router = this;

    router.i18n = i18n;
    router.routes = routes || Router.routes(i18n);
  }

  get main_routes(){
    return this.routes.filter((route)=>{ return route.route_name !== 'Missing'; })
  }

  findRoute(pathname) {
    let router = this;
    return router.routes.find((route) => {
      return route.matchesLocation(pathname);
    });
  }

  parseLocation(new_location){
    let route = this.findRoute(new_location.pathname),
        location = {
          pathname: new_location.pathname,
          query: queryString.parse(new_location.search)
        };
    location.route_name = route.name;
    location.params = route.parseParams(location);
    return location;
  }

  static routes(i18n){
    return defineRoutes(i18n);
  }

}
