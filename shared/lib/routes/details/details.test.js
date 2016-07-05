/*global describe it expect*/

import { testSharedRouteBehavior } from '../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Details');

describe('Details route', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation({pathname: '/details'})).toBe(false);
    expect(route.matchesLocation({pathname: '/en/details'})).toBe(false);
    expect(route.matchesLocation({pathname: '/details/15'})).toBe(true);
    expect(route.matchesLocation({pathname: 'details/15'})).toBe(true);
    expect(route.matchesLocation({pathname: '/en/details/15'})).toBe(true);
    expect(route.matchesLocation({pathname: 'en/details/15'})).toBe(true);
  });

  it('properly sets params', ()=>{
    route.setParams({pathname: '/en/details/15'});
    expect(route.params).toEqual({locale: 'en', user_id: '15'});
  });

  it('can create url from action', ()=>{
    let action = {payload: {user_id: 15}})
    expect(route.url(action, i18n)).toEqual('/en/details/15');
  });

  it('has a component', ()=>{
    expect(typeof route.component).toEqual('function');
  });


});
