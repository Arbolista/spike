import Details from './routes/details/details.route';
import Index from './routes/index/index.route';
import Login from './routes/login/login.route';
import Missing from './routes/missing/missing.route';

export function defineRoutes(i18n) {
  return includeHelpers([
    new Index({
      path: new RegExp(`^\/?((\\w{2})\/?)?$`),
      parameters: {2: 'locale'}
    }),
    new Details({
      path: new RegExp(`^\/?((\\w{2})\/)?${i18n.t('details')}/(\\d+)$`),
      parameters: {2: 'locale', 3: 'example_id'}
    }),
    new Login({
      path: new RegExp(`^\/?((\\w{2})\/)?${i18n.t('login')}$`),
      parameters: {2: 'locale'}
    }),

    // Missing route must be last
    new Missing({
      path: /\.*/,
      parameters: {2: 'locale'}
    })
  ]);
}

function includeHelpers(routes){

  Object.defineProperty(routes, 'getRoute', {
    value: function(route_name){
      return this.find( route => route.route_name === route_name)
    },
    enumerable: false,
    configurable: false
  });

  return routes;

}
