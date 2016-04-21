/*global describe beforeEach it expect*/

import SharedExample from './example.base';

export function testSharedExampleRepoBehavior(ExampleRepo){
  describe('shared example repo behavior',()=>{

    it('can get example by id', (done)=>{
      ExampleRepo.findById(1)
        .then((example)=>{
          expect(example instanceof SharedExample).toEqual(true);
          expect(example.id).toEqual(1);
          done();
        });

    });

    it('can get all examples', (done)=>{
      ExampleRepo.all()
        .then((examples)=>{
          expect(examples.length).toEqual(3);
          examples.forEach((example)=>{
            expect(example instanceof SharedExample).toEqual(true);
          });
          done();
        });
    });

  });

}

export function testSharedExampleBehavior(Example){

  describe('shared example behavior', ()=>{
    let example = undefined;
    beforeEach(()=>{
      example = new Example({id: '3', name: 'John'})
    });

    it('has data', ()=>{
      expect(example.data.constructor).toEqual(Object);
    })

    it('can introduce itself', ()=>{
      expect(example.introduce()).toEqual('Hi, I\'m John!');
    });

    it('provides id accessor', ()=>{
      expect(example.id).toEqual(3);
    });

    it('provides scoped id', ()=>{
      expect(example.scoped_id).toEqual('example-3');
    });

  });

}
