import Example from 'models/example/example';
import StateManagerBase from 'shared/lib/state_manager';

class StateManager extends StateManagerBase {

  /*
   * Retrieve and set non-state related (ie init) data.
   */

  getInitialData(){
    // This could get data from an API, persistent client storage, or data rendered onto page as JSON.
    // If no initial data is needed to initiate the state manager,
    // this method can be dropped.

    // State manager should handle getting path specific data.
    var state_manager = this;
    return Example.getExamples()
      .then((examples)=>{
        state_manager.examples = examples;
        return examples;
      });
  }

  /*
   * Retrieve and set state related data.
   */

  updateDataFromState(){
    // get data from API, persistent client storage, or global data object.
    // This data should then be accessible from state_manager for components.
    return Promise.resolve();
  }

  /*
   * Initialize Browser/Hash URL History & callback
   */

  initializeHistory(component){
    // component should be top level app component.
    // top level component should receive a createHistory prop,
    // that can be configured for different envs.
    var state_manager = this;

    state_manager.history = component.props.createHistory();
    state_manager.history.listen((location)=>{
      state_manager.updateComponentsFromUrl(location, component)
        .then(()=>{
          if (state_manager.afterUrlUpdate) state_manager.afterUrlUpdate(location);
        });
    });
  }

  /*
   * Change Params via UI -> Change Url
   */

  setParams(params){
    var state_manager = this,
      url;
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

  updateComponentsFromUrl(location, component){
    var state_manager = this;
    return new Promise((fnResolve, fnReject)=>{
      // sets StateManager#state and
      // then gets the necessary data for that state (StateManager#updateDataFromState).
      state_manager.updateStateFromUrl(location)
        .then(()=>{
          component.syncFromStateManager(()=>{
            state_manager.update_in_progress = false;
            fnResolve();
          });
        });
    });
  }

  /*
   * Clean up prerendered data from memory.
   */

  destroyPrerenderData(){
    var state_manager = this,
      prerender_data = document.getElementById('prerender_data');
    window.PrerenderData = undefined;
    if (prerender_data) prerender_data.parentNode.removeChild(prerender_data);
  }

}

export default StateManager;
