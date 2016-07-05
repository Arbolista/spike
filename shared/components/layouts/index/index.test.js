/*global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import React from 'react';

import Index from './index.component';

describe('Index component', ()=>{
  it('renders without problems', (done)=>{
      index = TestUtils.renderIntoDocument(React.createElement(Index) );
      expect(index.state).toEqual({});
      done();
  });
});
