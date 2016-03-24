import createHistory from 'history/lib/createHashHistory';
import { useQueries } from 'history';

import app from './../../app';
import Styles from 'config/styles';
import Templates from 'config/templates';

Promise.all([
  Templates.sync(),
  Styles.sync()
]).then(()=>{
  jQuery('#compiling_layouts').remove();
  app(useQueries(createHistory));
});
