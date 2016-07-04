/*global describe it expect*/

import {testSharedRouteBehavior} from './../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Details');

describe('Details route', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation({pathname: '/details/234'})).toBe(true);
    expect(route.matchesLocation({pathname: 'details/234'})).toBe(true);
    expect(route.matchesLocation({pathname: '/details/234sdfsd'})).toBe(false);
  });

  it('properly sets params', ()=>{
    route.setParams({pathname: '/details/234'});
    expect(route.params['user_id']).toEqual('234');
  });

  it('can create url from action', ()=>{
    let action = {payload: {user_id: 234}})
    expect(route.url(action, i18n)).toEqual('/en/details/234');
  });

});
