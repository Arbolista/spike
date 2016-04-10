/*global describe it expect*/

import Example from './example';

describe('Example', ()=>{
  it('can introduce itself', ()=>{
    let example = new Example({name: 'Jeremy'});
    expect(example.introduce()).toEqual('Hi, I\'m Jeremy!');
  });

  it('can retrieve test data', (done)=>{
    Example.getExamples()
      .then((examples)=>{
        expect(examples.length).toEqual(2);
        expect(examples.map(example=>example.data.id)).toEqual([1, 2]);
        done();
      });
  });
});
