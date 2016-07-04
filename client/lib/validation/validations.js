export const CVC_REGEX = /^\d{3}$/;

export const CREDIT_CARD_NUMBER_REGEX = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

export const US_ZIPCODE_REGEX = /^\d{5}([\-]?\d{4})?$/;

export const EMAIL_VALIDATION = /^.+@.+\..+$/;

export const STRING_VALIDATION = createValidation({
  range_violation: {min: 0, max: 250}
});


function createValidation(validations){
  Object.defineProperty(validations, 'without', {
    get: function(){
      let original = this;
      return function(){
        let copy = extend(true, {}, original);
        createValidation(copy);
        for (var i = 0; i < arguments.length; i++){
          delete copy[arguments[i]];
        }
        return copy;
      }
    },
    enumerable: false,
    configurable: false
  });
  Object.defineProperty(validations, 'with', {
    get: function(){
      let original = this;
      return function(new_validations){
        let copy = extend(true, {}, original);
        createValidation(copy);
        return Object.assign(copy, new_validations);
      }
    },
    enumerable: false,
    configurable: false
  });
  return validations;
}
