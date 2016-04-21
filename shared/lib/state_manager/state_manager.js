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
    console.log('StateManager#exampleSet')
    console.log(example_id)
    console.log(this.params)
    return parseInt(this.params.example_id) === parseInt(example_id);
  }

  getInitialData(){
    console.log('getInitialData')
    console.log(JS_ENV)
    let state_manager = this,
        ExampleRepo = require(`./../../../${JS_ENV}/models/example/example.repository`);
      console.log(ExampleRepo)
    return ExampleRepo.all()
            .then((examples)=>{
              console.log('all examples retrieved.')
              state_manager.examples = examples;
            });
  }


}
