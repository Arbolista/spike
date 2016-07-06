import uuid from 'node-uuid';

import i18n from 'shared/lib/i18n/i18nFactory.mock';

export function testSharedModelBehavior(Model){


  describe('shared model behavior', ()=>{

    it('detects whether data loaded', ()=>{
      let model = new Model(null);
      expect(model.data_loaded).toEqual(false);
    });

    it('detects load error', ()=>{
      let model = new Model({load_error: true});
      expect(model.data_loaded).toEqual(false);
      expect(model.load_error).toEqual(true);
    });

    it('creates getters and setters for data object', ()=>{
      let model = new Model({}, {read_only: false}),
          values = model.attributes.reduce((o, attribute)=>{
            o[attribute] = uuid.v4();
            model[attribute] = o[attribute];
            return o;
          }, {})
      expect(model.data).toEqual(values);
    });

    it('validation returns boolean', ()=>{
      let model = new Model({}),
          valid = model.validate(i18n.t);
      expect(!!valid).toEqual(valid);
      if (valid){
        expect(model.errors).toEqual(undefined);
      } else {
        expect(typeof model.errors).toEqual('object');
      }
    });

    it('valid method validates without setting errors.', ()=>{
      let model = new Model({}),
          valid = model.valid();
      expect(!!valid).toEqual(valid);
      expect(model.errors).toEqual(undefined);
    });

  });


}
