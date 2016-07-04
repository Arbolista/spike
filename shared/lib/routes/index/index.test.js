/*global describe it expect*/

import IndexRoute from './index';
import {testSharedRouteBehavior} from './../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Index');

describe('Index', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation({pathname: '/'})).toBe(true);
    expect(route.matchesLocation({pathname: ''})).toBe(true);
    expect(route.matchesLocation({pathname: '/234sdfsd'})).toBe(false);
    expect(route.matchesLocation({pathname: '/examples/234'})).toBe(false);
  });

  it('properly sets params', ()=>{
    route.setParams({pathname: '/'});
    expect(route.params).toEqual({});
  });

});
