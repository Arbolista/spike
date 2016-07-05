/*global describe it expect*/

import { testSharedRouteBehavior } from '../route.base.test';
import { defineRoutes } from '../../routes';
import i18n from 'shared/lib/i18n/i18nFactory.mock';

let route = defineRoutes(i18n).getRoute('<%=  componentNameCamelCase %>');

describe('<%=  componentNameCamelCase %> route', ()=>{
  testSharedRouteBehavior(route);

  it('detects location', ()=>{
    expect(route.matchesLocation({pathname: '/en/<%=  componentNameLowerCase %>'})).toBe(true);
  });

  it('properly sets params', ()=>{
    route.setParams({pathname: '/en/<%= componentNameLowerCase %>'});
    expect(route.params).toEqual({locale: 'en'});
  });

  it('can create url from action', ()=>{
    let action = {payload: {}})
    expect(route.url(action, i18n)).toEqual('/en/<%= componentNameLowerCase %>');
  })

  it('has a component', ()=>{
    expect(typeof route.component).toEqual('function');
  });

});
