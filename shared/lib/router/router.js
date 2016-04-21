/*global window*/

import queryString from 'query-string';

export default class Router {

  constructor(state_manager, routes){
    let router = this;

    router.routes = routes;
    router.update_in_progress = true;
    router.state_manager = state_manager;
  }

  get current_route(){
    return this.state_manager.state.route;
  }

  setLocation(location){
    let router = this,
        current_route = router.state_manager.state.route;

    if (current_route === undefined || !current_route.matchesLocation(location)){
      current_route = router.findRoute(location)
    }
    current_route.setParams(location);

    return router.state_manager.setRoute(current_route);
  }

  findRoute(location){
    let router = this;
    if (router.current_route && router.current_route.matchesLocation(location)){
      return router.current_route;
    }
    return router.routes.find((route)=>{
      return route.matchesLocation(location);
    });
  }

  /*
   * Client-only
   */

  get current_location(){
    return {
      pathname: window.location.pathname,
      query: queryString.parse(window.location.search)
    }
  }

  initializeHistory(component){
    let router = this;
    router.history = component.props.createHistory();
    router.history.listen((new_location)=>{
      if (new_location.action !== 'PUSH') return false;
      router.setLocation(new_location)
        .then(()=>{
          return component.syncFromStateManager();
        })
        .then(()=>{
          router.update_in_progress = false;
          if (router.afterLocationUpdate) return router.afterLocationUpdate(new_location);
          return undefined
        });
    })
  }

  goToExample(example_id){
    let router = this;
    example_id = parseInt(example_id);

    if (!router.state_manager.exampleSet(example_id)){
      let new_url = `/examples/${example_id}`;
      router.update_in_progress = true;
      router.history.push(new_url);
    }
  }

}
