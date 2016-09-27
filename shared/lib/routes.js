import Index from './routes/index/index.route';
import Details from './routes/details/details.route';
import Login from './routes/login/login.route';
import Missing from './routes/missing/missing.route';



export function defineRoutes(i18n) {
  return includeHelpers([
     
    new Index({
      path: new RegExp(`^\/?((\\w{2})\/?)?$`),
      parameters: {2: 'locale'},
      i18n:i18n
    })
    ,
    
    new Details({
      path: new RegExp("^\/?((\\w{2})\/)?"+i18n.t('details')),
      parameters: {2: 'locale'},
      i18n:i18n
    })
    ,
    
    new Login({
      path: new RegExp("^\/?((\\w{2})\/)?"+i18n.t('login')),
      parameters: {2: 'locale'},
      i18n:i18n
    })
    ,
    
    new Missing({
      path: /\.*/,
      parameters: {2: 'locale'},
      i18n:i18n
    })
    
    
  ]);
}

export function includeHelpers(routes){

  Object.defineProperty(routes, 'getRoute', {
    value: function(route_name){
      return this.find( route => route.route_name === route_name)
    },
    enumerable: false,
    configurable: false
  });

  return routes;

}