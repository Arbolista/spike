/*global JS_ENV Map Promise require*/

import RouteBase from './../route.base';

class ExampleRoute extends RouteBase {

  get route_name() {
    return 'ExampleRoute';
  }

  assureData(state) {
    let route = this;
    if (!this.repo) {
      let ExampleRepo = require(`./../../../../${JS_ENV}/models/example/example.repository.js`);
      this.repo = new ExampleRepo(new Map());
    }

    if (!route.stateExampleSet(state)) {
      return this.repo.findById(route.params.example_id)
        .then((example) => {
          state.example = example;
        });
    }
    return Promise.resolve();
  }

  stateExampleSet(state) {
    return state.example && parseInt(this.params.example_id) === parseInt(state.example.data.id)
  }

}

export default ExampleRoute;
