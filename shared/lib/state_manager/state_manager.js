/*global JS_ENV Map require*/

export default class StateManager {

  constructor(){
    var state_manager = this;
    state_manager.state = {};
  }

  get params(){
    return this.state.route.params;
  }

  get example_id(){
    return this.state.example && this.state.example.data.id;
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
    let repo = new ExampleRepo(new Map());
    return repo.all()
            .then((examples)=>{
              state_manager.examples = examples;
            });
  }


}
