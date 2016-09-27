<% routesClassNames.forEach( function(r) { %>import <%= r.componentNameCamelCase%> from './routes/<%= r.originalName%>/<%= r.originalName%>.route';
<% }); %>


export function defineRoutes(i18n) {
  return includeHelpers([
     <% routesClassNames.forEach(function(r,i) { %>
    new <%= r.componentNameCamelCase%>({
      <% if(r.componentNameCamelCase === 'Index')  {%>path: new RegExp(`^\/?((\\w{2})\/?)?$`),
      <%}else if(r.componentNameCamelCase === 'Missing')  {%>path: /\.*/,
      <%}else {%>path: new RegExp("^\/?((\\w{2})\/)?"+i18n.t('<%= r.componentNameLowerCase%>')),
      <%}%>parameters: {2: 'locale'},
      i18n:i18n
    })
    <%= i== routesClassNames.length-1?"":","%>
    <% }); %>
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