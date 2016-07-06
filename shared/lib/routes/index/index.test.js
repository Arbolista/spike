/*global describe it expect*/

import {testSharedRouteBehavior} from './../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('Index');

describe('Index', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation('/')).toBe(true);
    expect(route.matchesLocation('')).toBe(true);
    expect(route.matchesLocation('/234sdfsd')).toBe(false);
    expect(route.matchesLocation('/examples/234')).toBe(false);
  });

  it('properly sets params', ()=>{
    let params = route.parseParams({pathname: '/'});
    expect(params).toEqual({locale: undefined});
  });

  it('can create url from action', ()=>{
    let action = {payload: {}}
    expect(route.url(action, i18n)).toEqual('');
  })

  it('has a component', ()=>{
    expect(typeof route.component).toEqual('function');
  });

});
