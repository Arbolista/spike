/*global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import React from 'react';

import Footer from './footer.component';

describe('Footer component', ()=>{
  it('renders without problems', (done)=>{
      footer = TestUtils.renderIntoDocument(React.createElement(Footer) );
      expect(footer.state).toEqual({});
      done();
  });
});
