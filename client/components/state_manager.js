const ROUTES = [
  {
    path: /examples\/(\d+)\/?$/,
    parameters: {1: 'example_id'}
  }
];

class StateManager {

  constructor(createHistory, examples){
    var state_manager = this;
    state_manager.state = {};
    state_manager.history = createHistory();
    state_manager.examples = examples;
  }

  /*
   * Change Params -> Change Url
   */

  setParams(params){
    var state_manager = this,
      url, house, params;
    if (state_manager.update_in_progress) return false;
    state_manager.update_in_progress = true;

    if (params.example_id){
      url = `/examples/${params.example_id}`;
    } else {
      url = '';
    }

    state_manager.history.push(url);
  }

  /*
   * Url Changed -> Change State
   */

  updateStateFromUrl(location, component){
    var state_manager = this,
      params = state_manager.parseUrl(location.pathname);
    if (params.example_id){
      state_manager.state.example = state_manager.examples.find(example=> example.data.id == params.example_id )
    } else {
      state_manager.state.example = undefined;
    }

    return new Promise((fnResolve, fnReject)=>{
      component.syncFromStateManager(()=>{
        state_manager.update_in_progress = false;
        fnResolve();
      });
    });
  }

  parseUrl(url, query){
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

export default StateManager;
