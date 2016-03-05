import Example from './../src/example';

describe('example', ()=>{
  it('says hello to world', ()=>{
    expect(Example.hello()).toEqual('world');
  });

})
