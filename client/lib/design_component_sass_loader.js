/*eslint-env browser*/
/*global window Promise require*/

/*
 * This class is meant to download sass stylesheets in the browser
 * in the design build, compile those style sheets,
 * and append the styles to <head>.
 */

const sass = new window.Sass('/assets/sass/sass.worker.min.js');

class DesignComponentSassLoader {

  constructor(){
    let loader = this;
    loader.css = '';
  }

  load(){
    let loader = this,
        promises = [],
        styleContext = require.context('./../../shared/components', true, /\.scss$/);

    styleContext.keys().forEach((filename)=>{
      let style_path = '/components/' + filename.replace(/^\.\//, ''),
          promise = loader.addCss(style_path);
      promises.push(promise);
    });
    // defined in <head> of views/index.ejs
    window.SASS_DESIGN_ASSETS.forEach((sass_route)=>{
      let promise = loader.addCss(sass_route);
      promises.push(promise);
    });
    return Promise.all(promises)
      .then(()=>{
        document.getElementById('root').style.display = 'block';
        document.getElementById('loading_styles').style.display = 'none';
        window.jQuery('head').append(`<style>${loader.css}</style>`);
      });
  }

  addCss(style_path){
    let loader = this;
    return new Promise((fnResolve, _fnReject)=>{
      window.jQuery.ajax({
        url: style_path
      })
      .fail(()=>{
        console.error(`${style_path} not compiled`)
        fnResolve();
      })
      .then((scss)=>{
        if (!scss) return fnResolve();
        sass.compile(scss, (result, _a)=>{
          loader.css += result.text;
          console.info(`${style_path} has been compiled`)
          fnResolve();
        });
      });
    });

  }

}

export default DesignComponentSassLoader;
