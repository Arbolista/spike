/*global describe it expect*/

import MissingRoute from './missing';
import {testSharedRouteBehavior} from '../route.base.test';

import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Missing');

describe('MissingRoute', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation({pathname: '/'})).toBe(true);
    expect(route.matchesLocation({pathname: ''})).toBe(true);
    expect(route.matchesLocation({pathname: '/234sdfsd'})).toBe(true);
    expect(route.matchesLocation({pathname: '/examples/234'})).toBe(true);
  });

  it('properly sets params', ()=>{
    route.setParams({pathname: '/whatever'});
    expect(route.params).toEqual({});
  });

});
