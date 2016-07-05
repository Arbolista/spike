## Validation

### Validation Objects

Validation per model is defined as a configured object, rather than functions to the extend possible. Validation objects are defined as:

```js
{
  <field_name>: {
    <validation_type>: {
        <i18n_key>: <String>, // Translation key that will be passed to ErrorMessenger for creating UI message.
        <fnInvalid>: <Function>, // if provided, will be passed value and validation object and will be evaluated instead of Validator validation method.
        <choices>: <Array[String]>, // only invalid_choice
        <min>: <Integer>, // only range_violation
        <max>: <Integer> // only range_violation
      }
    }
  }
}
```

For example,

```js
{
  email: {
    blank: {},
    invalid_format: {
      fnInvalid: function(value){
        // must have capital letter, downcase letter, number, and punctuation.
        if (/[A-Z]/.test(value) &&
             /[a-z]/.test(value) &&
             /[0-9]/.test(value) &&
             /[\.\?!@#$%^&*(){}]/.test(value) &&
             value.length >= 7) {
          return false; // return false if valid
        }
        return true; // return true if invalid (thus 'fnInvalid')
      },
      i18n_key: 'Not a valid email.'
    }
  },
  first_name: {
    blank: {}
  }
}
```

Common validations objects, Regex, and functions are provided in `client/lib/validations.js`. Additionally, you can manipulate and reuse those validation objects with:

```js
// This will do a name validation that is not a required field and has a minimum length of 25.
{
  name: NAME_VALIDATION.without('blank').with({
    range_violation: { min: 25 }
  })
}
```

### Error Objects

`client/lib/validator.js` will provide an error object in the same format as the API when a 400 `invalid_user_input` is returned `{<field_name>: <Array[error_code]>}`. For example, registration might result in the following error object:

```json
{
  "email": ["invalid_format"],
  "first_name": ["blank"]
}
```

### Error Codes

Validation currently implements the following common errors. Your API does not necessarily need to implement these codes as long as you can map your errors to these codes:

- `confirm_mismatch` - value does not match confirm value submitted by user.
- `mismatch` - value doesnt match server value (such as password)
- `non_unique` - submitted field must be a unique value in DB, but was not.
- `blank` - Submitted field is required but value was null or an empty string.
- `range_violation` - Integer or string length range violation.
- `invalid_format` - Field requires a specific format, which the value did not match.
- `invalid_choice` - Field must be included in an array of choices, but did not.
- `missing` - User input is a resource that should exist on server, but does not.

### Error Codes to UI Messages

`client/lib/validation/error_messenger.js` is initialized with a translation function (from i18n). Error objects can be passed to `error_messenger.toS(error_object, validation_object)`, which will return an error message object, such as:

```js
{
  "email": ["Must be a valid email address."],
  "first_name": ["First name is a required field."]
}
```
