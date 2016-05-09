/*global require Promise window*/

import react_templates from 'react-templates/dist/reactTemplates';
import React from 'react';
import _ from 'lodash';

/*
 * This class will download React Templates in the browser
 * in the design build. Once templates are loaded into the window object,
 * layout components can access them in the 'forComponent' method.
 */

class DesignComponentTemplateLoader {

  constructor(){
    let loader = this;

    window.COMPONENT_TEMPLATES = {};
    loader.eval_context = {
      '_': _,
      'React': React
    };
    loader.setTemplatePaths();
  }

  static forComponent(component){
    return window.COMPONENT_TEMPLATES[component];
  }

  load(){
    var all = [],
        loader = this;
    // First, ensure all Component classes are available in the eval_context.
    for (let template of loader.template_paths){
      loader.eval_context[template.component.NAME] = template.component;
    }
    // Then define all template functions on the templates object.
    for (let template of loader.template_paths){
      if (template.path){
        var done = loader.evalTemplate(template.component, template.path);
        all.push(done);
      }
    }
    return Promise.all(all);
  }

  // download raw React Template string and use react_templates
  // to evaluate it to a function.
  evalTemplate(component, template_path){
    let loader = this;
    return window.jQuery.ajax({
      url: template_path
    })
      .then((template)=>{
        var code = react_templates.convertTemplateToReact(template, {modules: 'none', name: component.NAME});
        code = code.replace('var ' + component.NAME + ' = ', 'this.' + component.NAME + ' = ');
        // evaluate template in context with components, lodash, and React available.
        new Function('with(this){ ' + code + ' } ').call(loader.eval_context);
        // after defining function on eval_context, assign to templates.
        window.COMPONENT_TEMPLATES[component.NAME] =  loader.eval_context[component.NAME];
      });
  }

  // get url request paths for each component template.
  setTemplatePaths(){
    let loader = this,
        componentContext = require.context('./../../shared/components', true, /\.component\.js$/);
    loader.template_paths = [];
    componentContext.keys().forEach((filename)=>{
      let component = componentContext(filename);
      if (component.has_template){
        loader.template_paths.push({
          component: component,
          path: '/components/' + filename.replace(/\.component\.js/, '.rt.html')
        });
      } else {
        loader.template_paths.push({
          component: component,
          path: false
        });
      }
    });
    return loader.template_paths;
  }

}

export default DesignComponentTemplateLoader;
