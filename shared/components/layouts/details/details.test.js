/*global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import React from 'react';

import Details from './details.component';

describe('Details component', ()=>{
  it('renders without problems', (done)=>{
      details = TestUtils.renderIntoDocument(React.createElement(Details) );
      expect(details.state).toEqual({});
      done();
  });
});
