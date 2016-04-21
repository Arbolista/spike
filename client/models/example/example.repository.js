/*global Promise module Map*/

import ExampleApi from 'api/example.api';
import Example from './example';

class ExampleRepo {

  static findById(id){
    return ExampleRepo.all()
      .then((_examples)=>{
        return ExampleRepo.store.get(parseInt(id));
      })
  }

  static all(){
    if (ExampleRepo.store.size === 0){
      return ExampleApi.index()
        .then((example_data)=>{
          return example_data.map((example_datum)=>{
            let example = new Example(example_datum);
            ExampleRepo.store.set(example.id, example);
            return example;
          })
        })
    } else {
      return Promise.resolve(Array.from(ExampleRepo.store.values()))
    }
  }

}

ExampleRepo.store = new Map();

module.exports = ExampleRepo;
export default ExampleRepo;
