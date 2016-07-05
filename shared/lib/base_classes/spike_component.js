import TranslatableComponent from './translatable_component';

export default class SpikeComponent
  extends TranslatableComponent {

  pushRoute(route_name, action, payload){
    this.router.pushRoute(route_name, action, payload);
  }

  scrollTo(top=0){
    window.jQuery("html, body").animate({ scrollTop: top }, "slow");
  }

  render() {
    return this.template.call(this);
  }
}
