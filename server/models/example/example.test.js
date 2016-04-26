/*global describe*/

import Example from './example';
import ExampleRepo from './example.repository';

import {testSharedExampleRepoBehavior, testSharedExampleBehavior} from './../../../shared/models/example/example.base.test';

describe('server Example entity', ()=>{
  testSharedExampleBehavior(Example);
});

describe('server Example repository', ()=>{
  testSharedExampleRepoBehavior(ExampleRepo);
});
