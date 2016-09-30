import pathToRegexp from 'path-to-regexp';
import Route from './routes/route.js'

export function defineRoutes(i18n) {
  let routes = [

    { name : "Index",
      path: ["/:locale?/index",
             "/:locale?"
            ]
    }
    ,
    { name : "Details",
      path: `/:locale?/${i18n.t('details')}/:example_id`,
      url: (payload,i18n) => {
        console.log(payload);
        return `/${i18n.language}/${i18n.t('details')}/${payload.id}`
      }
    }
    ,
    { name : "Login",
      path: `/:locale?/${i18n.t('login')}`,
    }
    ,
    { name : "Missing",
      path: "/*",
    }
  ].map((definition)=> new Route(definition));
  return includeHelpers(routes);
}

export function includeHelpers(routes){

  Object.defineProperty(routes, 'getRoute', {
    value: function(name){
      return this.find( route => route.name === name)
    },
    enumerable: false,
    configurable: false
  });

  return routes;

}