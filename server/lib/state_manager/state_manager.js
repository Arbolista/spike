import StateManagerBase from './../../../shared/lib/state_manager';
import Example from './../../models/example/example';

class StateManager extends StateManagerBase {

  /*
   * Retrieve and set non-state related (ie init) data.
   */

  getInitialData(){
    // This could get data from a database, redis server, api, etc.
    // If no initial data is needed to initiate the state manager,
    // this method can be dropped.

    // State manager should handle getting path specific data.
    var state_manager = this;
    return Example.ensureExamples()
            .then((examples)=>{
              state_manager.examples = examples;
              return examples;
            });
  }

  /*
   * Retrieve and set state related data.
   */

  updateDataFromState(){
    // get data from database or API.
    // This data should then be accessible from state_manager for components.
    return Promise.resolve();
  }

}

export default StateManager;
