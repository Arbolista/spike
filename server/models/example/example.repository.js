/*global Promise module*/

import Example from './example';
import {EXAMPLES} from './../../../shared/data/examples';

class ExampleRepo {

  constructor(_store) {
    // store is unused on server side
    // present because of the symmetry
  }

  findById(id){
    return this.all()
      .then((examples)=>{
        id = parseInt(id);
        return examples.find((example)=>{
          return example.id === id;
        })
      })
  }

  all(){
    return Promise.resolve(EXAMPLES.map((example_datum)=>{
      return new Example(example_datum);
    }));
  }

}

module.exports = ExampleRepo;
export default ExampleRepo;
