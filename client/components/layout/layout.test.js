import TestUtils from 'react-addons-test-utils';
import createHistory from 'history/lib/createHashHistory';
import React from 'react';
import _ from 'lodash';

import Example from './../../models/example/example';
import Layout from './layout.component';


describe('layout component', ()=>{
  it('renders and prompts example selection', (done)=>{
    Example.getExamples()
      .then((examples)=>{
        // Render a checkbox with label in the document
        const layout = TestUtils.renderIntoDocument(React.createElement(Layout, {createHistory: createHistory, examples: examples}) );

        var alert = TestUtils.findRenderedDOMComponentWithClass(layout, 'alert-warning');
        expect(_.trim(alert.textContent)).toEqual("Choose an example.");
        expect(layout.state.example).toEqual(undefined);
        done();
      })
      .then(()=>{
        done();
      });
  });
  it('allows user to set example url', (done)=>{

    Example.getExamples()
      .then((examples)=>{
        const layout = TestUtils.renderIntoDocument(React.createElement(Layout, {createHistory: createHistory, examples: examples}));

        var buttons = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'btn-primary');
        expect(buttons.length).toEqual(2);

        // click a button to select an example
        TestUtils.Simulate.click(buttons[0]);
        var alert = TestUtils.findRenderedDOMComponentWithClass(layout, 'alert-info');
        expect(_.trim(alert.textContent)).toEqual("Hi, I'm howdy!");

        var selected = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'active');
        expect(selected.length).toEqual(1);
        expect(selected[0].dataset.value).toEqual('1');

        expect(layout.state_manager.update_in_progress).toEqual(false);
        expect(layout.state.example).toEqual(examples[0]);
        layout.state_manager.history.listen((new_location)=>{
          expect(new_location.pathname).toEqual('/examples/1');
          done()
        })();
      });
  });

});
