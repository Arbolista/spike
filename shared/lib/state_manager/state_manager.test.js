/*global describe beforeEach it expect*/

import StateManager from './state_manager';
import i18n from 'shared/lib/i18n/i18nFactory.mock';


(function(){
  let state_manager = new StateManager();
  testSharedStateManagerBehavior(state_manager);
})();

export function testSharedStateManagerBehavior(state_manager){

  describe('shared StateManager behavior', ()=>{

    it('initializes store', ()=>{
      let initial_state = {
        session: { token: '123456'},
        location: {pathname: '/test1/15'}
      }
      state_manager.initializeStore(initial_state);
      expect(state_manager.store.getState()['session']).toEqual({ token: '123456'});
      expect(state_manager.store.getState()['location']).toEqual({pathname: '/test1/15'});
    });


  });

}




