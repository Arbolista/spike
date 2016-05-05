/*eslint-env browser*/
/*global window Promise*/

import {COMPONENT_MAP} from './component_map';

const sass = new window.Sass();
let css = '';

class Styles {

  static sync(){
    var promises = [];
    for (var view in COMPONENT_MAP){
      let promise = Styles.addCss(COMPONENT_MAP[view]);
      promises.push(promise);
    }
    // defined in <head> of views/index.ejs
    window.SASS_DESIGN_ASSETS.forEach((sass_route)=>{
      let promise =  Styles.addCss(sass_route);
      promises.push(promise);
    });
    return Promise.all(promises)
      .then(()=>{
        document.getElementById('root').style.display = 'block';
        document.getElementById('loading_styles').style.display = 'none';
        window.jQuery('head').append(`<style>${css}</style>`);
      });
  }

  static addCss(path){
    return new Promise((fnResolve, _fnReject)=>{
      window.jQuery.ajax({
        url: path + '.scss'
      })
      .fail(()=>{
        console.error(`${path} not compiled`)
        fnResolve();
      })
      .then((scss)=>{

        if (!scss) return fnResolve();
        sass.compile(scss, (result, _a)=>{
          css += result.text;
          console.info(`${path} has been compiled`)
          fnResolve();
        });
      });
    });

  }

}

export default Styles;

