import ContextableComponent from './contextable_component';

export default class TranslatableComponent extends ContextableComponent {

  get moment() {
    let i18n = this.context.i18n;
    if(i18n && i18n.language) {
      moment.locale(i18n.language);
    }
    return moment;
  }

  get t() {
    var i18n = this.context.i18n;
    if (!i18n) {
      // i18n not present - probably unit test
      return (key) => {
        // no translation - used for checking the keys
        return key;
      };
    } else {
      // TODO: implement language switching
      // FIXME: getFixedT not finding translations.
      //return i18n.getFixedT(i18n.language, 'translations');
      return i18n.t.bind(i18n);
    }
  }

}
