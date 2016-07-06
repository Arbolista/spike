/*global window NODE_ENV*/
import queryString from 'query-string';
import extend from 'extend';

import { updateLocation } from 'shared/reducers/location.reducer';
import BaseRouter from 'shared/lib/router/router'

const DEFAULT_UPDATE_LOCATION_ACTION = {
  type: updateLocation.getType(),
  payload: {}
};

export default class Router extends BaseRouter {

  get locale(){
    return Router.locale();
  }

  shouldUpdateCurrentRoute(location){
    let router = this;
    return !router.current_route || !router.current_route.matchesLocation(location.pathname);
  }

  initializeHistory(createHistory, store) {
    let router = this;
    router.history = createHistory();
    router.history.listen(router.onLocationChange.bind(router, store));
  }

  // Changing Route

  // this will cause onLocationChange to fire with
  // the new location.
  pushRoute(route_name, action, payload){
    let router = this,
        route = router.routes.getRoute(route_name);

    action = {
      type: action ? action.getType() : updateLocation.getType(),
      payload: payload,
      no_scroll: payload ? payload.no_scroll : false
    };

    router.pushHistory({
      pathname: route.url(action, router.i18n),
      state: action
    });
  }

  pushHistory(location){
    this.history.push(location);
  }

  onLocationChange(store, new_location){
    let router = this;

    if (new_location.action !== 'PUSH') return false;
    if (router.scrollForNewLocation(new_location)) router.scrollToTop();

    let action = extend(true, {payload: {}}, new_location.state) || this.default_update_location_action;

    action.payload['location'] = this.parseLocation(new_location);
    store.dispatch(action);
  }

  get default_update_location_action(){
    return extend(true, {}, DEFAULT_UPDATE_LOCATION_ACTION);
  }

  scrollForNewLocation(location){
    return !location.state || !location.state.no_scroll
  }

  scrollToTop(){
    window.jQuery("html, body").animate({ scrollTop: 0 }, "slow");
  }

  static currentWindowLocation(){
    let pathname = window.location.pathname,
        query = window.location.search;
    return { pathname: pathname, query: query };
  }

  // Use this when createHistory is a hash history.
  static currentHashLocation(){
    let hash = window.location.hash,
        match = hash.match(/^#([^\?]+)(\?.+)?/);
    return {
      pathname: match ? match[1] : '',
      query: match && match[2] ? match[2] : ''
    }
  }

  static locale(){
    let pathname = window.location.pathname,
        match = pathname.match(new RegExp('^\/?(\\w{2})(\/|$)'));

    if (!match){ return 'en'; }
    return match[1];
  }

}
