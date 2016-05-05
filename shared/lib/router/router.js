/*global window*/

import queryString from 'query-string';

export default class Router {

  constructor(state_manager, routes) {
    let router = this;

    router.routes = routes;
    router.update_in_progress = true;
    router.state_manager = state_manager;
  }

  get current_route() {
    return this.state_manager.state.route;
  }

  setLocation(location) {
    let router = this,
        new_route = router.findRoute(location);

    new_route.setParams(location);
    return router.state_manager.setRoute(new_route);
  }

  findRoute(location) {
    let router = this;
    return router.routes.find((route) => {
      return route.matchesLocation(location);
    });
  }

  /*
   * Client-only
   */

  // should be used on app initialization.
  setLocationToCurrentUrl() {
    let router = this,
        current_location = {
          pathname: window.location.pathname,
          query: queryString.parse(window.location.search)
        };
    return router.setLocation(current_location);
  }

  initializeHistory(component) {
    let router = this;
    router.history = component.props.createHistory();
    router.history.listen((new_location) => {
      if (new_location.action !== 'PUSH') return false;
      router.setLocation(new_location)
        .then(() => {
          return component.syncFromStateManager();
        })
        .then(() => {
          router.update_in_progress = false;
          if (router.afterLocationUpdate) return router.afterLocationUpdate(new_location);
          return undefined
        });
    })
  }

  getQueryParam(key) {
    return queryString.parse(window.location.search)[key];
  }

  goToExample(example_id) {
    let router = this;
    example_id = parseInt(example_id);

    if (!router.state_manager.exampleSet(example_id)) {
      let new_url = `/examples/${example_id}`;
      router.update_in_progress = true;
      router.history.push(new_url);
    }
  }

}
