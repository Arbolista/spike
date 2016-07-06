/*global describe*/

import Example from './example';
import ExampleRepo from './example.repository';

import { testSharedModelBehavior } from 'shared/models/model.test';

describe('Example model', ()=>{
  testSharedModelBehavior(Example);
});

