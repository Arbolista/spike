import ExampleRoute from './routes/example/example';
import IndexRoute from './routes/index/index';
import MissingRoute from './routes/missing/missing';

export const DEFINITIONS = {
  'IndexRoute': {
    path: /^\/?$/,
    parameters: {}
  },
  'ExampleRoute': {
    path: /^\/?examples\/(\d+)\/?$/,
    parameters: {1: 'example_id'}
  },
  'MissingRoute': {
    path: /\.*/,
    parameters: {}
  }
};

export const ROUTES = [
  new IndexRoute(),
  new ExampleRoute(),
  new MissingRoute()
]
