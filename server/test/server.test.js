/*global describe it expect console process*/

import cheerio from 'cheerio';
import request from 'supertest';

import Server from './../config/production/server';
import {EXAMPLES} from './../../shared/data/examples';

// set node env to production to test production server configuration.
process.env.NODE_ENV = 'production';

var server = new Server();
server.config();

describe('base route', ()=>{

  it('properly prerenders app', (done)=>{

    request(server.app)
      .get('/')
      .end((err, res)=>{
        if (err){
          console.error(err)
          expect(true).toEqual(false)
          done()
        }
        try {
          expect(res.status).toEqual(200);
          expect(res.header['content-type']).toEqual('text/html; charset=utf-8');

          var body = res.text,
              $ = cheerio.load(body);
          expect($('meta[name="example_id"]').length).toEqual(0);
          expect($('#prerender_data').text()).toMatch(JSON.stringify(EXAMPLES));

          expect($('.alert-warning').text()).toMatch('Choose an example');
          expect($('.alert-info').length).toEqual(0);
          done();
        } catch (err) {
          console.error(err);
          expect(true).toEqual(false);
          done()
        }
      })

  });

});

describe('example specific route', ()=>{

  it('properly prerenders app', (done)=>{
    request(server.app)
      .get('/examples/1')
      .end((err, res)=>{
        if (err){
          console.error(err)
          expect(true).toEqual(false)
          done()
        }
        try {
          expect(res.status).toEqual(200);
          expect(res.header['content-type']).toEqual('text/html; charset=utf-8');

          var $ = cheerio.load(res.text);
          expect($('meta[name="example_id"]').attr('content')).toEqual('1');
          expect($('#prerender_data').text()).toMatch(JSON.stringify(EXAMPLES));
          expect($('.alert-warning').length).toEqual(0);
          expect($('.alert-info').text()).toMatch('Hi, I\'m Bob');

          done();
        } catch (err) {
          console.error(err);
          expect(true).toEqual(false);
          done();
        }

      });
  });

});
