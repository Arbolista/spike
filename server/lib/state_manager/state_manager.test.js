/*global describe it beforeEach expect*/

import StateManager from './state_manager';

var state_manager = new StateManager();
describe('StateManager', ()=>{
  beforeEach((done)=>{
    state_manager.getInitialData().then(done);
  });

  it('gets the initial data', ()=>{
    expect(state_manager.examples.length).toEqual(2);
  });

  it('can udpate state from location object', (done)=>{
    state_manager.updateStateFromUrl({pathname: '/examples/1', query: ''})
      .then(()=>{
        expect(state_manager.state.example.data.id).toEqual(1);
        done();
      });
  });

  it('can udpate state from location object', (done)=>{
    state_manager.updateStateFromUrl({pathname: '/', query: ''})
      .then(()=>{
        expect(state_manager.state.example).toEqual(undefined);
        done();
      });
  });
});
