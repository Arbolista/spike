import Details from './routes/details/details.route';
import Index from './routes/index/index.route';
import Missing from './routes/missing/missing.route';

export function (i18n) {
  return includeHelpers([
    new Index({
      path: new RegExp(`^\/?((\\w{2})\/?)?$`),
      parameters: {}
    }),
    new Details({
      path: new RegExp(`^\/?((\\w{2})\/)?${i18n.t('details')}/\\d+$`),
      parameters: {1: 'user_id'}
    }),

    // Missing route must be last
    new Missing({
      path: /\.*/,
      parameters: {}
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


}
