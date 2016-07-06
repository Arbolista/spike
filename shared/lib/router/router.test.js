/*global describe it expect*/

import StateManager from './../state_manager/state_manager';
import Router from './router';
import { MOCK_ROUTES } from 'shared/lib/routes/route.base.test';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

const route1 = MOCK_ROUTES.getRoute('TestRoute1'),
      route2 = MOCK_ROUTES.getRoute('TestRoute2');

/*
 * Test shared/lib/router/router.js
 */

(function(){
  const router = new Router(i18n, MOCK_ROUTES);

  testSharedRouterBehavior(router);
})();


/*
 * Test Shared Behavior of Subclasses
 */

export function testSharedRouterBehavior(router){

  describe('Shared route behavior', ()=>{

    it('can find route based on location', ()=>{
      expect(router.findRoute('/route1/13')).toEqual(route1);
      expect(router.findRoute('/route2')).toEqual(route2);
    });

    it('can parse location for route attributes (1)', ()=>{
      let location1 = router.parseLocation({
        pathname: '/route1/15',
        search: '?param2=2'
      });
      expect(location1.pathname).toEqual('/route1/15');
      expect(location1.query).toEqual({param2: '2'});
      expect(location1.route_name).toEqual('TestRoute1');
      expect(location1.params).toEqual({param1: '15', param2: '2'});
    });

    it('can parse location for route attributes (2)', ()=>{
      let location2 = router.parseLocation({
        pathname: '/route2'
      });
      expect(location2.pathname).toEqual('/route2');
      expect(location2.query).toEqual({});
      expect(location2.route_name).toEqual('TestRoute2');
      expect(location2.params).toEqual({});
    });


  });

}
