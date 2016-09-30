import * as S from 'underscore.string';
import queryString from 'query-string';
import pathToRegexp from 'path-to-regexp';
export default class Route {

  constructor(route_definition){
    let route = this;
    route.params = {};
    route.data = route_definition;
  }

  get key(){
    return S.underscored(this.name);
  }

  get name(){
    return this.data.name;
  }

  get parameters(){
    return this.data.parameters;
  }

  get path(){
    return this.data.path;
  }

  get component(){
    return require(`shared/components/layouts/${this.key}/${this.key}.component`);
  }

  matchesLocation(pathname){
    return this.getMatch(pathname)!=null;
  }
  //Match an array of paths or a single path
  getMatch(pathname) {
    let route = this;
    if (route.data.path instanceof Array) {
      debugger;
      var match=null;
      route.data.path.some((r) => {
        match= this.match(r,pathname);
        return match != null;
      });
      return match;
    }else {
      return this.match(route.data.path,pathname);
    }
  }
  //Match a single path
  match(path,pathname) {
      var keys=[];
      var token = pathToRegexp(path,keys).exec(pathname);
      return token == null ? null: {
        token:token,
        keys:keys
      }
  }

  // location is a React History location object.
  parseParams(location){
    let route = this;  
    var keys=[],params={};
    var tokens = this.getMatch(location.pathname);
    var keys = tokens.keys;
    if (tokens && keys.length!=0){
      var i = 1;
      keys.forEach((e) => params[e.name] = tokens.token[i++] );
    }
    this.params = params;
    return params;
  }

  // route should override if it must use state to generate url
  url(payload, i18n){
    if (this.data.url){
      return this.data.url.call(this, payload, i18n);
    } else {
      let route_path = i18n.t(this.key);
      return `/${i18n.language}/${route_path}`;
    }
  }

}