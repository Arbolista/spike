import ExampleApi from 'api/example.api';
import Example from './example';

class ExampleRepo {

  static findById(id){
    console.log('ExampleRepo.findById')
    console.log(id)
    return ExampleRepo.all()
      .then((_examples)=>{
        console.log('found by id')
        return ExampleRepo.store.get(parseInt(id));
      })
  }

  static all(){
    console.log('ExampleRepo.all')
    if (ExampleRepo.store.size === 0){
      console.log('a')
      return ExampleApi.index()
        .then((example_data)=>{
          console.log(example_data)
          return example_data.map((example_datum)=>{
            let example = new Example(example_datum);
            ExampleRepo.store.set(example.id, example);
            return example;
          })
        })
    } else {
      console.log('c')
      return Promise.resolve(Array.from(ExampleRepo.store.values()))
    }
  }

}

ExampleRepo.store = new Map();

module.exports = ExampleRepo;
export default ExampleRepo;
