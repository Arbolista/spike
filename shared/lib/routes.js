export function defineRoutes(i18n) {
  return [{
    name:"Index",
    path:[
       "/:locale/index",
       "/:locale?"
    ]
    //component:"./shared/components/layouts/index/index.component"
  },{
    name:"Details",
    path:`/:locale?/${i18n.t('details')}/:example_id`
  },{
    name:"Login",
    path:`/:locale?/${i18n.t('login')}`
  },{
    name:"Missing",
    path:"/"
  }];
}