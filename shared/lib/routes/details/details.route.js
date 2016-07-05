/*global*/

import RouteBase from '../route.base';

class Details extends RouteBase {

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

