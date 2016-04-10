/*global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import createHistory from 'history/lib/createHashHistory';
import React from 'react';
import _ from 'lodash';

import Layout from './layout.component';
import StateManager from 'lib/state_manager/state_manager';

describe('layout component', ()=>{
  it('renders and prompts example selection', (done)=>{
    var state_manager = new StateManager();
    state_manager.getInitialData()
      .then(()=>{
        var initial_props = Object.assign({state_manager: state_manager}, state_manager.state, {createHistory: createHistory}),
            alert;
        const layout = TestUtils.renderIntoDocument(React.createElement(Layout, initial_props) );
        alert = TestUtils.findRenderedDOMComponentWithClass(layout, 'alert-warning'),
        expect(_.trim(alert.textContent)).toEqual('Choose an example.');
        expect(layout.state.example).toEqual(undefined);
        done();
      });
  });
  it('allows user to set example url', (done)=>{
    var state_manager = new StateManager();
    state_manager.getInitialData()
      .then(()=>{
        var initial_props = Object.assign({state_manager: state_manager}, state_manager.state, {createHistory: createHistory});
        var layout = TestUtils.renderIntoDocument(React.createElement(Layout, initial_props) );
        try {
          var buttons = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'btn-primary');
          expect(buttons.length).toEqual(2);

          layout.state_manager.afterUrlUpdate = (new_location)=>{
            if (new_location.action !== 'PUSH') return false;

            var info = TestUtils.findRenderedDOMComponentWithClass(layout, 'alert-info');
            expect(_.trim(info.textContent)).toEqual("Hi, I'm howdy!");

            var selected = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'active');
            expect(selected.length).toEqual(1);
            expect(selected[0].dataset.value).toEqual('1');

            expect(layout.state_manager.update_in_progress).toEqual(false);
            expect(layout.state.example).toEqual(layout.examples[0]);

            expect(new_location.pathname).toEqual('/examples/1');
            done();

          };
          // click a button to select an example
          TestUtils.Simulate.click(buttons[0]);
        } catch (err){
          console.error(err)
          expect(false).toEqual(true);
          done();
        }
      });
  });

});
