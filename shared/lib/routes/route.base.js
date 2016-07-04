import * as S from 'underscore.string';
import queryString from 'query-string';

export default class RouteBase {

  constructor(route_definition){
    let route = this;
    route.params = {};
    Object.assign(route, route_definition);
  }

  get key(){
    return S.underscored(this.route_name);
  }

  matchesLocation(pathname){
    let route = this;
    return route.path.test(pathname);
  }

  // location is a React History location object.
  setParams(location){
    let route = this,
        match = location.pathname.match(route.path);
    route.params = {};
    if (match){
      for (let i in route.parameters){
        let param = route.parameters[i],
            value = match[i];
        route.params[param] = value;
      }

      if (location.query){
        let query = location.query;
        if (typeof query === 'string'){
          query = queryString.parse(query);
        }
        Object.assign(route.params, query);
      }
    }
    return route.params;
  }

  // route should override if it must use state to generate url
  url(_action, i18n){
    let route = this,
        route_path = i18n.t(route.key);
    return `/${i18n.language}/${route_path}`;
  }

}
