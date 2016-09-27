/*global*/

import RouteBase from '../route.base';

class Details extends RouteBase {

  constructor(route_definition) {
  	let i18n = route_definition.i18n;
  	route_definition.path = new RegExp("^\/?((\\w{2})\/)?"+i18n.t('details')+"/(\\d+)$");
  	route_definition.parameters= {2: 'locale', 3: 'example_id'};
  	super(route_definition);
  }

  get route_name(){
    return 'Details';
  }

  get component(){
    return require('shared/components/layouts/details/details.component');
  }

  url(action, i18n){
    return `/${i18n.language}/${i18n.t('details')}/${action.payload.id}`
  }

}

export default Details;

