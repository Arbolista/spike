/*global describe it expect*/
import { includeHelpers } from 'shared/lib/routes';
import RouteBase from 'shared/lib/routes/route.base';

export function testSharedRouteBehavior(route){

  describe('shared Route behavior', ()=>{

    it('has a name', ()=>{
      expect(typeof route.route_name).toEqual('string');
    });

  });

}


export class TestRoute1 extends RouteBase {
  get route_name(){
    return 'TestRoute1';
  }

  get component(){
    return undefined;
  }
}
export class TestRoute2 extends RouteBase {
  get route_name(){
    return 'TestRoute2';
  }

  get component(){
    return undefined;
  }
}

export const MOCK_ROUTES = includeHelpers([
  new TestRoute1({
    path: /^\/route1\/(\d+)$/,
    parameters: {1: 'param1'}
  }),
  new TestRoute2({
    path: /^\/route2$/,
    parameters: {}
  })
]);
