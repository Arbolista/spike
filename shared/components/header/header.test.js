/*global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import React from 'react';

import Header from './header.component';

describe('Header component', ()=>{
  it('renders without problems', (done)=>{
      header = TestUtils.renderIntoDocument(React.createElement(Header) );
      expect(header.state).toEqual({});
      done();
  });
});
