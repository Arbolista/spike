/*global describe it expect*/

import { testSharedRouteBehavior } from '../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Example2');

describe('Example2 route', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation('example2')).toBe(true);
    expect(route.matchesLocation('/en/example2')).toBe(true);
  });

  it('properly sets params', ()=>{
    let params = route.parseParams({pathname: '/en/example2'});
    expect(params).toEqual({locale: 'en'});
  });

  it('can create url from action', ()=>{
    let action = {payload: {}};
    expect(route.url(action, i18n)).toEqual('/en/example2');
  })

  it('has a component', ()=>{
    expect(typeof route.component).toEqual('function');
  });

});
