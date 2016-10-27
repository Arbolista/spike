export function defineRoutes(i18n) {
  return [{
    name:"Index",
    path:[
       "/:locale/index",
       "/:locale?",
       "/index",
       "/"
    ]
    //component:"./shared/components/layouts/index/index.component"
  },{
    name:"Details",
    path:`/:locale?/${i18n.t('details')}/:example_id`,
    url: function(action,i18n,payload,params) {
      return `/${i18n.language}/${i18n.t('details')}/${payload.id}`
    }
  },{
    name:"Login",
    path:`/:locale?/${i18n.t('login')}`
  },{
    name:"Missing",
    path:/.*/
  }];
}