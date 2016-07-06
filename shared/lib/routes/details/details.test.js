/*global describe it expect*/

import { testSharedRouteBehavior } from '../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Details');

describe('Details route', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation('/details')).toBe(false);
    expect(route.matchesLocation('/en/details')).toBe(false);
    expect(route.matchesLocation('/details/15')).toBe(true);
    expect(route.matchesLocation('details/15')).toBe(true);
    expect(route.matchesLocation('/en/details/15')).toBe(true);
    expect(route.matchesLocation('en/details/15')).toBe(true);
  });

  it('properly sets params', ()=>{
    let params = route.parseParams({pathname: '/en/details/15'});
    expect(params).toEqual({locale: 'en', example_id: '15'});
  });

  it('can create url from action', ()=>{
    let action = {payload: {id: 15}}
    expect(route.url(action, i18n)).toEqual('/en/details/15');
  });

  it('has a component', ()=>{
    expect(typeof route.component).toEqual('function');
  });


});
