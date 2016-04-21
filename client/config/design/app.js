/*eslint-env browser*/
/*global window Promise*/

import createHistory from 'history/lib/createHashHistory';
import { useQueries } from 'history';

import app from './../../app';
import Styles from './styles';
import Templates from './templates';

Promise.all([
  Templates.sync(),
  Styles.sync()
]).then(()=>{
  app(useQueries(createHistory));
});
