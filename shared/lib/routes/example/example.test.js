import ExampleRoute from './example';
import {testSharedRouteBehavior} from './../route.base.test';

let route = new ExampleRoute();

describe('ExampleRoute', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation({pathname: '/examples/234'})).toBe(true);
    expect(route.matchesLocation({pathname: 'examples/234'})).toBe(true);
    expect(route.matchesLocation({pathname: '/examples/234sdfsd'})).toBe(false);
  });

  it('properly sets params', ()=>{
    route.setParams({pathname: '/examples/234'});
    expect(route.params.example_id).toEqual('234');
  });

});
