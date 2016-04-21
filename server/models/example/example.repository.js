import Example from './example';
import {EXAMPLES} from './../../../shared/data/examples';

class ExampleRepo {

  static findById(id){
    return ExampleRepo.all()
      .then((examples)=>{
        id = parseInt(id);
        return examples.find((example)=>{
          return example.id === id;
        })
      })
  }

  static all(){
    return Promise.resolve(EXAMPLES.map((example_datum)=>{
        return new Example(example_datum);
      }));
  }

}

module.exports = ExampleRepo;
export default ExampleRepo;
