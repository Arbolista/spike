/*eslint-env browser*/
/*global window Promise*/

import {COMPONENT_MAP} from './component_map';

class Styles {

  static sync(){
    var all = [],
        css = '';
    for (var view in COMPONENT_MAP){
      var done = new Promise((fnResolve, _fnReject)=>{
        Styles.addCss(view, fnResolve)
      }).then((result)=>{
        if (result) css += result;
      });
      all.push(done);
    }
    all.push(Styles.addAppCss()
      .then((result)=>{ if(result)css += result; }));
    return Promise.all(all)
      .then(()=>{
        window.jQuery('head').append(`<style>${css}</style>`);
      });
  }

  static addCss(view, fnResolve){
    return window.jQuery.ajax({
      url: COMPONENT_MAP[view] + '.scss'
    })
    .fail(()=>{
      fnResolve('');
    })
    .then((scss)=>{
      var sass = new window.Sass();
      if (!scss) return fnResolve('');
      sass.compile(scss, (result, _a)=>{
        fnResolve(result.text)
      });
    });
  }

  static addAppCss(){
    return new Promise((fnResolve, _fnReject)=>{
      window.jQuery.ajax({
        url: '/assets/app.scss'
      })
      .fail(()=>{
        // if app.scss not found, fail silently.
        fnResolve('');
      })
      .then((scss)=>{
        var sass = new window.Sass();
        sass.compile(scss, (result, _a)=>{
          fnResolve(result.text);
        });
      });
    });
  }

}

export default Styles;

