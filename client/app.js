import 'babel-polyfill';
import 'bootstrap/dist/js/bootstrap.min';
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/layout/layout.component';
import Example from './models/example/example';

// Pass in an instance of ReactJs History function - with either browser or hash history.
export default function(createHistory){
  Example.getExamples()
    .then((examples)=>{
      ReactDOM.render(
        React.createElement(Layout, {createHistory: createHistory, examples: examples}),
        document.getElementById('root')
      );
    });
};
