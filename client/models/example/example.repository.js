/*global Promise module */

import ExampleApi from 'api/example.api';
import Example from './example';

class ExampleRepo {

  constructor(store) {
    this.store = store;
  }

  findById(id) {
    return this.all()
      .then((_examples) => {
        return this.store.get(parseInt(id));
      })
  }

  all() {
    if (this.store.size === 0) {
      return ExampleApi.index()
        .then((example_data) => {
          return example_data.map((example_datum) => {
            let example = new Example(example_datum);
            this.store.set(example.id, example);
            return example;
          })
        })
    } else {
      return Promise.resolve(Array.from(this.store.values()))
    }
  }

}

module.exports = ExampleRepo;
export default ExampleRepo;
