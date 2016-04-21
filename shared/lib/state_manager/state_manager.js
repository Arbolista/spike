/*global JS_ENV require*/

export default class StateManager {

  constructor(){
    var state_manager = this;
    state_manager.state = {};
  }

  get params(){
    return this.state.route.params;
  }

  setRoute(route){
    let state_manager = this;
    state_manager.state.route = route;
    return route.assureData(state_manager.state);
  }

  exampleSet(example_id){
    return parseInt(this.params.example_id) === parseInt(example_id);
  }

  getInitialData(){
    let state_manager = this,
        ExampleRepo = require(`./../../../${JS_ENV}/models/example/example.repository`);
    return ExampleRepo.all()
            .then((examples)=>{
              state_manager.examples = examples;
            });
  }


}
