/*
 * Warning: These should match api error structure and codes.
 * See validation.md.
 */
export default class Validator {

  constructor(opts){
    let validator = this;
    validator.opts = Object.assign({
      // updating implies undefined fields don't need to be validated.
      // creating implies all required fields must be preset.
      updating: false
    }, opts || {});
  }

  get updating(){
    return this.opts.updating;
  }
  get creating(){
    return !this.opts.updating;
  }

  customSignature(validation_type){
    return ['blank', 'confirm_mismatch'].indexOf(validation_type) >= 0;
  }

  // Takes JS object and validates against object of field_validations
  // See (apiToJsValidations).
  // The returned object matches the structure of errors returned from
  // server and can be used in ./error_messenger to return array of
  // UI error messages.
  validate(object, validations){
    let validator = this,
        errors = {};
    for (let field in validations){
      let field_errors = validator.validateField(field, object, validations[field]);
      if (field_errors.length > 0){
        errors[field] = field_errors;
      }
    }
    return errors;
  }

  validateField(field, object, field_validations){
    let value = object[field],
        validator = this,
        errors = [];
    if (value === undefined){
      if (validator.blank(value, field, field_validations)){
        errors.push('blank');
      }
    } else {
      for (let validation_type in field_validations){
        if (validator.customSignature(validation_type)) continue;

        let validation = field_validations[validation_type];

        // Ignore server side validations, such as email non_unique
        // (those are only created for error messaging).
        if (validation.server_only) continue;

        // allow validation to pass in custom function.
        if (validation.fnInvalid){
          if (validation.fnInvalid(value, validation)) errors.push(validation_type);
        } else if (validator[validation_type](value, validation)){
          // else just rely on basic validation functions below.
          errors.push(validation_type);
        }
      }

      // check that object has corresponding confirm field that matches.
      if (validator.confirm_mismatch(field, object, field_validations)){
        errors.push('confirm_mismatch');
      }
    }
    return errors;
  }

  blank(value, field, validations){
    return value === undefined &&
      this.creating &&
      validations.hasOwnProperty('blank');
  }

  confirm_mismatch(field, object, validations){
    if (validations.hasOwnProperty('confirm_mismatch')){
      let value = object[field],
          confirm_value = object[`${field}_confirm`];
      if (value !== confirm_value){
        return true;
      }
    }
    return false;
  }

  range_violation(value, range){
    let length = typeof value === 'string' ? value.length : value;

    if (range.min !== undefined && range.max !== undefined){
      if (length < range.min || length > range.max){
        return true;
      }
    } else if (range.max !== undefined) {
      if (length > range.max){
        return true;
      }
    } else {
      if (length < range.min){
        return true;
      }
    }
    return false;
  }

  invalid_format(value, validation){
    if (!validation.format.test(value)){
      return true
    }
    return false;
  }

  invalid_choice(value, validation){
    if (validation.choices.indexOf(value) < 0){
      return true
    }
    return false;
  }

}
