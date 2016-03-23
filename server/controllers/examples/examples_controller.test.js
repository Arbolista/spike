import request from 'express-mock-request';
import express from 'express';

import Api from './../../config/api';

var app = express();
Api.configure(app);

describe('ExamplesController', ()=>{
  it('returns list of examples', (done)=>{
    request(app).get('/data/v1/examples').expect((response)=>{
      expect(response.data).toEqual([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
      ]);
    });
  });
});
