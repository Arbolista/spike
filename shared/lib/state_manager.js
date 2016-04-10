export const ROUTES = [
  {
    path: /examples\/(\d+)\/?$/,
    parameters: {1: 'example_id'}
  }
];

export default class StateManager {

  constructor(){
    var state_manager = this;
    state_manager.state = {};
  }

  /*
   * Notify StateManager of URL change
   */

  updateStateFromUrl(location){
    // this will set StateManager#state and
    // call state_manager#updateDataFromState.
    var state_manager = this,
        params = state_manager.parseUrl(location.pathname);
    if (params.example_id){
      state_manager.state.example = state_manager.examples.find(example=> example.data.id === parseInt(params.example_id) )
    } else {
      state_manager.state.example = undefined;
    }
    return state_manager.updateDataFromState();
  }

  /*
   * Parse Url Parameters
   */

  parseUrl(url, _query){
    for (var route of ROUTES){
      var match = url.match(route.path);
      if (match){
        var parsed = {};
        for (var index in route.parameters){
          parsed[route.parameters[index]] = match[index];
        }
        return parsed;
      }
    }
    return {};
  }

}
