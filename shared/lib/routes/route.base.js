import {DEFINITIONS} from './../routes';

export default class RouteBase {

  constructor(){
    let route = this,
        route_definition = DEFINITIONS[route.route_name];
    route.params = {};
    Object.assign(route, route_definition);
  }

  matchesLocation(location){
    let route = this;
    return route.path.test(location.pathname);
  }

  // location is a React History location object.
  setParams(location){
    let route = this,
      match = location.pathname.match(route.path);
console.log('RouteBase#setParams')
    if (match){
      for (let i in route.parameters){
        let param = route.parameters[i],
          value = match[i];
        route.params[param] = value;
      }
      Object.assign(route.params, location.query || {});
    }
  }

}

