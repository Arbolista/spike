/*global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import React from 'react';

import Example2 from './example2.component';

describe('Example2 component', ()=>{
  it('renders without problems', (done)=>{
      example2 = TestUtils.renderIntoDocument(React.createElement(Example2) );
      expect(example2.state).toEqual({});
      done();
  });
});
