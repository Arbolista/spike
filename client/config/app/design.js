/*eslint-env browser*/
/*global window Promise*/

import createHistory from 'history/lib/createHashHistory';
import { useQueries } from 'history';

import app from './../../app';
import DesignComponentTemplatesLoader from 'design_component_template_loader';
import DesignComponentSassLoader from 'design_component_sass_loader';

window.DESIGN = true;

Promise.all([
  new DesignComponentTemplatesLoader().load(),
  new DesignComponentSassLoader().load()
]).then(()=>{
  app(useQueries(createHistory));
});

