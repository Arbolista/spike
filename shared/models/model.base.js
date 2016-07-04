import _ from 'lodash';
import extend from 'extend';
import Immutable from 'immutable';

import Validator from 'client/lib/validator';
import ErrorMessenger from 'client/lib/error_messenger';

export default class ModelBase {

  // This can accept immutable state objects.
  // If model is not read only, it will create a deep copy.
  constructor(data, opts = {}){
    if (this.dataLoaded(data)){
      this.opts = Object.assign({
        read_only: true
      }, opts);
      this.assignData(data);
      if (this.attributes) this.defineAttributes();
    } else {
      this.data = null
    }
  }

  dataLoaded(data){
    return data !== null && data !== undefined;
  }

  get load_error(){
    return this.data && this.data.load_error;
  }

  get data_loaded(){
    return this.dataLoaded(this.data) && !this.load_error;
  }

  get read_only(){
    return this.opts.read_only;
  }

  assignData(data){
    if (Immutable.Map.isMap(data) || Immutable.List.isList(data)){
      data = data.toJS();
    }
    this.data = data;
  }

  // convenience method for validating model
  // without setting errors.
  valid(validations){
    return this.validate(undefined, {set_errors: false}, validations || this.validation);
  }

  validate(t, opts, validations){
    validations = validations || this.validations;
    opts = Object.assign({
      set_errors: true,
      updating: false
    }, opts || {})
    let model = this,
        errors = new Validator(opts)
          .validate(model.data, validations);
    if (!_.isEmpty(errors)){
      if (opts.set_errors){
        model.setErrorMessages(t, errors, validations);
      }
      return false;
    }
    model.errors = undefined;
    return true;
  }

  setErrorMessages(t, errors, validations){
    let model = this,
        error_messages = new ErrorMessenger(t)
          .toS(errors, validations);
    model.errors = error_messages;
  }

  defineAttributes(){
    let model = this;
    if (model.read_only){
      model.attributes.forEach((attribute)=>{
        Object.defineProperty(model, attribute, {
          enumerable: true,
          configurable: false,
          get: function(){
            return model.data[attribute];
          }
        });
      });
    } else {
      model.attributes.forEach((attribute)=>{
        Object.defineProperty(model, attribute, {
          enumerable: true,
          configurable: false,
          get: function(){
            return model.data[attribute];
          },
          set: function(value){
            return model.data[attribute] = value;
          }
        });
      });
    }
  }

}
