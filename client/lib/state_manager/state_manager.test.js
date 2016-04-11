/*global it expect describe*/

import StateManager from './state_manager';

var state_manager = new StateManager();

state_manager.getInitialData()
  .then(()=>{

    describe('StateManager', ()=>{

      it('gets the initial data', ()=>{
        expect(state_manager.examples.length).toEqual(2);
      });

      it('can update state from location object with example specific route', (done)=>{
        state_manager.updateStateFromUrl({pathname: '/examples/1', query: ''})
          .then(()=>{
            expect(state_manager.state.example.data.id).toEqual(1);
            done();
          });
      });

      it('can update state from location object', (done)=>{
        state_manager.updateStateFromUrl({pathname: '/', query: ''})
          .then(()=>{
            expect(state_manager.state.example).toEqual(undefined);
            done();
          });
      });

    });

  });