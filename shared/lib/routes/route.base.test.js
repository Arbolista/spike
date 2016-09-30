/*global describe it expect*/
import { includeHelpers } from 'shared/lib/routes';
import Route from 'shared/lib/routes/route';

export function testSharedRouteBehavior(route){

  describe('shared Route behavior', ()=>{

    it('has a name', ()=>{
      expect(typeof route.name).toEqual('string');
    });

  });

}

export const MOCK_ROUTES = includeHelpers([
  new Route({
    path: "/route1"
  }),
  new Route({
    path: "/route2"
  })
]);
