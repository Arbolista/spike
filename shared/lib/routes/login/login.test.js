/*global describe it expect*/

import { testSharedRouteBehavior } from '../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Login');

describe('Login route', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation('/login')).toBe(true);
    expect(route.matchesLocation('/en/login')).toBe(true);
    expect(route.matchesLocation('/en/not_login')).toBe(false);
  });

  it('properly sets params', ()=>{
    let params = route.parseParams({pathname: '/en/login'});
    expect(params).toEqual({locale: 'en'});
  });

  it('can create url from action', ()=>{
    let action = {payload: {}};
    expect(route.url(action, i18n)).toEqual('/en/login');
  })

  it('has a component', ()=>{
    expect(typeof route.component).toEqual('function');
  });

});
