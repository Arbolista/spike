import _ from 'lodash';

export default class ErrorMessenger {

  constructor(t){
    this.t = t;
  }

  toS(errors, js_validations){
    let error_messenger = this;
    return Object.keys(errors).reduce((o, field)=>{
      o[field] = errors[field].map((error_type)=>{
        let validation = js_validations[field][error_type];

        return error_messenger[error_type](field, validation);
      });
      return o;
    }, {});

  }

  invalid_choice(field, validation){
    let i18n_key = validation.i18n_key || '{{field}} is not a valid choice.',
        field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, Object.assign({field: field_name}, validation));
  }

  range_violation(field, validation){
    let i18n_key;
    if (validation.min !== undefined && validation.max !== undefined){
      i18n_key = validation.i18n_key  || 'Must be between {{min}} and {{max}}.';
    } else if (validation.min !== undefined){
      i18n_key = validation.i18n_key  || 'Must be more than {{min}}.';
    } else {
      i18n_key = validation.i18n_key  || 'Must be less than {{max}}.';
    }
    let field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, Object.assign({field: field_name}, validation));
  }

  invalid_format(field, validation){
    let i18n_key = validation.i18n_key || '{{field}} invalid format.',
        field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, Object.assign({field: field_name}, validation));
  }

  blank(field, validation){
    let i18n_key = validation.i18n_key || '{{field}} is a required field.',
        field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, Object.assign({field: field_name}, validation));
  }

  confirm_mismatch(field, validation){
    let i18n_key = validation.i18n_key || '{{field}} does not match.',
        field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, Object.assign({field: field_name}, validation));
  }

  non_unique(field, validation){
    let i18n_key = validation.i18n_key || '{{field}} is not unique.',
        field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, Object.assign({field: field_name}, validation));
  }
  missing(field, validation){
    let i18n_key = validation.i18n_key || '{{field}} does not exist.',
        field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, Object.assign({field: field_name}, validation));
  }

  mismatch(field, validation){
    let i18n_key = validation.i18n_key || '{{field}} is not correct.',
        field_name = _.capitalize(this.t(field));
    return this.t(i18n_key, {field: field_name});
  }

}
